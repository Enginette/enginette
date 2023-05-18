import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HorizontalNav from "../../../components/HorizontalNav/HorizontalNav";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/HorizontalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Intake = () => {
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
			{/* <Header name={engine.name} categories={<EngineHeaderCategories id={id} />} /> */}
			<HorizontalNav name={engine.name} categories={<EngineNavCategories id={id} />} />
			<Inputs>
				<Input>
					<h1>Plenum Volume:</h1>
					<p>L</p>
					<input
						type="number"
						defaultValue={engine.intake.plenum_volume}
						required
						min="0"
						step="0.1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.plenum_volume", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Plenum Cross Section Area:</h1>
					<p>cm²</p>
					<input
						type="number"
						defaultValue={engine.intake.plenum_cross_section_area}
						required
						min="0"
						step="0.1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.plenum_cross_section_area", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Flow Rate:</h1>
					<p>k_carb</p>
					<input
						type="number"
						defaultValue={engine.intake.intake_flow_rate}
						required
						min="0"
						step="100"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.intake_flow_rate", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Runner Flow Rate:</h1>
					<p>k_carb</p>
					<input
						type="number"
						defaultValue={engine.intake.runner_flow_rate}
						required
						min="0"
						step="100"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.runner_flow_rate", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Runner Length:</h1>
					<p>inch</p>
					<input
						type="number"
						defaultValue={engine.intake.runner_length}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.runner_length", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Idle Flow Rate:</h1>
					<p>k_carb</p>
					<input
						type="number"
						defaultValue={engine.intake.idle_flow_rate}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.idle_flow_rate", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Idle Throttle Plate Position:</h1>
					<p>%</p>
					<input
						type="number"
						defaultValue={engine.intake.idle_throttle_plate_position}
						required
						min="0"
						max="1"
						step="0.001"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "intake.idle_throttle_plate_position", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default Intake;
