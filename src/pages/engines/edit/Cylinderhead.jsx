import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import DB from "../../../database/db";
import EngineHeaderCategories from "../../../components/Header/EngineHeaderCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Cylinderhead = () => {
	let { id } = useParams();

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		setEngine(DB.GetEngine(id));
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
		<GeneralDiv>
			<Header name={engine.name} categories={<EngineHeaderCategories id={id} />} />
			<Inputs>
				<Input>
					<h1>Chamber Volume:</h1>
					<p>cc</p>
					<input
						type="number"
						defaultValue={engine.head.chamber_volume}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.chamber_volume", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Intake Runner Volume:</h1>
					<p>cc</p>
					<input
						type="number"
						defaultValue={engine.head.intake_runner_volume}
						required
						min="0"
						step="0.01"
						max="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.intake_runner_volume", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Intake Runner Cross Section:</h1>
					<p>cc, cc</p>
					<input
						type="text"
						defaultValue={engine.head.intake_runner_cross_section}
						required
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.intake_runner_cross_section", value: "[" + e.target.value + "]"});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Exhaust Runner Volume:</h1>
					<p>cc</p>
					<input
						type="number"
						defaultValue={engine.head.exhaust_runner_volume}
						required
						min="0"
						step="0.01"
						max="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.exhaust_runner_volume", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Exhaust Runner Cross Section:</h1>
					<p>cc, cc</p>
					<input
						type="text"
						defaultValue={engine.head.exhaust_runner_cross_section}
						required
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.exhaust_runner_cross_section", value: "[" + e.target.value + "]"});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<div style={{display: "flex", gap: "20px"}}>
					<Input>
						<table border="1">
							<thead>
								Intake Flow (cc)
							</thead>
							<tbody>
								{engine.head.intake_flow.map((value, index) => {
									return (<tr>
										<td>
											<input
												type="number"
												defaultValue={value}
												required
												min={0}
												step={0.01}
												onChange={(e) => {
													DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.intake_flow[" + index + "]", value: e.target.value});
													setEngine(DB.GetEngine(id));
												}}/>
										</td>
									</tr>)
								})}
							</tbody>
						</table>
					</Input>
					<Input>
						<table border="1">
							<thead>
								Exhaust Flow (cc)
							</thead>
							<tbody>
								{engine.head.exhaust_flow.map((value, index) => {
									return (<tr>
										<td>
											<input
												type="number"
												defaultValue={value}
												required
												min={0}
												step={1}
												onChange={(e) => {
													DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.exhaust_flow[" + index + "]", value: e.target.value});
													setEngine(DB.GetEngine(id));
												}}/>
										</td>
									</tr>)
								})}
							</tbody>
						</table>
					</Input>
				</div>
			</Inputs>
		</GeneralDiv>
	);
};

export default Cylinderhead;
