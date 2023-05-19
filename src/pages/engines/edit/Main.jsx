import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/VerticalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Main = () => {
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
			<VerticalNav name={engine.name} categories={<EngineNavCategories id={id} />} />
			<Inputs>
				<Input>
					<h1>Stroke:</h1>
					<p>mm</p>
					<input
						type="number"
						defaultValue={engine.main.stroke}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.stroke", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Bore:</h1>
					<p>mm</p>
					<input
						type="number"
						defaultValue={engine.main.bore}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.bore", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Rod Length:</h1>
					<p>mm</p>
					<input
						type="number"
						defaultValue={engine.main.rod_length}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.rod_length", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Rod Mass:</h1>
					<p>g</p>
					<input
						type="number"
						defaultValue={engine.main.rod_mass}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.rod_mass", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Compression Height:</h1>
					<p>mm</p>
					<input
						type="number"
						defaultValue={engine.main.compression_height}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.compression_height", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Crank Mass:</h1>
					<p>kg</p>
					<input
						type="number"
						defaultValue={engine.main.crank_mass}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.crank_mass", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Flywheel Mass:</h1>
					<p>kg</p>
					<input
						type="number"
						defaultValue={engine.main.flywheel_mass}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.flywheel_mass", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Flywheel Radius:</h1>
					<p>mm</p>
					<input
						type="number"
						defaultValue={engine.main.flywheel_radius}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.flywheel_radius", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Piston Mass:</h1>
					<p>g</p>
					<input
						type="number"
						defaultValue={engine.main.piston_mass}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.piston_mass", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Piston Blowby:</h1>
					<p>k_28inH2O</p>
					<input
						type="number"
						defaultValue={engine.main.piston_blowby}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "main.piston_blowby", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default Main;
