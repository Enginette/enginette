import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { InternalEditor, Editor, EditorTop, Top } from "./Bank";
import ConnectingRod from "../../../components/Rods/ConnectingRod";
import JournalRod from "../../../components/Rods/JournalRod";
import {
	MyInputs,
	MySideBar,
	TopSideBar,
	BottomSideBar,
	ConnectingRodsDiv,
} from "./ConnectingRods";

const JournalRodsDiv = styled(ConnectingRodsDiv)``;

const JournalRods = ({ database }) => {
	let { name, id } = useParams();
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(async () => {
		const engine = Database.JournalRods.getById({ db: database, id: id });
		if (!engine) return setEngine(undefined);
		setEngine(engine.engine);
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
		<JournalRodsDiv>
			<Header engine={engine} />
			<Editor>
				<MySideBar>
					<TopSideBar>
						<Top>
							<h3>Journal Rods</h3>
							<img src={plus} alt="Add" />
						</Top>

						<JournalRod
							name="Journal Rod 1"
							id={1}
							engineName={name}
						/>
					</TopSideBar>
					<BottomSideBar>
						<Top>
							<h3>Connecting Rods</h3>
							<img src={plus} alt="Add" />
						</Top>

						<ConnectingRod
							name="Connecting Rod 1"
							id={1}
							engineName={name}
						/>
					</BottomSideBar>
				</MySideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Journal Rod {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Angle:</h1>
							<p>degrees</p>
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
		</JournalRodsDiv>
	);
};

export default JournalRods;
