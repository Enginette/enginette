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
	let { name, id, objectID } = useParams();
	id = parseInt(id);
	objectID = parseInt(objectID);
	const navigate = useNavigate();

	//loaded rods and engine
	const [engine, setEngine] = useState(null);
	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	//selected journal rod
	const [journalRod, setSelectedJournalRod] = useState(null);

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
		if(!database) return;
		const loadRodsAsync = async() =>
		{
			//load engine from database
			const engine = await Database.Engines.getById({
				db: database,
				id,
			});
			setEngine(engine);
			if (!engine) return;

			//load connecting rods from database
			const connectingRods = await Database.Engines.ConnectingRods.all({
				db: database,
				id,
			});
			setConnectingRods(connectingRods);

			//load journal rods from database
			const journalRods = await Database.Engines.JournalRods.all({
				db: database,
				id,
			});
			setJournalRods(journalRods);
			//load selected journal rod
			const journalRod = await Database.JournalRods.getById({ db: database, objectID });
			if (!journalRod) return setJournalRods(undefined);
			setSelectedJournalRod(journalRod);
		}
		
		loadRodsAsync();
	}, []);

	if (journalRod === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
			</LoadingScreen>
		);
	} else if (journalRod === undefined) {
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
							<img src={plus} alt="Add" onClick={addJournalRod}/>
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
							<img src={plus} alt="Add" />
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
						<h1>Journal Rod {objectID}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Angle:</h1>
							<p>degrees</p>
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
		</JournalRodsDiv>
	);
};

export default JournalRods;
