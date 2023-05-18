/*

     ______ _                            _            
    |  ____(_)                          | |           
    | |__   _ _ __ ___  _ __   ___  _ __| |_ ___ _ __ 
    |  __| | | '_ ` _ \| '_ \ / _ \| '__| __/ _ \ '__|
    | |____| | | | | | | |_) | (_) | |  | ||  __/ |   
    |______|_|_| |_| |_| .__/ \___/|_|   \__\___|_|   
                       | |                            
                       |_|                            
                    !node edition

            Rewrite of the Enginette importer!

                Why rewrite?
                   - Code was getting messy
                   - JSON output was getting messy too

*/

// #region EIMPORTER FILE

const FILE = `
import "engine_sim.mr"

units units()
constants constants()
impulse_response_library ir_lib()

private node wires {
    output wire1: ignition_wire();
    output wire2: ignition_wire();
}

public node kohler_ch750 {
    alias output __out: engine;

    engine engine(
        name: "Kohler CH750",
        starter_torque: 250 * units.lb_ft,
        starter_speed: 1500 * units.rpm,
        redline: 3600 * units.rpm
    )

    wires wires()

    crankshaft c0(
        throw: 69 * units.mm / 2,
        flywheel_mass: 5 * units.lb,
        mass: 5 * units.lb,
        friction_torque: 10.0 * units.lb_ft,
        moment_of_inertia: 0.22986844776863666 * 0.5,
        position_x: 0.0,
        position_y: 0.0,
        tdc: constants.pi / 4
    )

    rod_journal rj0(angle: 0.0)
    c0
        .add_rod_journal(rj0)

    piston_parameters piston_params(
        mass: 400 * units.g,
        //blowby: k_28inH2O(0.1),
        compression_height: 1.0 * units.inch,
        wrist_pin_position: 0.0,
        displacement: 0.0
    )

    connecting_rod_parameters cr_params(
        mass: 300.0 * units.g,
        moment_of_inertia: 0.0015884918028487504,
        center_of_mass: 0.0,
        length: 4.0 * units.inch
    )

    cylinder_bank_parameters bank_params(
        bore: 83 * units.mm,
        deck_height: (4.0 + 1) * units.inch + 69 * units.mm / 2
    )

    intake intake(
        plenum_volume: 1.0 * units.L,
        plenum_cross_section_area: 10.0 * units.cm2,
        intake_flow_rate: k_carb(50.0),
        idle_flow_rate: k_carb(0.0),
        idle_throttle_plate_position: 0.96,
        throttle_gamma: 1.0
    )

    exhaust_system_parameters es_params(
        outlet_flow_rate: k_carb(300.0),
        primary_tube_length: 10.0 * units.inch,
        primary_flow_rate: k_carb(200.0),
        velocity_decay: 1.0,
        volume: 20.0 * units.L
    )

    exhaust_system exhaust0(
        es_params,
        audio_volume: 1.0,
        impulse_response: ir_lib.default_0
    )

    cylinder_bank b0(bank_params, angle: -45 * units.deg)
    b0
        .add_cylinder(
            piston: piston(piston_params, blowby: k_28inH2O(0.1)),
            connecting_rod: connecting_rod(cr_params),
            rod_journal: rj0,
            intake: intake,
            exhaust_system: exhaust0,
            ignition_wire: wires.wire1
        )

    cylinder_bank b1(bank_params, angle: 45.0 * units.deg)
    b1
        .add_cylinder(
            piston: piston(piston_params, blowby: k_28inH2O(0.1)),
            connecting_rod: connecting_rod(cr_params),
            rod_journal: rj0,
            intake: intake,
            exhaust_system: exhaust0,
            ignition_wire: wires.wire2
        )

    engine
        .add_cylinder_bank(b0)
        .add_cylinder_bank(b1)

    engine.add_crankshaft(c0)

    harmonic_cam_lobe lobe(
        duration_at_50_thou: 160 * units.deg,
        gamma: 1.1,
        lift: 200 * units.thou,
        steps: 100
    )

    vtwin90_camshaft_builder camshaft(
        lobe_profile: lobe,
        lobe_separation: 114 * units.deg,
        base_radius: 500 * units.thou
    )

    b0.set_cylinder_head (
        generic_small_engine_head(
            chamber_volume: 50 * units.cc,
            intake_camshaft: camshaft.intake_cam_0,
            exhaust_camshaft: camshaft.exhaust_cam_0
        )
    )
    b1.set_cylinder_head (
        generic_small_engine_head(
            chamber_volume: 50 * units.cc,
            intake_camshaft: camshaft.intake_cam_1,
            exhaust_camshaft: camshaft.exhaust_cam_1,
            flip_display: true
        )
    )

    function timing_curve(1000 * units.rpm)
    timing_curve
        .add_sample(0000 * units.rpm, 50 * units.deg)
        .add_sample(1000 * units.rpm, 50 * units.deg)
        .add_sample(2000 * units.rpm, 50 * units.deg)
        .add_sample(3000 * units.rpm, 50 * units.deg)
        .add_sample(4000 * units.rpm, 50 * units.deg)

    engine.add_ignition_module(
        vtwin90_distributor(
            wires: wires,
            timing_curve: timing_curve,
            rev_limit: 5000 * units.rpm
        ))
}

`;

