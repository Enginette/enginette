import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
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

const RodsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineRodsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Rods = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);

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
		const stuff = async () => {
			const engine = await Database.Engines.getById({
				db: database,
				id,
			});
			setEngine(engine);
			if (!engine) return;

			const connectingRods = await Database.Engines.ConnectingRods.all({
				db: database,
				id,
			});
			setConnectingRods(connectingRods);

			const journalRods = await Database.Engines.JournalRods.all({
				db: database,
				id,
			});
			setJournalRods(journalRods);
		};
		stuff();
	}, [database]);

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
		<RodsDiv>
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
					<EditorTop></EditorTop>
				</InternalEditor>
			</Editor>
		</RodsDiv>
	);
};

export default Rods;
