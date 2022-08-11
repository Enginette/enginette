
document.getElementById("genBtn").onclick = generate;
document.getElementById("fileBtn").onclick = write;
document.getElementById("runBtn").onclick = launch;

const ENGINE_TYPES = {
	Inline: "I",
    V: "V"
};

let RESULT = "";

function generate()
{
    let name = document.getElementById("engine-name").value;
    let nameRep = name.replace(" ", "_");

    let maxRpm = document.getElementById("maxRpm").value;
    //let bore = document.getElementById("bore").value;

    //#region generation

    let output = "";
    // add base (imports and other)
    output +=   "import \"engine_sim.mr\"\n" +
                "import \"../part_library.mr\"\n" +
                "\n" +
                "units units();\n" +
                "constants constants();\n" + 
                "private node wires {\n";

    let cylCount = GET_WIRE_COUNT();
    let engineType = GET_ENGINE_TYPE();

    //#region wires
    for(let i = 0; i < cylCount; i++)
    {
        output += "    output wire" + i + ": ignition_wire();\n";
    }
    // end wires
    output +=   "}\n";
    //#endregion

    //#region  start engine
    output +=   "public node" + nameRep + " {\n" +
                "    alias output __out: engine;\n" +
                "    \n" +
                "    engine engine(\n" +
                "        name: \"" + name + "\",\n" +
                "        starter_torque: 200 * units.lb_ft,\n" +
                "        starter_speed: 1000 * units.rpm,\n" +
                "        redline: " + maxRpm + " * units.rpm\n" + 
                "    )\n" +
                "    \n";
    //#endregion

    //#region crank
    output +=   "    wires wires()\n";
                "    \n" +
                "    crankshaft c0(\n" +
                "        throw: 69 * units.mm / 2,\n" +
                "        flywheel_mass: 1.5 * units.lb,\n" +
                "        mass: 1 * units.lb,\n" +
                "        friction_torque: 1.0 * units.lb_ft,\n" +
                "        moment_of_inertia: 0.22986844776863666 * 0.5,\n" +
                "        position_x: 0.0,\n" +
                "        position_y: 0.0,\n" +
                "        tdc: -constants.pi / 4\n" +
                "    )\n";
    //#endregion

    //#region journals
    let interval;
    if(engineType == ENGINE_TYPES.Inline)
        interval = 360 / cylCount;
    else if(engineType == ENGINE_TYPES.V)
        interval = 360 / (cylCount / 2);
    
    let journalCount = 0;
    for(journalCount = 0; journalCount < cylCount; journalCount++)
    {
        let angle = interval * journalCount;
        output += "    rod_journal rj" + journalCount + "(angle:" + angle + ")\n";
    }
    // end
    output +=   "    c0\n";
    for(let i = 0; i < journalCount; i++)
    {
        output += "        .add_rod_journal(rj" + i +")\n";
    }
    //#endregion
    
    //#region piston/connecting rod stuff
    output +=   "    piston_parameters piston_params(\n" +
                "        mass: 350 * units.g," +
                "        //blowby: k_28inH2O(0.1),\n" +
                "        compression_height: 1.0 * units.inch,\n" +
                "        wrist_pin_position: 0.0,\n" +
                "        displacement: 0.0\n" +
                "    )\n" +
                "    \n";
    output +=   "    connecting_rod_parameters cr_params(\n" +
                "        mass: 250.0 * units.g,\n" +
                "        moment_of_inertia: 0.0015884918028487504,\n" +
                "        center_of_mass: 0.0,\n" +
                "        length: 4.0 * units.inch\n" +
                "    )\n" +
                "\n";
    //#endregion

    //#region bank params
    output +=   "    cylinder_bank_parameters bank_params("
                "        bore: 75 * units.mm,\n" +
                "        deck_height: (4.0 + 1) * units.inch + 69 * units.mm / 2\n" +
                "    )\n" +
                "    \n"
    //#endregion

    //#region intake/exhaust
    output +=   "    intake intake(\n" +
                "        plenum_volume: 1.0 * units.L,\n" +
                "        plenum_cross_section_area: 10.0 * units.cm2,\n" +
                "        intake_flow_rate: k_carb(50.0),\n" +
                "        idle_flow_rate: k_carb(0.0),\n" +
                "        idle_throttle_plate_position: 0.95,\n" +
                "        throttle_gamma: 1.0\n" +
                "    )\n" +
                "    \n";
    output +=   "    exhaust_system_parameters es_params(\n" +
                "        outlet_flow_rate: k_carb(300.0),\n" +
                "        primary_tube_length: 10.0 * units.inch,\n" +
                "        primary_flow_rate: k_carb(200.0),\n" +
                "        velocity_decay: 1.0,\n" +
                "        volume: 1.0 * units.L\n" +
                "    )\n"+
                "    \n";
    //#endregion

    //#region sound
    output +=   "impulse_response ir0(filename: \"../../smooth_39.wav\", volume: 0.001)\n" +
                "exhaust_system exhaust0(es_params, audio_volume: 1.0, impulse_response: ir0)\n" +
                "\n";
    //#endregion

    //#region 
    if(engineType == ENGINE_TYPES.Inline)
    {
        output += "    cylinder_bank b0(bank_params, angle: 0 * units.deg)\n" +
                  "    b0\n" +
            .add_cylinder(
                piston: piston(piston_params, blowby: k_28inH2O(0.1)),
                connecting_rod: connecting_rod(cr_params),
                rod_journal: rj0,
                intake: intake,
                exhaust_system: exhaust0,
                ignition_wire: wires.wire1
            )
    }
    else if(engineType == ENGINE_TYPES.V)
    {
        
    }
    //#endregion

    //#endregion

    RESULT = output
    document.getElementById("result").innerText = output;

}

function GET_WIRE_COUNT()
{
    let select = document.getElementById("select-engine-type");
    let type = select.value;
    if(type == "I3")
        return 3;
    if(type == "I4")
        return 4;
    if(type == "I5")
        return 5;
    if(type == "I6")
        return 6;
}

function GET_ENGINE_TYPE()
{
    let select = document.getElementById("select-engine-type");
    let type = select.value;
    if(type.startsWith("I"))
        return ENGINE_TYPES.Inline;
    if(type.startsWith("V"))
        return ENGINE_TYPES.V;
}

function write()
{
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([RESULT], {type: "text/plain"}));
    a.download = "engine.mr";
    a.click();
}

function launch()
{
    
}

