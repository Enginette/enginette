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
import Exhaust from "../../../components/Exhausts/Exhaust";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const ExhaustsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Exhausts = () => {
	let { name, id } = useParams();
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		const engine = Database.Engines.get({ name });
		if (!engine) return setEngine(undefined);
		setEngine(engine);
	}, []);

	if (engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
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
						<img src={plus} alt="Add" />
					</Top>

					<Exhaust name="Exhaust 1" btnID={1} engineName={name} />
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Exhaust {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<p>Outlet Flow Rate:</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<p>Length:</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<p>Flow Rate:</p>
							<input
								type="number"
								defaultValue={0}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<p>Velocity Decay:</p>
							<input
								type="number"
								defaultValue={1}
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>

						<Input>
							<p>Volume:</p>
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
		</ExhaustsDiv>
	);
};

export default Exhausts;
