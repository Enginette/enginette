import styled from "styled-components";
import plus from "../../../images/plus.svg";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import DB from "../../../database/db";
import TransmissionHeaderCategories from "../../../components/Header/TransmissionHeaderCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "../../engines/edit/General";

const General = () => {
	let { id } = useParams();

	const navigate = useNavigate();
	const [transmission, setTransmission] = useState(null);

	useEffect(() => {
		setTransmission(DB.GetTransmission(id));
	}, []);

	if (transmission === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
			</LoadingScreen>
		);
	} else if (transmission === undefined) {
		navigate("/");
		return;
	}
	return (
		<GeneralDiv>
			<Header name={transmission.name} categories={<TransmissionHeaderCategories id={id} />} />
			<Inputs>
				<Input>
				<h1>Name:</h1>
					<input
						id="nameInput"
						type="text"
						defaultValue={transmission.name}
						required
						/*onSubmit={async (e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "name", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}} */
					/>
					<button
						onClick={async (e) => {
							DB.Thing.ChangeParam({ type: "transmission", name: transmission.name, path: "name", value: document.getElementById("nameInput").value});
							setTransmission(DB.GetTransmission(id))
						}}>
							Submit
					</button>
				</Input>
				<Input>
					<h1>Max Clutch Torque:</h1>
					<p>Nm</p>
					<input
						type="number"
						defaultValue={transmission.max_clutch_torque}
						required
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "transmission", name: transmission.name, path: "max_clutch_torque", value: e.target.value});
						}}
					/>
				</Input>
				<Input>
					<table border="1">
						<thead>
							Gear Ratios ({transmission.gears.length})
						</thead>
						<tbody>
							<tr>
								{transmission.gears.map((gear, index) => {
									return (<td>
										<input
											type="number"
											defaultValue={gear}
											required
											min={0}
											step={0.01}
										 	onChange={(e) => {
												DB.Thing.ChangeParam({ type: "transmission", name: transmission.name, path: "gears[" + index + "]", value: e.target.value});
												setTransmission(DB.GetTransmission(id));
											}}/>
									</td>)
								})}
								<td>
									<button onClick={() => {
										// let gears = transmission.gears;
										transmission.gears.push(1);
										DB.Thing.ChangeParam({ type: "transmission", name: transmission.name, path: "gears", value: "[" + transmission.gears + "]"});
										setTransmission(DB.GetTransmission(id));
									}}><img src={plus}></img></button>
								</td>
							</tr>
						</tbody>
					</table>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default General;