//#endregion

// #region EIMPORTER CLASSES

class EI_Vars {
    constructor (pirWires, pirMainNode) {
        this.pirWires = pirWires;
        this.pirMainNode = pirMainNode;
    }
}

function EI_Greet() {
    console.log("=================================================================");
    console.log("=================================================================");
    console.log("=================================================================");
    console.log("==========================Eimporter==============================");
    console.log("=================================================================");
    console.log("=================================================================");
    console.log("=================================================================");
}

// #endregion

//#region PIRANHA CLASSES

class PIR_Wires {
    constructor (wires) {
        this.wires = wires;
    }
}

class PIR_MainNode {
    constructor (pirOutAlias, pirEngineVitals) {
        this.outputAlias = pirOutAlias;
        this.mainBody = pirEngineVitals;
    }
}

class PIR_EngineVitals {
    constructor ({
        pirEngine = null,
        pirEngineWires = null,
        pirCrankshafts = null,
        pirJournals = null,
        pirPistonParams = null,
        pirConnectingParams = null,
        pirBankParams = null,
        pirIntake = null,
        pirExhaustParams = null,
        pirExhaust = null,
        pirBanks = null}) {

        } 
}

// #region DUMMIES
class PIR_Units {  }
class PIR_Constants {  }
class PIR_IRLib {  }

class PIR_OutAlias {  }
//#endregion

//#region ENGINE PIRANHA CLASSES

class PIR_Engine {
    constructor ({
        name = "My Engine",
        starterTorque = 50,
        starterSpeed = 500,
        redline = 5500}) {
        this.name = name;
        this.starterTorque = starterTorque;
        this.starterSpeed = starterSpeed;
        this.redline = redline;
    }
}

class PIR_EngineWires {  }

class PIR_Crankshaft {
    constructor ({
        throwLength = 69,
        flywheelMass = 2,
        mass = 2,
        frictionTorque = 10,
        momentOfInertia = 0.22986844776863666,
        positionX = 0,
        positionY = 0,
        tdc = Math.PI / 4}) {
        this.throw = throwLength;
        this.flywheelMass = flywheelMass;
        this.mass = mass;
        this.frictionTorque = frictionTorque;
        this.momentOfInertia = momentOfInertia;
        this.positionX = positionX;
        this.positionY = positionY;
        this.tdc = tdc;
    }
}

class PIR_Journal {
    constructor (angle) {
        this.angle = angle;
    }
}

class PIR_PistonParams {
    constructor ({
        mass = 400,
        compressionHeight = 1.0,
        wristPinPosition = 0,
        displacement = 0
        }) {
            this.mass = mass;
            this.compressionHeight = compressionHeight;
            this.wristPinPosition = wristPinPosition;
            this.displacement = displacement;
        }
}

class PIR_ConnectingRodParams {
    constructor ({
        mass = 300,
        momentOfInertia = 0.0015884918028487504,
        centerOfMass = 0,
        length = 4.0
        }) {
            this.mass = mass;
            this.momentOfInertia = momentOfInertia;
            this.centerOfMass = centerOfMass;
            this.rodLength = length;
        }
}

