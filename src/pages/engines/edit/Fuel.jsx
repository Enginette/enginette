import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/VerticalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Fuel = () => {
	let { id } = useParams();

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		setEngine(DB.GetEngine(id));
	}, []);

	useEffect(() => {
		if (engine !== null) {
			DB.PotentialUpgrade(engine, "fuel", DB.ENGINE_TEMPLATE.fuel);
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
	} else if (engine.fuel === undefined) {
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
					<h1>Molecular Mass:</h1>
					<p>g</p>
					<input
						type="number"
						defaultValue={engine.fuel.molecular_mass}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.molecular_mass", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Energy Density:</h1>
					<p>kJ/g</p>
					<input
						type="number"
						defaultValue={engine.fuel.energy_density}
						required
						min="0"
						step="0.1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.energy_density", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Density:</h1>
					<p>kg/L</p>
					<input
						type="number"
						defaultValue={engine.fuel.density}
						required
						min="0"
						step="0.1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.density", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Molecular AFR:</h1>
					<input
						type="number"
						defaultValue={engine.fuel.molecular_afr}
						required
						min="0"
						step="0.1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.molecular_afr", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Max Burning Efficiency:</h1>
					<input
						type="number"
						defaultValue={engine.fuel.max_burning_efficiency}
						required
						min="0"
						step="0.01"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.max_burning_efficiency", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Burning Efficiency Randomness:</h1>
					<input
						type="number"
						defaultValue={engine.fuel.burning_efficiency_randomness}
						required
						min="0"
						step="0.01"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.burning_efficiency_randomness", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Low Efficiency Randomness:</h1>
					<input
						type="number"
						defaultValue={engine.fuel.low_efficiency_attenuation}
						required
						min="0"
						step="0.01"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.low_efficiency_attenuation", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Max Turbulence Effect:</h1>
					<input
						type="number"
						defaultValue={engine.fuel.max_turbulence_effect}
						required
						min="0"
						step="0.01"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.max_turbulence_effect", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Max Dilution Effect:</h1>
					<input
						type="number"
						defaultValue={engine.fuel.max_dilution_effect}
						required
						min="0"
						step="0.01"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "fuel.max_dilution_effect", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default Fuel;
