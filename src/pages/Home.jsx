import styled from "styled-components";
import { useState, useEffect } from "react";
import DB from "../database/db";
import { Link } from "react-router-dom";

const HomeDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 60px);
`;

const Div = styled.div`
	border-radius: 20px;
	background-color: #303237;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 650px;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	position: relative;
	padding: 20px 0px;
	> h1 {
		padding: 0 20px;
		font-size: 48px;
		color: #C7D5ED;
		margin-bottom: 20px;
	}
	> h4 {
		padding: 0 20px;
		color: #C7D5ED;
		margin-bottom: 20px;
	}
	> pre {
		margin-top: -15px;
		font-family: monospace;
		font-size: 16px;
		color: #C7D5EDAF;
	}
`;

const Top = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;

	> h1 {
	}

	> h3 {
		color: #BEC2C8;
		font-size: 32px;
		font-weight: 500;
	}
	> div {
		gap: 10px;
		display: flex;
	}
	> img {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
`;

const Home = () => {
	const [engineCount, setEngineCount] = useState(0);
	const [transmissionCount, setTransmissionCount] = useState(0);
	const [vehicleCount, setVehicleCount] = useState(0);

	useEffect(() => {
		let count = DB.GetCount();
		setEngineCount(count.engines);
		setTransmissionCount(count.transmissions);
		setVehicleCount(count.vehicles);
	}, []);

	return (
		<HomeDiv>
			<Div>
				<h1>Enginette</h1>
				<pre>Welcome to Enginette!</pre>
				<br/>
				<h3>Engine Count: {engineCount}</h3>
				<h3>Transmission Count: {transmissionCount}</h3>
				<h3>Vehicle Count: {vehicleCount}</h3>
				<br/>
				<Link to={"/engines"}>
					Edit Engines
				</Link>
				<Link to={"/transmissions"}>
					Edit Transmissions
				</Link>
				<Link to={"/vehicles"}>
					Edit Vehicles
				</Link>
				<br/>
				<Link to={"/guide"}>
					View Guide
				</Link>
				<br/>
				<Link to={"/generate"}>
					Generate Script
				</Link>
			</Div>
		</HomeDiv>
	);
};

export { HomeDiv, Div, Top };
export default Home;
