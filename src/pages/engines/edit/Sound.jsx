import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/VerticalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Sound = () => {
	let { id } = useParams();

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		setEngine(DB.GetEngine(id));
	}, []);

	useEffect(() => {
		if (engine !== null) {
			DB.PotentialUpgrade(engine, "sound", DB.ENGINE_TEMPLATE.sound);
			DB.Thing.Set({ type: "engine", name: id, value: engine });
		}
	});

	if (engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
			</LoadingScreen>
		);
	} else if (engine.sound.volume === undefined) {
		return (
			<h1>Please Wait a few seconds and refresh.</h1>
		);
	} else if (engine === undefined) {
		navigate("/");
		return;
	}
	return (
		<GeneralDiv>
			{/* <Header name={engine.name} categories={<EngineHeaderCategories id={id} />} /> */}
			<VerticalNav name={engine.name} categories={<EngineNavCategories id={id} />} />
			<Inputs>
				<Input>
					<h1>Volume:</h1>
					<input
						type="number"
						defaultValue={engine.sound.volume}
						required
						min="0"
						step="0.01"
						max="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "sound.volume", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
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
