import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import HorizontalNav from "../../../components/HorizontalNav/HorizontalNav";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/HorizontalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Input } from "./General";
import { InputsWithSidebar, Sidebar, SidebarInputs, SidebarItem } from "./Camshaft";

const ExhaustCamshaft = () => {
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
				<p>Not Loading? <br /> Maybe the page encountered an error. Check the console for more details</p>
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
			<InputsWithSidebar>
				<Sidebar>
					<Link style={{color: "transparent"}} to={`/engines/${id}/edit/camshaft/intake`}>
						<SidebarItem>
							<h1>Intake</h1>
						</SidebarItem>
					</Link>
					<Link style={{color: "transparent"}} to={`/engines/${id}/edit/camshaft/exhaust`}>
						<SidebarItem active="true">
							<h1>Exhaust</h1>
						</SidebarItem>
					</Link>
				</Sidebar>
				<SidebarInputs>
					<Input>
						<h1>Lift:</h1>
						<p>thou</p>
						<input
							type="number"
							defaultValue={engine.camshaft.exhaust.lift}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.exhaust.lift", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
					<Input>
						<h1>Duration:</h1>
						<p>deg</p>
						<input
							type="number"
							defaultValue={engine.camshaft.exhaust.duration}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.exhaust.duration", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
					<Input>
						<h1>Gamma:</h1>
						<input
							type="number"
							defaultValue={engine.camshaft.exhaust.gamma}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.exhaust.gamma", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
					<Input>
						<h1>Steps:</h1>
						<input
							type="number"
							defaultValue={engine.camshaft.exhaust.steps}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.exhaust.steps", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
				</SidebarInputs>
			</InputsWithSidebar>
		</GeneralDiv>
	);
};

export default ExhaustCamshaft;
