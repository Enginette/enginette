import styled from "styled-components";
import plus from "../../../images/plus.svg";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import DB from "../../../database/db";
import EngineHeaderCategories from "../../../components/Header/EngineHeaderCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";
import minus from "../../../images/minus.svg";

const Distributor = () => {
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
			<Header name={engine.name} categories={<EngineHeaderCategories id={id} />} />
			<Inputs>
				<Input>
					<h1>Rev Limit:</h1>
					<p>rpm</p>
					<input
						type="number"
						defaultValue={engine.distributor.rev_limit}
						required
						min="0"
						step="100"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "distributor.rev_limit", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<h1>Limiter Duration:</h1>
					<p>?</p>
					<input
						type="number"
						defaultValue={engine.distributor.limiter_duration}
						required
						min="0"
						step="0.01"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "distributor.limiter_duration", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
				<Input>
					<table border="1">
						<thead>
							Firing Order
						</thead>
						<tbody>
							<tr>
								{engine.distributor.firing_order.map((timing, index) => {
									return (<td>
										<input
											type="number"
											defaultValue={timing}
											required
											min={0}
											step={1}
										 	onChange={(e) => {
												DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "distributor.firing_order[" + index + "]", value: e.target.value});
												setEngine(DB.GetEngine(id));
											}}/>
									</td>)
								})}
								<td>
									<button onClick={() => {
										// let gears = transmission.gears;
										engine.distributor.firing_order.push(1);
										DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "distributor.firing_order", value: "[" + engine.distributor.firing_order + "]"});
										setEngine(DB.GetEngine(id));
									}}><img src={plus}></img></button>
								</td>
							</tr>
						</tbody>
					</table>
				</Input>
				<Input>
					<table border="1">
						<thead>
							Timing Curve
						</thead>
						<tbody>
							{engine.distributor.timing_curve.map((value, index) => {
								return (<tr>
									<td>
										<input
											type="number"
											defaultValue={value[0]}
											required
											min={0}
											step={1000}
											onChange={(e) => {
												DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.intake_flow[" + index + "]", value: e.target.value});
												setEngine(DB.GetEngine(id));
											}}/>
									</td>
									<td>
										<input
											type="number"
											defaultValue={value[1]}
											required
											min={0}
											step={1}
											onChange={(e) => {
												DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "head.intake_flow[" + index + "]", value: e.target.value});
												setEngine(DB.GetEngine(id));
											}}/>
									</td>
								</tr>)
							})}
							<tr>
								<td>
									<button onClick={() => {
										let last = engine.distributor.timing_curve[engine.distributor.timing_curve.length-1];
										engine.distributor.timing_curve.push([last[0]+1000, last[1]]);
										DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "distributor.timing_curve", value: "[" + engine.distributor.timing_curve.map(a => { return "[" + a.join(",") + "]"; }).join(",") + "]"});
										setEngine(DB.GetEngine(id));
									}}><img src={plus}></img></button>
								</td>
								<td>
									<button onClick={() => {
										engine.distributor.timing_curve.pop();
										DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "distributor.timing_curve", value: "[" + engine.distributor.timing_curve.map(a => { return "[" + a.join(",") + "]"; }).join(",") + "]"});
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

export default Distributor;
