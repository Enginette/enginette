import styled from "styled-components";
import plus from "../../../images/plus.svg";
import minus from "../../../images/minus.svg";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import DB from "../../../database/db";
import TransmissionNavCategories from "../../../components/VerticalNav/TransmissionNavCategories";
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
			<VerticalNav name={transmission.name} categories={<TransmissionNavCategories id={id} />} />
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
							let db = DB.GetDB();
							const newName = document.getElementById("nameInput").value;
							const newID = DB.ID(newName);
							db.transmissions[id].name = newName;
							db.transmissions[newID] = db.transmissions[id];
							db.transmissions[id] = undefined;
							DB.SetDB(db);
							window.location.pathname = "/transmissions/" + newID + "/edit/general";
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
								<td>
									<button onClick={() => {
										// let gears = transmission.gears;
										transmission.gears.pop();
										DB.Thing.ChangeParam({ type: "transmission", name: transmission.name, path: "gears", value: "[" + transmission.gears + "]"});
										setTransmission(DB.GetTransmission(id));
									}}><img src={minus}></img></button>
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
