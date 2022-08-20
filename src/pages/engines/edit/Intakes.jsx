import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop } from "./Bank";
import { Top } from "../../Home";
import IntakeInline from "../../../components/Intakes/IntakeInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const IntakesDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Intakes = () => {
	let { name, id } = useParams();
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		const engine = Database.Engines.getById({ id });
		if (!engine) return setEngine(undefined);
		setEngine(engine);
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
		<IntakesDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Intakes</h3>
						<img src={plus} alt="Add" />
					</Top>

					<IntakeInline name="Intake 1" btnID={1} engineName={id} />
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
