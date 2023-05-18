import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HorizontalNav from "../../../components/HorizontalNav/HorizontalNav";
import DB from "../../../database/db";
import { HomeDiv } from "../Engines";
import EngineNavCategories from "../../../components/HorizontalNav/EngineNavCategories";

const GeneralDiv = styled(HomeDiv)`
	padding: 15px;
	display: flex;
	flex-direction: row;
	align-items: normal;
	justify-content: normal;
	gap: 20px;
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
		color: #C7D5ED;
		font-size: 200px;
		font-weight: 100;
	}

	> p {
		color: #BEC2C8;
		font-size: 20px;
		text-align: center;
		line-height: 30px;
		opacity: 100%;
		animation-name: show;
		animation-delay: 2s;
		animation-duration: 500ms;
		//animation-delay: 2s;
		animation-iteration-count: 1;
	}

	@keyframes show {
		0% { opacity: 0%; }
		/* 90% { opacity: 0%; } */
		100% { opacity: 100%; }
	}
`;

const Inputs = styled.div`
	display: grid;
	/* grid-template-columns: auto auto; */
	/* justify-content: center; */
	/* align-items: center; */
	flex-wrap: wrap;
	flex-grow: 1;
	align-items: baseline;
	padding: 20px;
	background: #303237;
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
	> h1 {
		font-size: 16px;
		color: #C7D5ED;
		margin-bottom: 5px;
		font-weight: 400;
	}
	> p {
		position: absolute;
		font-weight: 400;
		font-size: 14px;
		color: #BEC2C8;
		align-self: end;
		margin-right: 10px;
		transition: margin-right 250ms;
		margin-top: 25px;
		width: auto;
	}
	> input {
		outline: none;
		background-color: #3D3F45;
		/* border: 1px solid #BEC2C8; */
		border: none;
		color: #BEC2C8;
		border-radius: 8px;
		padding: 5px 10px;
	}
	> button {
		outline: none;
		background-color: #3D3F45;
		/* border: 1px solid #BEC2C8; */
		border: none;
		color: #BEC2C8;
		border-radius: 8px;
		padding: 5px 10px;
		transition: background-color 500ms;
		:hover {
            background-color: #62656b;
		}
	}

	> table {
		table-layout: fixed;
		outline: none;
		background-color: #3D3F45;
		/* border: 1px solid #BEC2C8; */
		border: none;
		color: #BEC2C8;
		border-radius: 8px;
		padding: 5px 10px;
		max-height: 400px;
		overflow: auto;
		> thead {
			> tr {
				width: 100%;
				outline: none;
				border-radius: 8px;
				border: 1px solid #8794b0;
				padding: 5px;
			}
		}
		> tbody {
			> tr > td {
				display: table-cell;
				outline: none;
				border-radius: 8px;
				border: 1px solid #8794b0;
				padding: 5px;
				transition: background-color 500ms;
				> input, > button {
					width: 100%;
					background-color: transparent;
					outline: none;
					border: none;
					color: inherit;
				}
				&:hover {
					background-color: #ffffff0a
				}
			}
		}
	}

    &:hover, &:focus {
		> p {
			margin-right: 25px;
		}
	}
`;

const General = () => {
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
				<h1>Name:</h1>
					<input
						id="nameInput"
						type="text"
						defaultValue={engine.name}
						required
						/*onSubmit={async (e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "name", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}} */
					/>
					<button
						onClick={async (e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "name", value: document.getElementById("nameInput").value});
							setEngine(DB.GetEngine(id))
						}}>
							Submit
					</button>
				</Input>
				<Input>
					<h1>Starter Torque:</h1>
					<p>lb-ft</p>
					<input
						type="number"
						defaultValue={engine.starter_torque}
						required
						step={1}
						min={1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "starter_torque", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Starter Speed:</h1>
					<p>rpm</p>
					<input
						type="number"
						defaultValue={engine.starter_speed}
						required
						step={100}
						min={0}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "starter_speed", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Redline:</h1>
					<p>rpm</p>
					<input
						type="number"
						defaultValue={engine.redline}
						required
						step={100}
						min={0}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "redline", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Simulation Frequency:</h1>
					<p>Hz</p>
					<input
						type="number"
						defaultValue={engine.simulation_frequency}
						step={100}
						min={1000}
						max={100000}
						required
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "simulation_frequency", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export { GeneralDiv, LoadingScreen, Inputs, Input };
export default General;