class PIR_ConnectingRodParams {
    constructor ({
        bore = 83,
        deckHeight = (4.0 + 1) + 69 / 2
        }) {
            this.bore = bore;
            this.deckHeight = deckHeight;
        }
}

class PIR_Intake {
    constructor ({
        plenumVolume = 1.0,
        plenumCrossSectionArea = 10,
        intakeFlowRate = 50,
        idleFlowRate= 0.0,
        idleThrottlePlatePosition = 0.96,
        throttleGamma = 1.0
        }) {
            this.plenumVolume = plenumVolume;
            this.plenumCrossSectionArea = plenumCrossSectionArea;
            this.intakeFlowRate = intakeFlowRate;
            this.idleFlowRate = idleFlowRate;
            this.idleThrottlePlatePosition = idleThrottlePlatePosition;
            this.throttleGamma = throttleGamma;
        }
}

class PIR_ExhaustParams {
    constructor ({
        outletFlowRate = 300,
        primaryTubeLenght = 10,
        primaryFlowRate = 200,
        velocityDecay = 1.0,
        volume = 20
        }) {
            this.outletFlowRate = outletFlowRate,
            this.primaryTubeLenght = primaryTubeLenght,
            this.primaryFlowRate = primaryFlowRate,
            this.velocityDecay = velocityDecay;
            this.volume = volume;
        }
}

class PIR_Exhaust {
    constructor (audioVolume = 1.0) {
            this.audioVolume = audioVolume;
        }
}

class PIR_CamLobe {
    constructor ({duration = 160,
        gamma = 1.1,
        lift = 200,
        steps  = 100}) {
            this.duration = duration;
            this.gamma = gamma;
            this.lift = lift;
            this.steps = steps;
        }
}

class PIR_Camshaft {
    constructor ({pirLobe,
        lobeSeparation = 114,
        base_radius = 500}) {
            this.pirLobe = pirLobe;
            this.lobeSeparation = lobeSeparation;
            this.base_radius = base_radius;
        }
}

class PIR_Head {
    constructor ({chamberVolume = 50,
        intakeCam,
        exhaustCam,
        flip = false}) {
            this.chamberVolume = chamberVolume;
            this.intakeCam = intakeCam;
            this.exhaustCam = exhaustCam;
            this.flip = flip;
        }
}

class PIR_Bank {
    constructor ({pirBankParams = null,
        angle = 0,
        cylinders = null,
        pirHead = null}) {
            this.pirBankParams = pirBankParams;
            this.angle = angle;
            this.cylinders = cylinders;
            this.pirHead = pirHead;
        }
}

class PIR_Piston {
    constructor ({pirPistonParams,
        blowby = 0.1}) {
            this.pirPistonParams = pirPistonParams;
            this.blowby = blowby;
        }
}

class PIR_ConnectingRod {
    constructor (pirConnectingRodParams) {
            this.pirConnectingRodParams = pirConnectingRodParams;
        }
}

class PIR_Cylinder{
    constructor ({pirPiston = null,
        pirConnectingRod = null,
        pirJournal = null,
        pirIntake = null,
        pirExhaust = null,
        ignitionWire = 0}) {
            this.pirPiston = pirPiston;
            this.pirConnectingRod = pirConnectingRod;
            this.pirJournal = pirJournal;
            this.pirIntake = pirIntake;
            this.pirExhaust = pirExhaust;
            this.ignitionWire = ignitionWire;
        }
}

class PIR_TimingCurve {
    constructor (samples
        ) {
            this.samples = samples;
        }
}

class PIR_Distributor {
    constructor ({pirEngineWires = null,
        pirTimingCurve = null,
        revLimit = 5000}) {
            this.pirEngineWires = pirEngineWires;
            this.pirTimingCurve = pirTimingCurve;
            this.revLimit = revLimit;
        }
}

//#endregion

//#endregion

EI_Greet();
console.log("Loading...");

var vitals = new PIR_EngineVitals();
var mainNode = new PIR_MainNode();

var vars = new EI_Vars();

console.log("Converting file...");

//console.log(JSON.stringify(vars));
