import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import CrankshaftInline from "../../../components/Crankshafts/CrankshaftInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const CrankshaftDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineCrankshaftsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Crankshaft = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [crankshafts, setCrankshafts] = useState([]);
	//selected crankshaft
	const [crankshaft, setCrankshaft] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Crankshaft #${id}?`
		);
		if (!confirmation) return;

		await Database.Crankshafts.remove({ db: database, id });
		navigate(`/engines/${engine.id}/edit/crankshafts`);
	};


	const addCrankshaft = async () => {
		const shaft = await Database.Crankshafts.add({
			db: database,
			values: {
				engine: engine.id,
				throw: 90,
				flywheelMass: 0,
				mass: 0,
				frictionTorque: 0,
				momentOfInertia: 0,
				topDeadCenter: 0,
				xPosition: 0,
				yPosition: 0,
			},
		});

		setCrankshafts([...crankshafts, shaft]);
	};

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			//load selected crankshaft
			const crankshaft = await Database.Crankshafts.getById({
				db: database,
				id,
			});
			if (!crankshaft) return setCrankshaft(undefined);
			setCrankshaft(crankshaft);

			const engine = await Database.Engines.getById({
				db: database,
				id: crankshaft.engine,
			});
			setEngine(engine);
			if (!engine) return;

			const crankshafts = await Database.Engines.Crankshafts.all({
				db: database,
				id: engine.id,
			});
			setCrankshafts(crankshafts);
		};
		loadDatabase();
	}, [database, id]);

	if (engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
			</LoadingScreen>
		);
	} else if (engine === undefined) {
		navigate("/");
		return;
	}
	return (
		<CrankshaftDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Crankshafts</h3>
						<img src={plus} alt="Add" onClick={addCrankshaft}/>
					</Top>

					<InlineCrankshaftsDiv>
						{crankshafts.map((shaft) => (
									<CrankshaftInline
										key={shaft.id}
										engineID={engine.id}
										{...shaft}
										crankshafts={crankshafts}
										setCrankshafts={setCrankshafts}
										database={database}
									/>
							))}
					</InlineCrankshaftsDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Crankshaft {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Throw:</h1>
							<p>mm</p>
							<input
								key={crankshaft.throw}
								autoFocus
								type="number"
								defaultValue={crankshaft.throw}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											throw: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										throw: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Flywheel Mass:</h1>
							<p>kg</p>
							<input
								key={crankshaft.flywheelMass}
								autoFocus
								min="0"
								type="number"
								defaultValue={crankshaft.flywheelMass}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											flywheelMass: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										flywheelMass: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Mass:</h1>
							<p>kg</p>
							<input
								key={crankshaft.mass}
								autoFocus
								type="number"
								min="0"
								defaultValue={crankshaft.mass}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											mass: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										mass: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Friction Torque:</h1>
							<p>lb-ft</p>
							<input
								key={crankshaft.frictionTorque}
								autoFocus
								type="number"
								min="0"
								step="0.01"
								defaultValue={crankshaft.frictionTorque}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											frictionTorque: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										frictionTorque: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Moment of inertia:</h1>
							<input
								key={crankshaft.momentOfInertia}
								autoFocus
								type="number"
								min="0"
								step="0.01"
								defaultValue={crankshaft.momentOfInertia}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											momentOfInertia: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										momentOfInertia: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Top dead center:</h1>
							<p>degrees</p>
							<input
								key={crankshaft.topDeadCenter}
								autoFocus
								type="number"
								min="0"
								defaultValue={crankshaft.topDeadCenter}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											topDeadCenter: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										topDeadCenter: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>X postion:</h1>
							<input
								key={crankshaft.xPosition}
								autoFocus
								type="number"
								step="0.1"
								defaultValue={crankshaft.xPosition}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											xPosition: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										xPosition: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Y postion:</h1>
							<input
								key={crankshaft.yPosition}
								autoFocus
								type="number"
								step="0.1"
								defaultValue={crankshaft.yPosition}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Crankshafts.update({
										db: database,
										id,
										values: {
											...crankshaft,
											yPosition: parseInt(e.target.value),
										},
									});
									setCrankshaft({
										...crankshaft,
										yPosition: parseInt(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</CrankshaftDiv>
	);
};

export default Crankshaft;
