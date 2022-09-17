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
		//console.log(results);
		
		const engine = results.id;

		const lobe = await Database.Lobes.add({
			db: database,
			values: {
				engine,
				durationAtFiftyThousands: 160,
				gamma: 1,
				lift: 200,
				steps: 100,
			},
		});
		const lobes = await Database.Engines.Lobes.all({
			db: database,
			id: engine,
		});
		var idd = lobes[0].id;

		const head = await Database.CylinderHeads.add({
			db: database,
			values: {
				engine,
				chamber_volume: 33,
				lift_scale: 1,
				flow_attenuation: 1,
				intake_lobe: idd,
				exhaust_lobe: idd,
				lobe_advance: 0,
				lobe_radius: 0.6,
				lobe_separation: 110,

				intake: [
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
				],

				exhaust: [
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
				],
			},
		});

		const bank = await Database.Banks.add({
			db: database,
			values: {
				engine,
				bore: 70,
				deck_height: 205,
				angle: 0,
			},
		});

		const connecting = await Database.ConnectingRods.add({
			db: database,
			values: {
				engine,
				mass: 200,
				momentOfInertia: 0.22986844776863666,
				centerOfMass: 0,
				length: 120,
			},
		});

		const crankshaft = await Database.Crankshafts.add({
			db: database,
			values: {
				engine,
				throw: 90,
				flywheelMass: 4,
				mass: 3,
				frictionTorque: 10,
				momentOfInertia: 0.22986844776863666,
				topDeadCenter: 120,
				xPosition: 0,
				yPosition: 0,
			},
		});

		const journal = await Database.JournalRods.add({
			db: database,
			values: {
				engine,
				angle: 0,
				crankshaft: crankshaft.id,
			},
		});

		const exhaustdb = await Database.Exhausts.add({
			db: database,
			values: {
				engine,
				outletFlowRate: 200,
				length: 10,
				flowRate: 300,
				velocityDecay: 1,
				volume: 10,
			},
		});

		const intakedb = await Database.Intakes.add({
			db: database,
			values: {
				engine,
				plenumVolume: 1,
				plenumCrossSectionArea: 10,
				flowRate: 300,
				idleFlowRate: 0,
				idleThrottlePlatePosition: 0.98,
				throttleGamma: 1,
			},
		});

		const piston = await Database.Pistons.add({
			db: database,
			values: {
				engine,
				mass: 400,
				compressionHeight: 32,
				wristPinPosition: 0,
				displacement: 0,
			},
		});

		const cylinder = await Database.Cylinders.add({
			db: database,
			values: {
				engine,
				bank: bank.id,
				piston: piston.id,
				intake: intakedb.id,
				exhaust: exhaustdb.id,
				journalRod: journal.id,
				connectingRod: connecting.id,
			},
		});

		const distributor = await Database.Distributor.add({
			db: database,
			values: { 
				engine, 
				rpm: 6000,
				timings: [
					0, 30, 30, 30, 30, 30, 30,
				],
				firing_order: "1",
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
