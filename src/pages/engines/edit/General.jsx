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

const LoadingScreen = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;

	> h1 {
		color: #080b2d;
		font-size: 200px;
		font-weight: 100;
	}

	> p {
		color: #080b2d;
		font-size: 20px;
		text-align: center;
		line-height: 30px;
		opacity: 100%;
		animation-name: show;
		animation-duration: 2s;
		//animation-delay: 2s;
		animation-iteration-count: 1;
	}

	@keyframes show {
		0% { opacity: 0%; }
		90% { opacity: 0%; }
		100% { opacity: 100%; }
	}
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

const General = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		if (!database) return;
		const stuff = async () => {
			const engine = await Database.Engines.getById({
				id,
				db: database,
			});
			setEngine({ ...engine, id });
		};
		stuff();
	}, [database]);

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
			<Header engine={engine} />
			<Inputs>
				<Input>
					<p>Name:</p>
					<input
						type="text"
						defaultValue={engine.name}
						required
						onChange={async (e) => {
							e.target.style.border = "1px solid #8794b0";
							if (e.target.value.length === 0) return;

							try {
								await Database.Engines.update({
									db: database,
									id,
									values: {
										...engine,
										name: e.target.value,
									},
								});
								setEngine({ ...engine, name: e.target.value });
							} catch (error) {
								e.target.style.border = "1px solid red";
								alert("Name already exists");
								return;
							}
						}}
					/>
				</Input>
				<Input>
					<p>Starter torque:</p>
					<input
						type="number"
						defaultValue={engine.starterTorque}
						required
						onChange={async (e) => {
							if (e.target.value.length === 0) return;
							await Database.Engines.update({
								db: database,
								id,
								values: {
									...engine,
									starterTorque: parseInt(e.target.value),
								},
							});
							setEngine({
								...engine,
								starterTorque: parseInt(e.target.value),
							});
						}}
					/>
				</Input>
				<Input>
					<p>Red line:</p>
					<input
						type="number"
						defaultValue={engine.redLine}
						required
						onChange={async (e) => {
							if (e.target.value.length === 0) return;
							await Database.Engines.update({
								db: database,
								id,
								values: {
									...engine,
									redLine: parseInt(e.target.value),
								},
							});
							setEngine({
								...engine,
								redLine: parseInt(e.target.value),
							});
						}}
					/>
				</Input>
				<Input>
					<p>Max turbulence effect:</p>
					<input
						type="text"
						defaultValue={engine.maxTurbulenceEffect}
						required
						onChange={async (e) => {
							if (e.target.value.length === 0) return;
							await Database.Engines.update({
								db: database,
								id,
								values: {
									...engine,
									maxTurbulenceEffect: parseInt(
										e.target.value
									),
								},
							});
							setEngine({
								...engine,
								maxTurbulenceEffect: parseInt(e.target.value),
							});
						}}
					/>
				</Input>
				<Input>
					<p>Burning efficiency randomness:</p>
					<input
						type="number"
						defaultValue={engine.burningRandomness}
						onChange={async (e) => {
							if (e.target.value.length === 0) return;
							await Database.Engines.update({
								db: database,
								id,
								values: {
									...engine,
									burningRandomness: parseInt(e.target.value),
								},
							});
							setEngine({
								...engine,
								burningRandomness: parseInt(e.target.value),
							});
						}}
					/>
				</Input>
				<Input>
					<p>Max burning efficiency:</p>
					<input
						type="number"
						defaultValue={engine.maxBurningEfficiency}
						onChange={async (e) => {
							if (e.target.value.length === 0) return;
							await Database.Engines.update({
								db: database,
								id,
								values: {
									...engine,
									maxBurningEfficiency: parseInt(
										e.target.value
									),
								},
							});
							setEngine({
								...engine,
								maxBurningEfficiency: parseInt(e.target.value),
							});
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export { LoadingScreen, Inputs, Input };
export default General;
