import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import Crankshaft from "../../../components/Crankshafts/CrankshaftInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import CrankshaftInline from "../../../components/Crankshafts/CrankshaftInline";
import { InlineBanksDiv } from "./Bank";

const CrankshaftsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineCrankshaftsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Crankshafts = ({database}) => {
	let { name, id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [crankshafts, setCrankshafts] = useState([]);

	const addCrankshaft = async () => {
		const shaft = await Database.Crankshafts.add({
			db: database,
			values: {
				engine: engine.id,
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

		setCrankshafts([...crankshafts, shaft]);
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

			const crankshafts = await Database.Engines.Crankshafts.all({
				db: database,
				id,
			});
			setCrankshafts(crankshafts);
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
		<CrankshaftsDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Crankshafts</h3>
						<img src={plus} alt="Add" onClick={addCrankshaft}/>
					</Top>

					<InlineCrankshaftsDiv>
						{crankshafts.map((shaft) => (
									<Crankshaft
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
					</EditorTop>

					<MyInputs>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</CrankshaftsDiv>
	);
};

export default Crankshafts;
