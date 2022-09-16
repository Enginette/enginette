import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import { LoadingScreen, Input } from "./General";
import { InternalEditor, Editor, EditorTop } from "./Bank";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { MyInternalEditor } from "./Distributor";

import TuningTable2x1D from "../../../components/TuningTables/2x1D";

const CylinderheadDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Cylinderhead = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [cylinderHead, setCylinderHead] = useState(null);

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			const cylinderHead = await Database.CylinderHeads.getById({ 
				db: database,
				id,
			});
			if (!cylinderHead) return setCylinderHead(undefined);
			setCylinderHead(cylinderHead);

			const engineID = cylinderHead.engine;
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
	}, [database, id]);

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
		<CylinderheadDiv>
			<Header engine={engine} />
			<Editor>
				<MyInternalEditor>
					<EditorTop>
						<h1>Cylinder head</h1>
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
							<h1>Chamber volume:</h1>
							<p>cc</p>
							<input
								type="number"
								defaultValue={33}
								min="0"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											chamber_volume: parseInt(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										chamber_volume: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

                        <Input>
							<h1>Lift scale:</h1>
							<p></p>
							<input
								type="number"
								defaultValue={1.0}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											lift_scale: parseInt(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										lift_scale: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

                        <Input>
							<h1>Flow attenuation:</h1>
							<p></p>
							<input
								type="number"
								defaultValue={1.0}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											flow_attenuation: parseInt(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										flow_attenuation: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

                        <TuningTable2x1D database={database} setCylinderHead={setCylinderHead} cylinderHead={cylinderHead} />
						
					</MyInputs>
				</MyInternalEditor>
			</Editor>
		</CylinderheadDiv>
	);
};

export default Cylinderhead;
