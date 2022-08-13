import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";

const GeneralDiv = styled.div`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Inputs = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 20px;
	background: #ffffff;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	border-radius: 20px;
	gap: 20px;
`;

const Input = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-basis: 300px;
	flex-grow: 1;
	> p {
		font-size: 16px;
		color: #031b4e;
		margin-bottom: 5px;
	}
	> input {
		outline: none;
		border: 1px solid #8794b0;
		border-radius: 8px;
		padding: 5px 10px;
	}
`;

const General = () => {
	let { name } = useParams();
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		const engine = Database.Engines.get({ name });
		if (!engine) return setEngine(undefined);
		setEngine(engine);
	}, []);

	if (engine === null) {
		return <h1>Loading...</h1>;
	} else if (engine === undefined) {
		navigate("/");
		return;
	}
	return (
		<GeneralDiv>
			<Header engine={engine} />
			<Inputs>
				<Input>
					<p>Name:</p>
					<input
						type="text"
						defaultValue={engine.name}
						required
						onChange={(e) => {
							e.target.style.border = "1px solid #8794b0";
							if (e.target.value.length === 0) return;
							if (Database.Engines.exists(e.target.value)) {
								e.target.style.border = "1px solid red";
								alert("Name already exists");
								return;
							}

							const engineCopy = engine.copy();
							engineCopy.name = e.target.value;
							Database.Engines.edit({
								name: engine.name,
								engine: engineCopy,
							});
							setEngine(engineCopy);
						}}
					/>
				</Input>
				<Input>
					<p>Starter torque:</p>
					<input
						type="number"
						defaultValue={engine.starterTorque}
						required
						onChange={(e) => {
							if (e.target.value.length === 0) return;
							const engineCopy = engine.copy();
							engineCopy.starterTorque = parseInt(e.target.value);
							Database.Engines.edit({
								name: engine.name,
								engine: engineCopy,
							});
							setEngine(engineCopy);
						}}
					/>
				</Input>
				<Input>
					<p>Red line:</p>
					<input
						type="number"
						defaultValue={engine.redLine}
						required
						onChange={(e) => {
							if (e.target.value.length === 0) return;
							const engineCopy = engine.copy();
							engineCopy.redLine = parseInt(e.target.value);
							Database.Engines.edit({
								name: engine.name,
								engine: engineCopy,
							});
							setEngine(engineCopy);
						}}
					/>
				</Input>
				<Input>
					<p>Max turbulence effect:</p>
					<input
						type="text"
						defaultValue={engine.maxTurbulenceEffect}
						required
						onChange={(e) => {
							if (e.target.value.length === 0) return;
							const engineCopy = engine.copy();
							engineCopy.maxTurbulenceEffect = parseInt(
								e.target.value
							);
							Database.Engines.edit({
								name: engine.name,
								engine: engineCopy,
							});
							setEngine(engineCopy);
						}}
					/>
				</Input>
				<Input>
					<p>Burning efficiency randomness:</p>
					<input
						type="number"
						defaultValue={engine.burningRandomness}
						onChange={(e) => {
							if (e.target.value.length === 0) return;
							const engineCopy = engine.copy();
							engineCopy.burningRandomness = parseInt(
								e.target.value
							);
							Database.Engines.edit({
								name: engine.name,
								engine: engineCopy,
							});
							setEngine(engineCopy);
						}}
					/>
				</Input>
				<Input>
					<p>Max burning efficiency:</p>
					<input
						type="number"
						defaultValue={engine.maxBurningEfficiency}
						onChange={(e) => {
							if (e.target.value.length === 0) return;
							const engineCopy = engine.copy();
							engineCopy.maxBurningEfficiency = parseInt(
								e.target.value
							);
							Database.Engines.edit({
								name: engine.name,
								engine: engineCopy,
							});
							setEngine(engineCopy);
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default General;
