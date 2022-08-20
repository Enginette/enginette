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
import Piston from "../../../components/Pistons/PistonInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const PistonsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Pistons = () => {
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
		<PistonsDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Pistons</h3>
						<img src={plus} alt="Add" />
					</Top>

					<Piston name="Piston 1" btnID={1} engineName={name} />
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
