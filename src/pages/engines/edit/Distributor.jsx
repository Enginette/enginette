import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import { LoadingScreen, Input } from "./General";
import { InternalEditor, Editor, EditorTop } from "./Bank";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const DistributorDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Distributor = () => {
	let { id } = useParams();
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
		<DistributorDiv>
			<Header engine={engine} />
			<Editor>
				<InternalEditor>
					<EditorTop>
						<h1>Distributor</h1>
						{/*
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
						*/}
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Rev limit:</h1>
							<p>rpm</p>
							<input
								type="number"
								defaultValue={6000}
								min="0"
								step="100"
								onChange={(e) => {
									// TODO: implement the database shit
								}}
							/>
						</Input>
						<h1>pls add a timing table idk how to do this</h1>
						<p>maybe even a graph? 👀</p>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</DistributorDiv>
	);
};

export default Distributor;
