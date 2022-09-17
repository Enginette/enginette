import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import Lobe from "../../../components/Lobes/LobeInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const LobesDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineLobesDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Lobes = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [lobes, setLobes] = useState([]);

	const addLobe = async () => {
		const lobe = await Database.Lobes.add({
			db: database,
			values: {
				engine: engine.id,
				durationAtFiftyThousands: 160,
				gamma: 1,
				lift: 200,
				steps: 100,
			},
		});

		setLobes([...lobes, lobe]);
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

			const lobes = await Database.Engines.Lobes.all({
				db: database,
				id,
			});
			setLobes(lobes);
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
		<LobesDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Lobes</h3>
						<img src={plus} alt="Add" onClick={addLobe}/>
					</Top>

					<InlineLobesDiv>
						{lobes.map((lb) => (
									<Lobe
										key={lb.id}
										engineID={engine.id}
										{...lb}
										lobes={lobes}
										setLobes={setLobes}
										database={database}
									/>
							))}
					</InlineLobesDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
					</EditorTop>

					<MyInputs>
						
					</MyInputs>
				</InternalEditor>
			</Editor>
		</LobesDiv>
	);
};

export default Lobes;
