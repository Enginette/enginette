import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import { LoadingScreen, Input } from "./General";
import { InternalEditor, Editor, EditorTop } from "./Bank";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

import TuningTable1D from "../../../components/TuningTables/1D";

const DistributorDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const MyInternalEditor = styled(InternalEditor)`
	width: 100%;
`;

const Distributor = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [distributor, setDistributor] = useState(null);

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			const distributor = await Database.Distributor.getById({ 
				db: database,
				id,
			});
			if (!distributor) return setDistributor(undefined);
			setDistributor(distributor);

			const engineID = distributor.engine;
			//console.log(engineID);
			const engine = await Database.Engines.getById({ 
				db: database,
				id: engineID,
			});
			if (!engine) return setEngine(undefined);
			//console.log(engine);
			setEngine(engine);
		}
		loadDatabase();
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
				<MyInternalEditor>
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
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Distributor.update({
										db: database,
										id,
										values: {
											...distributor,
											rpm: parseInt(e.target.value),
										},
									});
									setDistributor({
										...distributor,
										rpm: parseInt(e.target.value),
									});
								}}
							/>
						</Input>
						
						{/* <h1>pls add a timing table idk how to do this</h1> */}
						{/* <p>maybe even a graph? 👀</p> */}

						<TuningTable1D />
						
					</MyInputs>
				</MyInternalEditor>
			</Editor>
		</DistributorDiv>
	);
};

export { MyInternalEditor };
export default Distributor;
