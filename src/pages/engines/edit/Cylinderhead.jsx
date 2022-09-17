import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import { LoadingScreen, Input } from "./General";
import { Editor, EditorTop } from "./Bank";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { MyInternalEditor } from "./Distributor";
import { SelectInput } from "../../../components/Cylinders/Cylinder";

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
	const [lobes, setLobes] = useState([]);

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

			const lobes = await Database.Engines.Lobes.all({
				db: database,
				id: engineID,
			});
			setLobes(lobes);
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
								defaultValue={cylinderHead.chamber_volume}
								min="0"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											chamber_volume: parseFloat(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										chamber_volume: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

                        <Input>
							<h1>Lift scale:</h1>
							<p></p>
							<input
								type="number"
								defaultValue={cylinderHead.lift_scale}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											lift_scale: parseFloat(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										lift_scale: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

                        <Input>
							<h1>Flow attenuation:</h1>
							<p></p>
							<input
								type="number"
								defaultValue={cylinderHead.flow_attenuation}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											flow_attenuation: parseFloat(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										flow_attenuation: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<SelectInput>
               				<p>Intake Lobe</p>
                			<select
                    			key={`${Math.floor((Math.random() * 1000))}-min`}
                    			defaultValue={"Lobe " + cylinderHead.intake_lobe}
                    			onChange={async (e) => {
                    			    if (e.target.value.length === 0) return;
                    			    await Database.CylinderHeads.update({
                    			        db: database,
                    			        id,
                    			        values: {
                    			            ...cylinderHead,
                    			            intake_lobe: parseInt(e.target.value.substring("Lobe ".length)),
                    			        },
                    			    });
                    			    setCylinderHead({
                    			        ...cylinderHead,
                    			        intake_lobe: parseInt(e.target.value.substring("Lobe ".length)),
                    			    });
                    			}}>
                    			{lobes.map((lobe) => (
                    			    <option key={lobe.id + (Math.random() % 1000)} value={`Lobe ${lobe.id}`}>Lobe {lobe.id}</option>
                    			))}
                			</select>
            			</SelectInput>

						<SelectInput>
               				<p>Exhaust Lobe</p>
                			<select
                    			key={`${Math.floor((Math.random() * 1000))}-min`}
                    			defaultValue={"Lobe " + cylinderHead.exhaust_lobe}
                    			onChange={async (e) => {
                    			    if (e.target.value.length === 0) return;
                    			    await Database.CylinderHeads.update({
                    			        db: database,
                    			        id,
                    			        values: {
                    			            ...cylinderHead,
                    			            exhaust_lobe: parseInt(e.target.value.substring("Lobe ".length)),
                    			        },
                    			    });
                    			    setCylinderHead({
                    			        ...cylinderHead,
                    			        exhaust_lobe: parseInt(e.target.value.substring("Lobe ".length)),
                    			    });
                    			}}>
                    			{lobes.map((lobe) => (
                    			    <option key={lobe.id + (Math.random() % 1000)} value={`Lobe ${lobe.id}`}>Lobe {lobe.id}</option>
                    			))}
                			</select>
            			</SelectInput>

						<Input>
							<h1>Lobe separation:</h1>
							<p>degrees</p>
							<input
								type="number"
								defaultValue={cylinderHead.lobe_separation}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											lobe_separation: parseFloat(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										lobe_separation: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Lobe advance:</h1>
							<p>degrees</p>
							<input
								type="number"
								defaultValue={cylinderHead.lobe_advance}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											lobe_advance: parseFloat(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										lobe_advance: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Lobe radius:</h1>
							<p>inches</p>
							<input
								type="number"
								defaultValue={cylinderHead.lobe_radius}
								min="0"
								step="0.1"
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.CylinderHeads.update({
										db: database,
										id,
										values: {
											...cylinderHead,
											lobe_radius: parseFloat(e.target.value),
										},
									});
									setCylinderHead({
										...cylinderHead,
										lobe_radius: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>
						
					</MyInputs>

					<TuningTable2x1D database={database} id={id} setCylinderHead={setCylinderHead} cylinderHead={cylinderHead} />

				</MyInternalEditor>
			</Editor>
		</CylinderheadDiv>
	);
};

export default Cylinderhead;
