import { useState } from "react";
import styled from "styled-components";
import edit from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import { EngineDiv, Right } from "./Engine";
import Database from "../../database/database";

const Left = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	> button {
		width: 30px;
		height: 30px;
		border: none;
		outline: none;
		background-color: white;
		cursor: pointer;
	}
	> input {
		padding: 10px 15px;
		border-radius: 2em;
		font-size: 20px;
		color: #080b2d;
		outline: none;
		border: 1px solid #8794b0;
	}
`;

const listOfEngines = [
	"Toyota 2JZ GTE",
	"Nissan RB32",
	"Big block V8",
	"Small block V8",
	"Honda B-Series VTEC",
	"GM LS V8",
	"BMW N54",
];

const NewEngine = ({ database, close, engines, setEngines }) => {
	const [name, setName] = useState("");
	const handleNameChange = (e) => {
		if (e.target.value.length === 0)
			e.target.placeholder =
				listOfEngines[Math.floor(Math.random() * listOfEngines.length)];
		setName(e.target.value);
		e.target.style.border = "1px solid #8794b0";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (await Database.Engines.exists({ db: database, name })) {
			document.getElementById("name_input").style.border =
				"1px solid red";
			alert("Engine already exists.");
			return;
		} else if (name.trim().length === 0) {
			document.getElementById("name_input").style.border =
				"1px solid red";
			alert("Please fill the name");
			return;
		}

		const results = await Database.Engines.add({
			db: database,
			values: { name },
		});
		console.log(results);
		
		const engine = results.id;
		const rpm = 6000;
		const timings = [ 0, 30, 30, 30, 30, 30, 30 ];
		const dist = await Database.Distributor.add({
			db: database,
			values: { engine, rpm, timings },
		});


		const chamber_volume = 33;
		const lift_scale = 1;
		const flow_attenuation = 1;

		const intake = [
			0,
			34,
			62,
			104,
			130,
			140,
			148,
			152,
			154,
			158,
			166,
			172,
			180,
		]

		const exhaust = [
			0,
			22,
			33,
			60,
			76,
			86,
			92,
			90,
			88,
			84,
		    80,
		    80,
		    72,
		];

		const head = await Database.CylinderHeads.add({
			db: database,
			values: {
				engine, 
				chamber_volume, 
				lift_scale, 
				flow_attenuation,

				intake,

				exhaust,
			},
		});
		
		setEngines([...engines, results]);
		close();
	};

	return (
		<EngineDiv>
			<Left onSubmit={handleSubmit}>
				<input
					id="name_input"
					type="text"
					placeholder={
						listOfEngines[
							Math.floor(Math.random() * listOfEngines.length)
						]
					}
					value={name}
					onChange={handleNameChange}
				/>
				<button type="submit">
					<img src={edit} alt="edit" />
				</button>
			</Left>
			<Right>
				<img src={deleteIcon} alt="Delete" onClick={close} />
			</Right>
		</EngineDiv>
	);
};

export default NewEngine;
