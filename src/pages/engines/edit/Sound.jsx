import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import DB from "../../../database/db";
import EngineHeaderCategories from "../../../components/Header/EngineHeaderCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Sound = () => {
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
					<h1>Low Frequency Noise:</h1>
					<input
						type="number"
						defaultValue={engine.sound.noise}
						required
						min="0"
						step="0.01"
						max="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "sound.noise", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>High Frequency Noise:</h1>
					<input
						type="number"
						defaultValue={engine.sound.jitter}
						required
						min="0"
						step="0.01"
						max="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "sound.jitter", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>High Frequency Gain:</h1>
					<input
						type="number"
						defaultValue={engine.sound.hf_gain}
						required
						min="0"
						step="0.01"
						max={1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "sound.hf_gain", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default Sound;
