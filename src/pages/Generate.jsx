import styled from "styled-components";
import { HomeDiv, Div } from "./Home";
import { Link } from "react-router-dom";
import DB from "../database/db";
import { useEffect, useState } from "react";
import PythonGenerator from "../exporter/python";

const GenerateDiv = styled(HomeDiv)`
    > div {
        > div {
            margin-bottom: 15px;
            > select {
                margin-left: 5px;
                border-radius: 10px;
                padding: 5px;
                border: none;
                background-color: #52555a;
                color:#BEC2C8;
            }
        }
        > button {
            border-radius: 10px;
            padding: 7.5px;
            border: none;
            background-color: #52555a;
            color:#BEC2C8;
            transition: background-color 500ms;
        }
        > button:hover {
            background-color: #62656b;
        }
        > code {
            border-radius: 10px;
            padding: 7.5px;
            border: none;
            background-color: #52555a;
            color:#BEC2C8;
            /* width: 100%; */
            width: 75%;
        }
    }
`;

const Generate = () => {
	const [engines, setEngines] = useState([]);
	const [transmissions, setTransmissions] = useState([]);
	const [vehicles, setVehicles] = useState([]);
    const [generateLog, setGenerateLog] = useState([{type: "p", message: "Idle"}]);

    useEffect(() => {
        setEngines(DB.GetEngines());
        setTransmissions(DB.GetTransmissions());
        setVehicles(DB.GetVehicles());
    }, []);

    const log = (value) => {
        let newLog = generateLog.slice();
        console.log(`log: '${value}'`)
        newLog.push({type: "p", message: "    " + value});
        setGenerateLog(newLog);
    }
    const logLink = (value, link, name) => {
        let newLog = generateLog.slice();
        console.log(`link: '${value}' - download: ${name} href: '${link}'`)
        newLog.push({type: "a", message: "    " + value, href: link, download: name});
        setGenerateLog(newLog);
    }

    const handleClick = (e) => {
        let engineID = document.getElementById("engine").value;
        let transmissionID = document.getElementById("transmission").value;
        let vehicleID = document.getElementById("vehicle").value;

        let engine = DB.GetEngine(engineID);
        let transmission = DB.GetTransmission(transmissionID);
        let vehicle = DB.GetVehicle(vehicleID);
        PythonGenerator.generate({engine, transmission, vehicle, log, logLink});
    }

	return (
		<GenerateDiv>
			<Div>
				<h1>Enginette Generator</h1>
                <pre>Python Engine Generator by AngeTheGreat</pre>
                <br/>

                <div>
                    <label htmlFor="engine">Choose an engine:</label>
                    <select name="engine" id="engine">
                        {engines.map((engine) => {
                            return (<option key={engine} value={DB.ID(engine)}>{engine}</option>)
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="transmission">Choose a transmission:</label>
                    <select name="transmission" id="transmission">
                        {transmissions.map((transmission) => {
                            return (<option key={transmission} value={DB.ID(transmission)}>{transmission}</option>)
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="vehicle">Choose a vehicle:</label>
                    <select name="vehicle" id="vehicle">
                        {vehicles.map((vehicle) => {
                            return (<option key={vehicle} value={DB.ID(vehicle)}>{vehicle}</option>)
                        })}
                    </select>
                </div>

                <button onClick={handleClick}>Generate</button>
                <br/>
                <code id="generateLog">
                    {generateLog.map(value => {
                        if(value.type === "p") {
                            return (<p key={value.message + Math.random()}>
                                {value.message}
                            </p>);
                        }
                        else {
                            return (<p key={value.message + Math.random()}>
                                <a download={value.download} href={value.href}>{value.message}</a>
                            </p>);
                        }
                    })}
                </code>

                <br/>
				<Link to={"/"}>Go back to home</Link>
            </Div>
        </GenerateDiv>
	);
};

export default Generate;
