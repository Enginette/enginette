import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import plus from "../../../images/plus.svg";
import minus from "../../../images/minus.svg";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/VerticalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Banks = () => {
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
					<table>
						<thead>
							<tr>
								<td>Cylinders</td>
								<td>Bank Angle</td>
							</tr>
						</thead>
						<tbody>
							{engine.banks.map((value, index) => {
								return (<tr>
									<td>
										<input
											type="number"
											defaultValue={value.cylinders}
											required
											min={0}
											step={1}
										 	onChange={(e) => {
												DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "banks[" + index + "].cylinders", value: e.target.value});
												setEngine(DB.GetEngine(id));
											}}/>
									</td>
									<td>
										<input
											type="number"
											defaultValue={value.bank_angle}
											required
											min={0}
											step={1}
										 	onChange={(e) => {
												DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "banks[" + index + "].bank_angle", value: e.target.value});
												setEngine(DB.GetEngine(id));
											}}/>
									</td>
								</tr>)
							})}
							<tr>
								<td>
									<button onClick={() => {
										engine.banks.push({ cylinders: 1, bank_angle: 0 });
										DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "banks", value: JSON.stringify(engine.banks)});
										setEngine(DB.GetEngine(id));
									}}><img src={plus} alt="plus"></img></button>
								</td>
								<td>
									<button onClick={() => {
										engine.banks.pop();
										DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "banks", value: JSON.stringify(engine.banks)});
										setEngine(DB.GetEngine(id));
									}}><img src={minus} alt="minus"></img></button>
								</td>
							</tr>
						</tbody>
					</table>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default Banks;
