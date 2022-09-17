import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import Piston from "../../../components/Pistons/PistonInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const PistonsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlinePistonsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Pistons = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [pistons, setPistons] = useState([]);

	const addPiston = async () => {
		const piston = await Database.Pistons.add({
			db: database,
			values: {
				engine: engine.id,
				mass: 400,
				compressionHeight: 32,
				wristPinPosition: 0,
				displacement: 0,
			},
		});

		setPistons([...pistons, piston]);
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

			const pistons = await Database.Engines.Pistons.all({
				db: database,
				id,
			});
			setPistons(pistons);
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
		<PistonsDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Pistons</h3>
						<img src={plus} alt="Add" onClick={addPiston}/>
					</Top>

					<InlinePistonsDiv>
						{pistons.map((piston) => (
									<Piston
										key={piston.id}
										engineID={engine.id}
										{...piston}
										pistons={pistons}
										setPistons={setPistons}
										database={database}
									/>
							))}
					</InlinePistonsDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
					</EditorTop>

					<MyInputs>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</PistonsDiv>
	);
};

export default Pistons;
