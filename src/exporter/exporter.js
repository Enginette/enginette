/*

    ________   __                 _            
    |  ____\ \ / /                | |           
    | |__   \ V / _ __   ___  _ __| |_ ___ _ __ 
    |  __|   > < | '_ \ / _ \| '__| __/ _ \ '__|
    | |____ / . \| |_) | (_) | |  | ||  __/ |   
    |______/_/ \_\ .__/ \___/|_|   \__\___|_|   
                 | |                            
                 |_|                            
    
                 Something, i guess
                 im writing this at 4AM so idk
		             - now doing this at 11 PM bruh i hate myself  
                     - 17.09.22 12:43 YOOO IT WORKS!!!!  
*/

import Database from "../database/database";

class Generator {

    static Generate = async (database, id) => {

        //#region DATABASE SHIT

        const engine = await Database.Engines.getById({
            db: database,
            id,
        });

        const banks = await Database.Engines.Banks.all({
            db: database,
            id,
        });

        const connectingRods = await Database.Engines.ConnectingRods.all({
            db: database,
            id,
        });
        
        const journalRods = await Database.Engines.JournalRods.all({
            db: database,
            id,
        });

        const crankshafts = await Database.Engines.Crankshafts.all({
            db: database,
            id,
        });

        const cylinders = await Database.Engines.Cylinders.all({
            db: database,
            id,
        });

        const cylinderHead = await Database.CylinderHeads.getById({
            db: database,
            id,
        });

        const distributor = await Database.Distributor.getById({
            db: database,
            id,
        });

        const intakes = await Database.Engines.Intakes.all({
            db: database,
            id,
        });

        const exhausts = await Database.Engines.Exhausts.all({
            db: database,
            id,
        });

        const pistons = await Database.Engines.Pistons.all({
            db: database,
            id,
        });

        // LOBES
        const intake_lobe = await Database.Lobes.getById({
            db: database,
            id: cylinderHead.intake_lobe,
        });
        const exhaust_lobe = await Database.Lobes.getById({
            db: database,
            id: cylinderHead.exhaust_lobe,
        });

        //#endregion

        //#region CONSTANT SHIT

        const begin = "// Generated with Enginette(https://enginette.netlify.app) by DDev, Pooria and zRevenger." + "\n" +
                    "// More info here: https://github.com/enginette/enginette" + "\n" +
                    "\n" +
                    "import \"engine_sim.mr\"" + "\n" +
                    "\n" +
                    "units units()" + "\n" +
                    "constants constants()" + "\n" +
                    "impulse_response_library ir_lib()" + "\n" +
                    "\n" +
                    "label cycle(2 * 360 * units.deg)" + "\n" +
                    "\n";

        //#endregion

        //#region INPUTS

        // GENERAL
        const _GENERAL_NAME_NAME = engine.name;

        const _GENERAL_NAME = engine.name.trim().replace(" ", "_");
        const _GENERAL_STARTER_TORQUE = engine.starterTorque.toString();
        const _GENERAL_CYLINDER_COUNT = cylinders.length;
        console.log(_GENERAL_CYLINDER_COUNT);
        const _GENERAL_REDLINE = engine.redLine.toString();

        const _general_forder_string = distributor.firing_order.toString();
        //const _GENERAL_FIRING_ORDER = [ 1, 4, 2, 3 ];
        const _forder_arr = _general_forder_string.replace(" ", "").split(",");

        const _GENERAL_FIRING_ORDER = _forder_arr;

        let count = parseInt(distributor.rpm);
		let array = [];
		for(let i = 0; i <= count; i += 1000) 
		{
			array.push([i, distributor.timings[i/1000]]);
		}
        
        const _GENERAL_TIMING_TABLE = array;

        // ROD, CRANKSHAFT, ANGLE
        var arr0 = [];
        journalRods.map((jr) => {
            arr0.push({
                id: jr.id,
                _JOURNAL_ROD_ANGLE: jr.angle,
            });
        });

        const _GENERAL_ROD_TABLE = arr0;

        /*
        // LOBE INTAKE
        const _LOBE_INT_DURATION = "240";
        const _LOBE_INT_GAMMA = "1.0";
        const _LOBE_INT_LIFT = "10.8";
        const _LOBE_INT_STEPS = "100";

        // LOBE EXHAUST
        const _LOBE_EXH_DURATION = "240";
        const _LOBE_EXH_GAMMA = "1.0";
        const _LOBE_EXH_LIFT = "10.8";
        const _LOBE_EXH_STEPS = "100";
        */
        // LOBE INTAKE
        const _LOBE_INT_DURATION = intake_lobe.durationAtFiftyThousands.toString();
        const _LOBE_INT_GAMMA = intake_lobe.gamma.toString();
        const _LOBE_INT_LIFT = intake_lobe.lift.toString();
        const _LOBE_INT_STEPS = intake_lobe.steps.toString();

        // LOBE EXHAUST
        const _LOBE_EXH_DURATION = exhaust_lobe.durationAtFiftyThousands.toString();
        const _LOBE_EXH_GAMMA = exhaust_lobe.gamma.toString();
        const _LOBE_EXH_LIFT = exhaust_lobe.lift.toString();
        const _LOBE_EXH_STEPS = exhaust_lobe.steps.toString();

        // LOBE SHIT
        const _GENERAL_LOBE_SEPARATION = cylinderHead.lobe_separation.toString();
        const _GENERAL_LOBE_ADVANCE = cylinderHead.lobe_advance.toString();
        const _GENERAL_LOBE_RADIUS = cylinderHead.lobe_radius.toString();

        // DISTRIBUTOR
        const _DISTRIBUTOR_REV_LIMIT = distributor.rpm.toString();
        const _DISTRIBUTOR_LIMITER_DURATION = "0.1";

        // HEAD
        const _HEAD_CHAMBER_VOLUME = cylinderHead.chamber_volume.toString();
        const _HEAD_FLOW_ATTENUATION = cylinderHead.flow_attenuation.toString();
        const _HEAD_LIFT_SCALE = cylinderHead.lift_scale.toString();

        const _HEAD_FLOW_INTAKE = [ 
            ...cylinderHead.intake
        ];

        const _HEAD_FLOW_EXHAUST = [ 
            ...cylinderHead.exhaust
        ];

        // CRANK

        // stuff
        const _GENERAL_CRANK_COUNT = 1;

        let arr = [];
        crankshafts.map((crankshaft) => {
            arr.push({ 
                id: crankshaft.id.toString(),
                _CRANK_THROW: crankshaft.throw.toString(),
                _CRANK_FLYWHEEL_MASS: crankshaft.flywheelMass.toString(),
                _CRANK_MASS: crankshaft.mass.toString(),
                _CRANK_FRICTION_TORQUE: crankshaft.frictionTorque.toString(),
                _CRANK_MOMENT_OF_INERTIA: crankshaft.momentOfInertia.toString(),
                _CRANK_POSITION_X: crankshaft.xPosition.toString(),
                _CRANK_POSITION_Y: crankshaft.yPosition.toString(),
                _CRANK_TDC: crankshaft.topDeadCenter.toString(),
            });
        });

        const _GENERAL_CRANK_TABLE = arr;
        // PISTON
        // params
        let arr2 = [];

        pistons.map((piston) => {
            arr2.push({
                id: piston.id.toString(),
                _PISTON_MASS: piston.mass,
                _PISTON_COMPRESSION_HEIGHT: piston.compressionHeight,
                _PISTON_WRIST_PIN_POSITON: piston.wristPinPosition,
                _PISTON_DISPLACEMENT: piston.displacement,
            });
        })

        const _PISTON_TABLE = arr2;

        // CONNECTING ROD
        let arr3 = [];

        connectingRods.map((cr) => {
            arr3.push({
                id: cr.id.toString(),
                _CONNECTING_ROD_MASS: "240",
                _CONNECTING_MOMENT_OF_INERTIA: "0.0015884918028487504",
                _CONNECTING_ROD_CENTER_OF_MASS: "0.0",
                _CONNECTING_ROD_LENGTH: "131.6",
            });
        });

        const _CONNECTING_ROD_TABLE = arr3;

        // INTAKE
        let arr5 = [];

        intakes.map((intake) => {
            arr5.push({
                id: intake.id.toString(),
                _INTAKE_CARB_CFM: intake.flowRate.toString(),
                _INTAKE_IDLE_CFM: intake.idleFlowRate.toString(),
                _INTAKE_IDLE_PLATE: intake.idleThrottlePlatePosition.toString(),
                _INTAKE_THROTTLE_GAMMA: intake.throttleGamma.toString(),
                _INTAKE_PLENUM_VOLUME: intake.plenumVolume.toString(),
                _INTAKE_PLENUM_CROSS: intake.plenumCrossSectionArea.toString(),
            });
        });

        const _INTAKE_TABLE = arr5;

        // EXHAUST
        let arr6 = [];

        exhausts.map((exhaust) => {
            arr6.push({
                id: exhaust.id.toString(),
                _EXHAUST_OUTLET_FLOW_RATE: exhaust.outletFlowRate.toString(),
                _EXHAUST_PRIMARY_TUBE_LENGTH: exhaust.length.toString(),
                _EXHAUST_PRIMARY_FLOW_RATE: exhaust.flowRate.toString(),
                _EXHAUST_VELOCITY_DECAY: exhaust.velocityDecay.toString(),
                _EXHAUST_VOLUME: exhaust.volume.toString(),
            });
        });

        const _EXHAUST_TABLE = arr6;

        //#endregion

        let output = "";

        output += begin;

        // parse shit idk

        // DONE: Add proper wire stuffs
        output += "private node wires {" + "\n";
        for(let i = 0; i < _GENERAL_CYLINDER_COUNT; i++) {
            output += "    output wire" + (i + 1).toString() + ": ignition_wire();" + "\n";
        }
        output += "}" + "\n";
        output += "\n";

        // DONE: Add proper wire shit
        output += "private node " + _GENERAL_NAME + "_distributor {" + "\n";
        output += "    input wires;" + "\n";
        output += "    input timing_curve;" + "\n";
        output += "    input rev_limit: " + _DISTRIBUTOR_REV_LIMIT + " * units.rpm;" + "\n";
        output += "    input limiter_duration: " + _DISTRIBUTOR_LIMITER_DURATION + " * units.sec;" + "\n";
        output += "    alias output __out:" + "\n";
        output += "        ignition_module(timing_curve: timing_curve, rev_limit: rev_limit, limiter_duration: limiter_duration)" + "\n";
        for(let i = 0; i < _GENERAL_FIRING_ORDER.length; i++) {
            if(i == _GENERAL_FIRING_ORDER.length-1) {
                output += "            .connect_wire(wires.wire" + _GENERAL_FIRING_ORDER[i].toString() + ", (" + (i).toString() + ".0 / " + _GENERAL_CYLINDER_COUNT + ") * cycle);" + "\n";
            }
            else {
                output += "            .connect_wire(wires.wire" + _GENERAL_FIRING_ORDER[i].toString() + ", (" + (i).toString() + ".0 / " + _GENERAL_CYLINDER_COUNT + ") * cycle)" + "\n";
            }
        }
        output += "}" + "\n";
        output += "\n";

        output += "private node add_sym_sample {" + "\n";
        output += "    input angle;" + "\n";
        output += "    input lift;" + "\n";
        output += "    input this;" + "\n";
        output += "    alias output __out: this;" + "\n";
        output += "\n";
        output += "    this.add_sample(angle * units.deg, lift * units.thou)" + "\n";
        output += "    this.add_sample(-angle * units.deg, lift * units.thou)" + "\n";
        output += "}" + "\n";
        output += "\n";

        output += "private node " + _GENERAL_NAME + "_lobe_profile_int {" + "\n";
        output += "    alias output __out:" + "\n";
        output += "        harmonic_cam_lobe(" + "\n";
        output += "            duration_at_50_thou: " + _LOBE_INT_DURATION + " * units.deg," + "\n";
        output += "            gamma: " + _LOBE_INT_GAMMA + "," + "\n";
        output += "            lift: " + _LOBE_INT_LIFT + " * units.thou," + "\n";
        output += "            steps: " + _LOBE_INT_STEPS + "\n";
        output += "        );" + "\n";
        output += "}" + "\n";
        output += "\n";

        output += "private node " + _GENERAL_NAME + "_lobe_profile_exh {" + "\n";
        output += "    alias output __out:" + "\n";
        output += "        harmonic_cam_lobe(" + "\n";
        output += "            duration_at_50_thou: " + _LOBE_EXH_DURATION + " * units.deg," + "\n";
        output += "            gamma: " + _LOBE_EXH_GAMMA + "," + "\n";
        output += "            lift: " + _LOBE_EXH_LIFT + " * units.thou," + "\n";
        output += "            steps: " + _LOBE_EXH_STEPS + "\n";
        output += "        );" + "\n";
        output += "}" + "\n";
        output += "\n";

        output += "private node " + _GENERAL_NAME + "_camshaft_builder {" + "\n";
        output += "    input lobe_profile: " + _GENERAL_NAME + "_lobe_profile_int();" + "\n";
	    output += "    input ex_lobe_profile: " + _GENERAL_NAME + "_lobe_profile_exh();" + "\n";
        output += "    input intake_lobe_profile: lobe_profile;" + "\n";
        output += "    input exhaust_lobe_profile: ex_lobe_profile;" + "\n";
        output += "    input lobe_separation: " + _GENERAL_LOBE_SEPARATION + " * units.deg;" + "\n";
        output += "    input intake_lobe_center: lobe_separation;" + "\n";
        output += "    input exhaust_lobe_center: lobe_separation;" + "\n";
        output += "    input advance: " + _GENERAL_LOBE_ADVANCE + " * units.deg;" + "\n";
        output += "    input base_radius: " + _GENERAL_LOBE_RADIUS + " * units.inch;" + "\n";
        output += "\n";
        //output += "    output intake_cam_0: _intake_cam_0;" + "\n";
        //output += "    output exhaust_cam_0: _exhaust_cam_0;" + "\n";
        banks.map((bank) => {
            let bankk = bank.id;
            output += "    output intake_cam_" + (bankk - 1).toString() + ": _intake_cam_" + (bankk - 1).toString() + ";" + "\n";
            output += "    output exhaust_cam_" + (bankk - 1).toString() + ": _exhaust_cam_" + (bankk - 1).toString() + ";" + "\n";
        });
        output += "\n"; 
        output += "    camshaft_parameters params(" + "\n";
        output += "        advance: advance," + "\n";
        output += "        base_radius: base_radius" + "\n";
        output += "    )" + "\n";
        output += "\n";
        for (let i = 0; i < banks.length; i++) {
            output += "    camshaft _intake_cam_" + i.toString() + "(params, lobe_profile: intake_lobe_profile)" + "\n";
            output += "    camshaft _exhaust_cam_" + i.toString() + "(params, lobe_profile: exhaust_lobe_profile)" + "\n";
        }
        output += "\n";
        output += "    label rot(2 * (360 / " + _GENERAL_CYLINDER_COUNT + ") * units.deg)" + "\n";
        output += "    label rot60(60 * units.deg)" + "\n";
        output += "    label rot90(90 * units.deg)" + "\n";
        output += "    label rot120(120 * units.deg)" + "\n";
        output += "    label rot180(180 * units.deg)" + "\n";
        output += "    label rot360(360 * units.deg)" + "\n";
        output += "\n";

        const rot = "(2 * (360 / " + _GENERAL_CYLINDER_COUNT + "))";
        // DONE: figure out the shit that goes in here

        // do per bank
        banks.map((bank) => {
            let bankk = bank.id;
            output += "    _exhaust_cam_" + (bankk - 1).toString() + "\n";
            
            let index = 0;
            cylinders.map((cylinder) => {
                if(cylinder.bank == bankk) {
                    output += "        .add_lobe(rot360 - exhaust_lobe_center + 2*" + (-bank.angle) + " * units.deg + " + (_GENERAL_FIRING_ORDER[index]-1).toString() + " * " + rot + ")" + "\n";
                }
                index++;
            });
        });

        banks.map((bank) => {
            let bankk = (bank.id - bank.engine + 1);
            output += "    _intake_cam_" + (bankk - 1).toString() + "\n";
            
            let index = 0;
            cylinders.map((cylinder) => {
                if(cylinder.bank == bankk) {
                    output += "        .add_lobe(rot360 + intake_lobe_center + 2*" + (-bank.angle) + " * units.deg + " + (_GENERAL_FIRING_ORDER[index]-1).toString() + " * " + rot + ")" + "\n";
                }
                index++;
            });
        });
        output += "}" + "\n";
        output += "\n";

        output += "private node add_flow_sample {" + "\n";
        output += "    input lift;" + "\n";
        output += "    input flow;" + "\n";
        output += "    input this;" + "\n";
        output += "    alias output __out: this;" + "\n";
        output += "\n";
        output += "    this.add_sample(lift * units.mm, k_28inH2O(flow))" + "\n";
        output += "}" + "\n";
        output += "\n";

        output += "private node " + _GENERAL_NAME + "_head {" + "\n";
        output += "    input intake_camshaft;" + "\n";
        output += "    input exhaust_camshaft;" + "\n";
        output += "    input chamber_volume: " + _HEAD_CHAMBER_VOLUME + " * units.cc;" + "\n";
        output += "    input flip_display: true;" + "\n";
        output += "\n";
        output += "    input flow_attenuation: " + _HEAD_FLOW_ATTENUATION + ";" + "\n";
        output += "    input lift_scale: " + _HEAD_LIFT_SCALE + ";" + "\n";
        output += "    alias output __out: head;" + "\n";
        output += "\n";
        output += "    function intake_flow(1 * units.mm)" + "\n";
        output += "    intake_flow" + "\n";
        output += "        .add_flow_sample(0 * lift_scale, " + _HEAD_FLOW_INTAKE[0] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(1 * lift_scale, " + _HEAD_FLOW_INTAKE[1] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(2 * lift_scale, " + _HEAD_FLOW_INTAKE[2] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(3 * lift_scale, " + _HEAD_FLOW_INTAKE[3] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(4 * lift_scale, " + _HEAD_FLOW_INTAKE[4] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(5 * lift_scale, " + _HEAD_FLOW_INTAKE[5] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(6 * lift_scale, " + _HEAD_FLOW_INTAKE[6] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(7 * lift_scale, " + _HEAD_FLOW_INTAKE[7] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(8 * lift_scale, " + _HEAD_FLOW_INTAKE[8] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(9 * lift_scale, " + _HEAD_FLOW_INTAKE[9] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(10 * lift_scale, " + _HEAD_FLOW_INTAKE[10] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(11 * lift_scale, " + _HEAD_FLOW_INTAKE[11] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(12 * lift_scale, " + _HEAD_FLOW_INTAKE[12] + " * flow_attenuation)" + "\n";
        output += "\n";
        output += "    function exhaust_flow(1 * units.mm)" + "\n";
        output += "    exhaust_flow" + "\n";
        output += "        .add_flow_sample(0 * lift_scale, " + _HEAD_FLOW_EXHAUST[0] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(1 * lift_scale, " + _HEAD_FLOW_EXHAUST[1] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(2 * lift_scale, " + _HEAD_FLOW_EXHAUST[2] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(3 * lift_scale, " + _HEAD_FLOW_EXHAUST[3] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(4 * lift_scale, " + _HEAD_FLOW_EXHAUST[4] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(5 * lift_scale, " + _HEAD_FLOW_EXHAUST[5] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(6 * lift_scale, " + _HEAD_FLOW_EXHAUST[6] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(7 * lift_scale, " + _HEAD_FLOW_EXHAUST[7] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(8 * lift_scale, " + _HEAD_FLOW_EXHAUST[8] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(9 * lift_scale, " + _HEAD_FLOW_EXHAUST[9] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(10 * lift_scale, " + _HEAD_FLOW_EXHAUST[10] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(11 * lift_scale, " + _HEAD_FLOW_EXHAUST[11] + " * flow_attenuation)" + "\n";
        output += "        .add_flow_sample(12 * lift_scale, " + _HEAD_FLOW_EXHAUST[12] + " * flow_attenuation)" + "\n";
        output += "\n";
        output += "\n";
        output += "    cylinder_head head(" + "\n";
        output += "        chamber_volume: chamber_volume," + "\n";
        output += "        intake_runner_volume: 100.0 * units.cc," + "\n";
        output += "        intake_runner_cross_section_area: 2 * 12.4087 * units.cm2," + "\n";
        output += "\n";
        output += "        intake_port_flow: intake_flow," + "\n";
        output += "        exhaust_port_flow: exhaust_flow," + "\n";
        output += "        intake_camshaft: intake_camshaft," + "\n";
        output += "        exhaust_camshaft: exhaust_camshaft," + "\n";
        output += "        flip_display: flip_display" + "\n";
        output += "    )" + "\n";
        output += "}" + "\n";
        output += "\n";

        output += "public node " + _GENERAL_NAME + " {" + "\n";
        output += "    alias output __out: engine;" + "\n";
        output += "\n";
        output += "    engine engine(" + "\n";
        output += "        name: \"" + _GENERAL_NAME_NAME + "\"," + "\n";
        output += "        starter_torque: " + _GENERAL_STARTER_TORQUE + " * units.lb_ft," + "\n";
        output += "        starter_speed: 350 * units.rpm," + "\n";
        output += "        redline: " + _GENERAL_REDLINE + " * units.rpm," + "\n";
        output += "        fuel: fuel(" + "\n";
        output += "                    max_turbulence_effect: 3.0," + "\n";
        output += "            burning_efficiency_randomness: 0.5," + "\n";
        output += "            max_burning_efficiency: 1.25)" + "\n";
        output += "    )" + "\n";
        output += "\n";
        output += "    wires wires()" + "\n";
        output += "\n";
        _GENERAL_CRANK_TABLE.map((crank) => {
            output += "    crankshaft c" + crank.id + "(" + "\n";
            output += "        throw: " + crank._CRANK_THROW + " * units.mm / 2," + "\n";
            output += "        flywheel_mass: " + crank._CRANK_FLYWHEEL_MASS + " * units.kg," + "\n";
            output += "        mass: " + crank._CRANK_MASS + " * units.kg," + "\n";
            output += "        friction_torque: " + crank._CRANK_FRICTION_TORQUE + " * units.lb_ft," + "\n";
            output += "        moment_of_inertia: " + crank._CRANK_MOMENT_OF_INERTIA + "," + "\n";
            output += "        position_x: " + crank._CRANK_POSITION_X + "," + "\n";
            output += "        position_y: " + crank._CRANK_POSITION_Y +"," + "\n";
            output += "        tdc: " + crank._CRANK_TDC + " * units.deg" + "\n";
            output += "    )" + "\n";
            output += "\n";
        });
        // DONE: Add journal adding shit
        _GENERAL_ROD_TABLE.map((rod) => {
            output += "    rod_journal rj" + rod.id + "(angle: " + rod._JOURNAL_ROD_ANGLE + " * units.deg)" + "\n";
        });
        output += "\n";

        _GENERAL_CRANK_TABLE.map((crank) => {
            output += "    c" + crank.id + "\n";

            _GENERAL_ROD_TABLE.map((rod) => {
                output += "        .add_rod_journal(rj" + rod.id + ")" + "\n";
            });
        });

        output += "\n";

        let index = 0;

        _PISTON_TABLE.map((piston) => {
            output += "    piston_parameters piston_params" + piston.id + "(" + "\n";
            output += "        mass: " + piston._PISTON_MASS + " * units.g," + "\n";
            output += "        compression_height: " + piston._PISTON_COMPRESSION_HEIGHT +" * units.mm," + "\n";
            output += "        wrist_pin_position: " + piston._PISTON_WRIST_PIN_POSITON + "," + "\n";
            output += "        displacement: " + piston._PISTON_DISPLACEMENT + "\n";
            output += "    )" + "\n";
            output += "\n";
            index++;
        });

        index = 0;
        _CONNECTING_ROD_TABLE.map((cr) => {
            output += "    connecting_rod_parameters cr_params" + cr.id + "(" + "\n";
            output += "        mass: " + cr._CONNECTING_ROD_MASS + " * units.g," + "\n";
            output += "        moment_of_inertia: " + cr._CONNECTING_MOMENT_OF_INERTIA + " * 0.9," + "\n";
            output += "        center_of_mass: " + cr._CONNECTING_ROD_CENTER_OF_MASS + "," + "\n";
            output += "        length: " + cr._CONNECTING_ROD_LENGTH + " * units.mm" + "\n";
            output += "    )" + "\n";
            output += "\n";
            index++;
        });

        // output += "    cylinder_bank_parameters bank_params(" + "\n";
        // output += "        bore: " + _CYLINDER_BORE + " * units.mm," + "\n";
        // output += "        deck_height: (" + _CYLINDER_DECK_HEIGHT + " + 1) * units.mm" + "\n";
        // output += "    )" + "\n";
        // output += "\n";

        index = 0;
        _INTAKE_TABLE.map((int) => {      
            output += "    intake intake" + int.id + "(" + "\n";
            output += "        intake_flow_rate: k_carb(" + int._INTAKE_CARB_CFM + ")," + "\n";
            output += "        idle_flow_rate: k_carb(" + int._INTAKE_IDLE_CFM + ")," + "\n";
            output += "        idle_throttle_plate_position: " + int._INTAKE_IDLE_PLATE + "," + "\n";
            output += "        throttle_gamma: " + int._INTAKE_THROTTLE_GAMMA + "\n";
            output += "    )" + "\n";
            output += "\n";
            index++;
        })

        index = 0;
        _EXHAUST_TABLE.map((exh) => {
            output += "    exhaust_system_parameters es_params" + exh.id + "(" + "\n";
            output += "        outlet_flow_rate: k_carb(" + exh._EXHAUST_OUTLET_FLOW_RATE + ")," + "\n";
            output += "        primary_tube_length: " + exh._EXHAUST_PRIMARY_TUBE_LENGTH + " * units.inch," + "\n";
            output += "        primary_flow_rate: k_carb(" + exh._EXHAUST_PRIMARY_FLOW_RATE + ")," + "\n";
            output += "        velocity_decay: " + exh._EXHAUST_VELOCITY_DECAY + ", //0.5" + "\n";
            output += "        volume: " + exh._EXHAUST_VOLUME + " * units.L" + "\n";
            output += "    )" + "\n";
            output += "\n";
            index++;
        })

        // DONE: Add exhaust counting shit
        index = 0;
        _EXHAUST_TABLE.map((exh) => {
            output += "    exhaust_system exhaust" + exh.id + "(es_params" + exh.id + ", audio_volume: 0.7, impulse_response: ir_lib.default_0)" + "\n";
            output += "\n";
            index++;
        });

        // DONE: Do bank stuff idk
        // remember cylinder_bank b0(bank_params(bore: bore, deck_height (height + 1) / 2), angle: 35 * units.deg)

        index = 0;
        let ind = 1;
        banks.map((bank) => {

            output += "    cylinder_bank b" + bank.id + "(bore: " + bank.bore.toString() + " * units.mm, deck_height: (" + bank.deck_height.toString() + " + 1) * units.mm, angle: " + bank.angle.toString() + " * units.deg)" + "\n";
            output += "    b" + bank.id + "\n";

            cylinders.map((cylinder) => {
                if(cylinder.bank == bank.id) {
                    output += "        .add_cylinder(" + "\n";
                    output += "            piston: piston(piston_params" + cylinder.piston + ", blowby: k_28inH2O(0.1))," + "\n";
                    output += "            connecting_rod: connecting_rod(cr_params" + cylinder.connectingRod + ")," + "\n";
                    output += "            rod_journal: rj" + cylinder.journalRod + "," + "\n";
                    output += "            intake: intake" + cylinder.intake + "," + "\n";
                    output += "            exhaust_system: exhaust" + cylinder.exhaust + "," + "\n";
                    output += "            ignition_wire: wires.wire" + ind + "\n";
                    output += "        )" + "\n";
                    ind++;
                }
            });

            output += "    engine.add_cylinder_bank(b" + bank.id + ")" + "\n";
            output += "\n";

        });

        for(let i = 0; i < _GENERAL_CRANK_COUNT; i++) {
            output += "    engine.add_crankshaft(c" + _GENERAL_CRANK_TABLE[i].id + ")" + "\n";
        }
        output += "\n";

        output += "    " + _GENERAL_NAME + "_camshaft_builder camshaft(" + "\n";
	    output += "        lobe_profile: " + _GENERAL_NAME + "_lobe_profile_int()," + "\n";
	    output += "	       ex_lobe_profile: " + _GENERAL_NAME + "_lobe_profile_exh()" + "\n";
	    output += "    )" + "\n";
        output += "\n";

        // TODO: set heads for banks

        /*
        output += "    " + _GENERAL_NAME + "_camshaft_builder camshaft(" + "\n";
        output += "        lobe_profile: " + _GENERAL_NAME + "_lobe_profile_int()," + "\n";
        output += "        ex_lobe_profile: " + _GENERAL_NAME + "_lobe_profile_exh()," + "\n";
        output += "        lobe_separation: " + _GENERAL_LOBE_SEPARATION + " * units.deg," + "\n";
        output += "        base_radius: " + _GENERAL_LOBE_RADIUS + " * units.inch" + "\n";
        output += "    )" + "\n";
        output += "\n";
        */

        banks.map((bank) => {
            output += "    b" + bank.id + ".set_cylinder_head (" + "\n";
            output += "        " + _GENERAL_NAME + "_head(" + "\n";
            output += "            intake_camshaft: camshaft.intake_cam_" + (bank.id-1) + "," + "\n";
            output += "            exhaust_camshaft: camshaft.exhaust_cam_" + (bank.id-1) + "\n";
            output += "        )" + "\n";
            output += "    )" + "\n";
            output += "\n";
        });

        // DONE: Add a timing curve
        output += "    function timing_curve(1000 * units.rpm)" + "\n";
        output += "    timing_curve" + "\n";
        for(let i = 0; i < _GENERAL_TIMING_TABLE.length; i++) {
            output += "        .add_sample(" + _GENERAL_TIMING_TABLE[i][0] + " * units.rpm, " + _GENERAL_TIMING_TABLE[i][1] + " * units.deg)" + "\n";
        }
        output += "\n";
        output += "    engine.add_ignition_module(" + "\n";
        output += "        " + _GENERAL_NAME + "_distributor(" + "\n";
        output += "            wires: wires," + "\n";
        output += "            timing_curve: timing_curve," + "\n";
        output += "            rev_limit: " + _DISTRIBUTOR_REV_LIMIT + " * units.rpm" + "\n";
        output += "        ))" + "\n";
        output += "}" + "\n";

        console.log(output);
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(new Blob([output], {type: "text/plain"}));
        a.download = _GENERAL_NAME + ".mr";
        a.click();
        a.remove();
        return output;
    }   
}

export default Generator;
