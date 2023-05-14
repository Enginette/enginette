import DB from "../database/db";

class PythonGenerator {

    static runScript = async (code) => {
        const pyodide = await window.loadPyodide({
            indexURL : "https://cdn.jsdelivr.net/pyodide/v0.23.1/full/"
        });
        
        await pyodide.runPythonAsync(code);
        return pyodide.globals.get('out');
    }

    static generate = async ({engine, transmission, vehicle, log, logLink}) => {
        
        let json = await (await fetch("https://api.github.com/repos/ange-yaghi/engine-generator/branches/master")).json()
        // console.log(json);
        log(`Engine Generator commit ${json.commit.commit.author.name} ${json.commit.commit.author.date} - '${json.commit.commit.message}'`)
        let generated_function = `\n
banks = []
${engine.banks.map((bank) => `banks.append(Bank(range(${bank.cylinders}), ${bank.bank_angle}))`)}

engine = Engine(banks, [${engine.distributor.firing_order}])
engine.engine_name = "${engine.name}"
# engine.node_name = "${DB.ID(engine.name)}"

# root
engine.starter_torque = ${engine.starter_torque}
engine.starter_speed = ${engine.starter_speed}
engine.throttle_gamma = ${engine.throttle_gamma}
engine.redline = ${engine.redline}
engine.simulation_frequency = ${engine.simulation_frequency}

# sound
engine.hf_gain = ${engine.sound.hf_gain}
engine.noise = ${engine.sound.noise}
engine.jitter = ${engine.sound.jitter}

# main
engine.stroke = ${engine.main.stroke}
engine.bore = ${engine.main.bore}
engine.rod_length = ${engine.main.rod_length}
engine.rod_mass = ${engine.main.rod_mass}
engine.compression_height = ${engine.main.compression_height}
engine.crank_mass = ${engine.main.crank_mass}
engine.flywheel_mass = ${engine.main.flywheel_mass}
engine.flywheel_radius = ${engine.main.flywheel_radius}
engine.piston_mass = ${engine.main.piston_mass}
engine.piston_blowby = ${engine.main.piston_blowby}

# intake
engine.plenum_volume = ${engine.intake.plenum_volume}
engine.plenum_cross_section_area = ${engine.intake.plenum_cross_section_area}
engine.intake_flow_rate = ${engine.intake.intake_flow_rate}
engine.runner_flow_rate = ${engine.intake.runner_flow_rate}
engine.runner_length = ${engine.intake.runner_length}
engine.idle_flow_rate = ${engine.intake.idle_flow_rate}
engine.idle_throttle_plate_position = ${engine.intake.idle_throttle_plate_position}

# exhaust
engine.exhaust_length = ${engine.exhaust.exhaust_length}

# camshaft
engine.lobe_separation = ${engine.camshaft.lobe_separation}
engine.camshaft_base_radius = ${engine.camshaft.camshaft_base_radius}
engine.intake_lobe_center = ${engine.camshaft.intake_lobe_center}
engine.exhaust_lobe_center = ${engine.camshaft.exhaust_lobe_center}
engine.intake_lobe_lift = ${engine.camshaft.intake.lift}
engine.intake_lobe_duration = ${engine.camshaft.intake.duration}
engine.intake_lobe_gamma = ${engine.camshaft.intake.gamma}
engine.intake_lobe_steps = ${engine.camshaft.intake.steps}
engine.exhaust_lobe_lift = ${engine.camshaft.exhaust.lift}
engine.exhaust_lobe_duration = ${engine.camshaft.exhaust.duration}
engine.exhaust_lobe_gamma = ${engine.camshaft.exhaust.gamma}
engine.exhaust_lobe_steps = ${engine.camshaft.exhaust.steps}

# head
engine.chamber_volume = ${engine.head.chamber_volume}
engine.intake_runner_volume = ${engine.head.intake_runner_volume}
engine.intake_runner_cross_section = [${engine.head.intake_runner_cross_section}]
engine.exhaust_runner_volume = ${engine.head.exhaust_runner_volume}
engine.intake_runner_cross_section = [${engine.head.exhaust_runner_cross_section}]

# distributor
engine.timing_curve = [\n${engine.distributor.timing_curve.map(a => { return "    [" + a.join(",") + "]"; }).join(",\n")}\n]
engine.rev_limit = ${engine.distributor.rev_limit}
engine.limiter_duration = ${engine.distributor.limiter_duration}

# transmission
engine.transmission.gears = [${transmission.gears}]
engine.transmission.max_clutch_torque = ${transmission.max_clutch_torque}

# vehicle
engine.vehicle.mass = ${vehicle.mass}
engine.vehicle.drag_coefficient = ${vehicle.drag_coefficient}
engine.vehicle.cross_sectional_area = [${vehicle.cross_sectional_area}]
engine.vehicle.diff_ratio = ${vehicle.diff_ratio}
engine.vehicle.tire_radius = ${vehicle.tire_radius}
engine.vehicle.rolling_resistance = ${vehicle.rolling_resistance}

engine.generate()
out = engine.write_to_string()
`;
        
        log("Fetching Script...");
        let script = await (await fetch("https://raw.githubusercontent.com/ange-yaghi/engine-generator/master/engine_generator.py")).text()
        script += generated_function;
        console.log(script);

        log("Running Script...");
        try {
            let file = await this.runScript(script);
            log("Done.");
            logLink("Result", window.URL.createObjectURL(new Blob([file], {type: "text/plain"})), DB.ID(engine.name) + ".mr");
            console.log(file);
        } catch (error) {
            log("Error occured: " + error.message);
        }
    }

}

export default PythonGenerator;
