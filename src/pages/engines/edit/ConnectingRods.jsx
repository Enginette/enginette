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

const ConnectingRods = ({database}) => {
	let { name, id, objectID} = useParams();
	id = parseInt(id);
	objectID = parseInt(objectID);
	const navigate = useNavigate();

	//loaded rods and engine
	const [engine, setEngine] = useState(null);
	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	//selected connecting rod
	const [connectingRod, setSelectedConnectingRod] = useState(null);

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
			const connectingRod = await Database.JournalRods.getById({ db: database, objectID });
			if (!connectingRod) return setSelectedConnectingRod(undefined);
			setSelectedConnectingRod(connectingRod);
		}
		
		loadRodsAsync();
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
		<ConnectingRodsDiv>
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
							<img src={plus} alt="Add" onClick={addConnectingRod}/>
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
						<h1>Connecting Rod {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Mass:</h1>
							<p>grams</p>
							<input
								type="number"
								defaultValue={250}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Moment of inertia:</h1>
							<input
								type="number"
								defaultValue={0.0015884918028487504}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Center of Mass:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Length:</h1>
							<p>mm</p>
							<input
								type="number"
								defaultValue={4}
								onChange={(e) => {
									// TODO: implement the database shit
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
