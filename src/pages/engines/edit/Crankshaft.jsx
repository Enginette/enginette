import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import CrankshaftInline from "../../../components/Crankshafts/CrankshaftInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const CrankshaftDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Crankshaft = () => {
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
		<CrankshaftDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Crankshafts</h3>
						<img src={plus} alt="Add" />
					</Top>

					<CrankshaftInline
						name="Crankshaft 1"
						btnID={1}
						engineName={name}
					/>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Crankshaft {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Throw:</h1>
							<p>mm</p>
							<input
								type="number"
								defaultValue={90}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Flywheel Mass:</h1>
							<p>kg</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Mass:</h1>
							<p>kg</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Friction Torque:</h1>
							<p>lb-ft</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Moment of inertia:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Top dead center:</h1>
							<p>degrees</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>X postion:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<h1>Y postion:</h1>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</CrankshaftDiv>
	);
};

export default Crankshaft;
