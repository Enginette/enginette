import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { InternalEditor, Editor, EditorTop, Top } from "./Bank";
import ConnectingRod from "../../../components/Rods/ConnectingRod";
import JournalRod from "../../../components/Rods/JournalRod";
import {
	MyInputs,
	MySideBar,
	TopSideBar,
	BottomSideBar,
	ConnectingRodsDiv,
} from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const InlineRodsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const JournalRodsDiv = styled(ConnectingRodsDiv)``;

const JournalRods = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();

	//loaded rods and engine
	const [engine, setEngine] = useState(null);
	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	//selected journal rod
	const [journalRod, setJournalRod] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Journal Rod #${id}?`
		);
		if (!confirmation) return;

		await Database.JournalRods.remove({ db: database, id });
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
				mass: 0,
				blowby: 0,
				compressionHeight: 0,
				wristPinPosition: 0,
				displacement: 0,
			},
		});

		setConnectingRods([...connectingRods, rod]);
	};

	useEffect(() => {
		if (!database) return;
		const loadRodsAsync = async () => {
			//load selected journal rod
			const journalRod = await Database.JournalRods.getById({
				db: database,
				id,
			});
			if (!journalRod) return setJournalRod(undefined);
			setJournalRod(journalRod);

			//load engine from database
			const engine = await Database.Engines.getById({
				db: database,
				id: journalRod.engine,
			});
			setEngine(engine);
			if (!engine) setEngine(undefined);

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
		alert("ERROR: Journal rod not found");
		return;
	}
	return (
		<JournalRodsDiv>
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
									engineID={engine.id}
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
						<h1>Journal Rod {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Angle:</h1>
							<p>degrees</p>
							<input
								key={journalRod.angle}
								autoFocus
								type="number"
								defaultValue={journalRod.angle}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.JournalRods.update({
										db: database,
										id,
										values: {
											...journalRod,
											angle: parseInt(e.target.value),
										},
									});
									setJournalRod({
										...journalRod,
										angle: parseInt(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</JournalRodsDiv>
	);
};

export default JournalRods;
