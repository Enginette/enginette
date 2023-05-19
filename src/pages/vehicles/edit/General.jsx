import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import DB from "../../../database/db";
import VehicleNavCategories from "../../../components/VerticalNav/VehicleNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "../../engines/edit/General";

const General = () => {
	let { id } = useParams();

	const navigate = useNavigate();
	const [vehicle, setVehicle] = useState(null);

	useEffect(() => {
		setVehicle(DB.GetVehicle(id));
	}, []);

	if (vehicle === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
			</LoadingScreen>
		);
	} else if (vehicle === undefined) {
		navigate("/");
		return;
	}
	return (
		<GeneralDiv>
			<VerticalNav name={vehicle.name} categories={<VehicleNavCategories id={id} />} />
			<Inputs>
				<Input>
					<h1>Name:</h1>
					<input
						id="nameInput"
						type="text"
						defaultValue={vehicle.name}
						required
						/*onSubmit={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "name", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}} */
					/>
					<button
						onClick={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "name", value: document.getElementById("nameInput").value});
							setVehicle(DB.GetVehicle(id))
						}}>
							Submit
					</button>
				</Input>
				<Input>
					<h1>Mass:</h1>
					<p>kg</p>
					<input
						type="number"
						defaultValue={vehicle.mass}
						required
						min={0}
						step={1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "mass", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Drag Coefficient:</h1>
					<input
						type="number"
						defaultValue={vehicle.drag_coefficient}
						required
						min={0}
						step={0.1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "drag_coefficient", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Cross Sectional Area (separated by comma):</h1>
					<p>inch, inch</p>
					<input
						type="text"
						defaultValue={vehicle.cross_sectional_area}
						required
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "cross_sectional_area", value: "[" + e.target.value + "]"});
							setVehicle(DB.GetVehicle(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Final Ratio:</h1>
					<input
						type="number"
						defaultValue={vehicle.diff_ratio}
						required
						min={0}
						step={1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "diff_ratio", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Tire Radius:</h1>
					<p>inch</p>
					<input
						type="number"
						defaultValue={vehicle.tire_radius}
						required
						min={0}
						step={1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "tire_radius", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Rolling Resistance:</h1>
					<p>N</p>
					<input
						type="number"
						defaultValue={vehicle.rolling_resistance}
						required
						min={0}
						step={1}
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "vehicle", name: vehicle.name, path: "rolling_resistance", value: e.target.value});
							setVehicle(DB.GetVehicle(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default General;
