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
		const dist = await Database.Distributor.add({
			db: database,
			values: { engine, rpm },
		});


		const chamber_volume = 33;
		const lift_scale = 1;
		const flow_attenuation = 1;

		const intake_0 = 0;
		const intake_1 = 34;
		const intake_2 = 62;
		const intake_3 = 104;
		const intake_4 = 130;
		const intake_5 = 140;
		const intake_6 = 148;
		const intake_7 = 152;
		const intake_8 = 154;
		const intake_9 = 158;
		const intake_10 = 166;
		const intake_11 = 172;
		const intake_12 = 180;

		const exhaust_0 = 0;
		const exhaust_1 = 22;
		const exhaust_2 = 33;
		const exhaust_3 = 60;
		const exhaust_4 = 76;
		const exhaust_5 = 86;
		const exhaust_6 = 92;
		const exhaust_7 = 90;
		const exhaust_8 = 88;
		const exhaust_9 = 84;
		const exhaust_10 = 80;
		const exhaust_11 = 80;
		const exhaust_12 = 72;

		const head = await Database.CylinderHeads.add({
			db: database,
			values: {
				engine, 
				chamber_volume, 
				lift_scale, 
				flow_attenuation,

				intake_0,
				intake_1,
				intake_2,
				intake_3,
				intake_4,
				intake_5,
				intake_6,
				intake_7,
				intake_8,
				intake_9,
				intake_10,
				intake_11,
				intake_12,

				exhaust_0,
				exhaust_1,
				exhaust_2,
				exhaust_3,
				exhaust_4,
				exhaust_5,
				exhaust_6,
				exhaust_7,
				exhaust_8,
				exhaust_9,
				exhaust_10,
				exhaust_11,
				exhaust_12,
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
