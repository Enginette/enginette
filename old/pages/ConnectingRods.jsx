import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Inputs, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import ConnectingRod from "../../../components/Rods/ConnectingRod";
import JournalRod from "../../../components/Rods/JournalRod";
import { InlineBanksDiv } from "./Bank";

const ConnectingRodsDiv = styled.div`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const MySideBar = styled(SideBar)`
	background-color: transparent;
	box-shadow: none;
	gap: 20px;
	padding: 0px;
`;

const TopSideBar = styled(SideBar)`
	/* flex-grow: 1; */
`;

const BottomSideBar = styled(SideBar)`
	/* flex-grow: 1; */
`;

const MyInputs = styled(Inputs)`
	background-color: transparent;
	box-shadow: none;
	padding: 0px;
`;

const InlineRodsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const ConnectingRods = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();

	//loaded rods and engine
	const [engine, setEngine] = useState(null);
	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	//selected connecting rod
	const [connectingRod, setConnectingRod] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Connecting rod #'${id}'?`
		);
		if (!confirmation) return;

		await Database.ConnectingRods.remove({
			db: database,
			id,
		});
		navigate(`/engines/${engine.id}/edit/rods`);
	};

	const addJournalRod = async () => {
		const rod = await Database.JournalRods.add({
			db: database,
			values: {
				engine: engine.id,
				angle: 0,
			},
		});
		setJournalRods([...journalRods, rod]);
	};

	const addConnectingRod = async () => {
		const rod = await Database.ConnectingRods.add({
			db: database,
			values: {
				engine: engine.id,
				mass: 200,
				momentOfInertia: 0.22986844776863666,
				centerOfMass: 0,
				length: 120,
			},
		});

		setConnectingRods([...connectingRods, rod]);
	};

	useEffect(() => {
		if (!database) return;
		const loadRodsAsync = async () => {
			//load selected journal rod
			const connectingRod = await Database.ConnectingRods.getById({
				db: database,
				id,
			});
			if (!connectingRod) return setConnectingRod(undefined);
			setConnectingRod(connectingRod);

			//load engine from database
			const engine = await Database.Engines.getById({
				db: database,
				id: connectingRod.engine,
			});
			setEngine(engine);
			if (!engine) return setEngine(undefined);

			//load connecting rods from database
			const connectingRods = await Database.Engines.ConnectingRods.all({
				db: database,
				id: engine.id,
			});
			setConnectingRods(connectingRods);

			//load journal rods from database
			const journalRods = await Database.Engines.JournalRods.all({
				db: database,
				id: engine.id,
			});
			setJournalRods(journalRods);
		};

		loadRodsAsync();
	}, [database, id]);
	if (engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>
					Not Loading? <br /> Maybe the page encountered an error.
					Check the console for more details
				</p>
			</LoadingScreen>
		);
	} else if (engine === undefined) {
		navigate("/");
		return;
	}
	return (
		<ConnectingRodsDiv>
			<Header engine={engine} />
			<Editor>
				<MySideBar>
					<TopSideBar>
						<Top>
							<h3>Journal Rods</h3>
							<img src={plus} alt="Add" onClick={addJournalRod} />
						</Top>

						<InlineRodsDiv>
							{journalRods.map((rod) => (
								<JournalRod
									key={rod.id}
									engineID={engine.id}
									{...rod}
									journalRods={journalRods}
									setJournalRods={setJournalRods}
									database={database}
								/>
							))}
						</InlineRodsDiv>
					</TopSideBar>
					<BottomSideBar>
						<Top>
							<h3>Connecting Rods</h3>
							<img
								src={plus}
								alt="Add"
								onClick={addConnectingRod}
							/>
						</Top>

						<InlineRodsDiv>
							{connectingRods.map((rod) => (
								<ConnectingRod
									key={rod.id}
									engineID = {engine.id}
									{...rod}
									connectingRods={connectingRods}
									setConnectingRods={setConnectingRods}
									database={database}
								/>
							))}
						</InlineRodsDiv>
					</BottomSideBar>
				</MySideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Connecting Rod {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Mass:</h1>
							<p>grams</p>
							<input
								type="number"
								key={connectingRod.mass}
								autoFocus
								min="0"
								defaultValue={connectingRod.mass}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.ConnectingRods.update({
										db: database,
										id,
										values: {
											...connectingRod,
											mass: parseFloat(e.target.value),
										},
									});
									setConnectingRod({
										...connectingRod,
										mass: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Moment of Inertia:</h1>
							<input
								type="number"
								defaultValue={connectingRod.momentOfInertia}
								autoFocus
								min="0"
								step="0.01"
								key={connectingRod.momentOfInertia}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.ConnectingRods.update({
										db: database,
										id,
										values: {
											...connectingRod,
											momentOfInertia: parseFloat(e.target.value),
										},
									});
									setConnectingRod({
										...connectingRod,
										momentOfInertia: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Center of mass:</h1>
							<input
								type="number"
								defaultValue={connectingRod.centerOfMass}
								autoFocus
								min="0"
								step="0.01"
								key={connectingRod.centerOfMass}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.ConnectingRods.update({
										db: database,
										id,
										values: {
											...connectingRod,
											centerOfMass: parseFloat(
												e.target.value
											),
										},
									});
									setConnectingRod({
										...connectingRod,
										centerOfMass: parseFloat(
											e.target.value
										),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Length:</h1>
							<p>mm</p>
							<input
								type="number"
								defaultValue={connectingRod.length}
								autoFocus
								min="0"
								step="0.01"
								key={connectingRod.length}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.ConnectingRods.update({
										db: database,
										id,
										values: {
											...connectingRod,
											length: parseFloat(
												e.target.value
											),
										},
									});
									setConnectingRod({
										...connectingRod,
										length: parseFloat(
											e.target.value
										),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</ConnectingRodsDiv>
	);
};

export { MyInputs, MySideBar, TopSideBar, BottomSideBar, ConnectingRodsDiv };
export default ConnectingRods;
