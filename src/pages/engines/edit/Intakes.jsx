import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import Intake from "../../../components/Intakes/IntakeInline";
import IntakeInline from "../../../components/Intakes/IntakeInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const IntakesDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineIntakesDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Intakes = ({database}) => {
	let { name, id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [intakes, setIntakes] = useState([]);

	const addIntake = async () => {
		const intake = await Database.Intakes.add({
			db: database,
			values: {
				engine: engine.id,
				plenumVolume: 1,
				plenumCrossSectionArea: 10,
				flowRate: 300,
				idleFlowRate: 0,
				idleThrottlePlatePosition: 0.98,
				throttleGamma: 1,
			},
		});

		setIntakes([...intakes, intake]);
	};

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			const engine = await Database.Engines.getById({
				db: database,
				id,
			});
			setEngine(engine);
			if (!engine) return;

			const intakes = await Database.Engines.Intakes.all({
				db: database,
				id,
			});
			setIntakes(intakes);
		};
		loadDatabase();
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
		<IntakesDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Intakes</h3>
						<img src={plus} alt="Add" onClick={addIntake}/>
					</Top>

					<InlineIntakesDiv>
						{intakes.map((intk) => (
									<Intake
										key={intk.id}
										engineID={engine.id}
										{...intk}
										intakes={intakes}
										setIntakes={setIntakes}
										database={database}
									/>
							))}
					</InlineIntakesDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
					</EditorTop>

					<MyInputs>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</IntakesDiv>
	);
};

export default Intakes;
