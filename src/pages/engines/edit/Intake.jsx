import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import IntakeInline from "../../../components/Intakes/IntakeInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const IntakeDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Intake = () => {
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
		<IntakeDiv>
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
						<h1>Intake {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Plenum Volume:</h1>
							<input
								type="number"
								defaultValue={1}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Plenum Cross Section Area:</h1>
							<input
								type="number"
								defaultValue={10}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Flow Rate:</h1>
							<p>scfm</p>
							<input
								type="number"
								defaultValue={300}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Idle Flow Rate:</h1>
							<p>scfm</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Idle throttle plate position:</h1>
							<input
								type="number"
								defaultValue={0.98}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Throttle Gamma:</h1>
							<input
								type="number"
								defaultValue={1}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</IntakeDiv>
	);
};

export default Intake;
