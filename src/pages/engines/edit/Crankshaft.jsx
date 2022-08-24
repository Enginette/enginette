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
	}, []);

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
								type="number"
								defaultValue={90}
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
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Mass:</h1>
							<p>kg</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Friction Torque:</h1>
							<p>lb-ft</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Moment of inertia:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Top dead center:</h1>
							<p>degrees</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>X postion:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Y postion:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
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
