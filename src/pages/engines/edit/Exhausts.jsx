import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import Exhaust from "../../../components/Exhausts/ExhaustInline";
import ExhaustInline from "../../../components/Exhausts/ExhaustInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const ExhaustsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineExhaustsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Exhausts = ({database}) => {
	let { name, id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [exhausts, setExhausts] = useState([]);

	const addExhaust = async () => {
		const exhaust = await Database.Exhausts.add({
			db: database,
			values: {
				engine: engine.id,
				outletFlowRate: 0,
				length: 0,
				flowRate: 0,
				velocityDecay: 0,
				volume: 0,
			},
		});

		setExhausts([...exhausts, exhaust]);
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

			const exhausts = await Database.Engines.Exhausts.all({
				db: database,
				id,
			});
			setExhausts(exhausts);
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
		<ExhaustsDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Exhausts</h3>
						<img src={plus} alt="Add" onClick={addExhaust}/>
					</Top>

					<InlineExhaustsDiv>
						{exhausts.map((exh) => (
									<Exhaust
										key={exh.id}
										engineID={engine.id}
										{...exh}
										exhausts={exhausts}
										setExhausts={setExhausts}
										database={database}
									/>
							))}
					</InlineExhaustsDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
					</EditorTop>

					<MyInputs>	
					</MyInputs>
				</InternalEditor>
			</Editor>
		</ExhaustsDiv>
	);
};

export default Exhausts;
