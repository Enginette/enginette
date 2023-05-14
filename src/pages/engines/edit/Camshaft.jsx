import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import DB from "../../../database/db";
import EngineHeaderCategories from "../../../components/Header/EngineHeaderCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const InputsWithSidebar = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: 100%;
`;

const Sidebar = styled(Inputs)`
	flex-grow: 0.5;
	display: flex;
	flex-direction: column;
	padding: 20px;
	background: #303237;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	border-radius: 20px;
	gap: 20px;
`;

const SidebarInputs = styled(Inputs)`
	flex-grow: 2;
`;

const SidebarItem = styled.div`
	width: 100%;
	background-color: #3D3F45;
	/* border: 1px solid #8794b0; */
	/* border: 1px solid ${(props) => (props.active ? "#0069ff" : "#8794B0")}; */
	border: none;
	background-color: ${(props) => (props.active ? "#6598F2" : "#3D3F45")};
	border-radius: 15px;
	padding: 15px;
	display: flex;
	cursor: pointer;
	justify-content: space-between;
	align-items: center;
	transition: 0.5s;

	&:hover {
		background-color: #6598F2;
		> h1 {
			color: #C7D5ED;
		}
		p {
			color: #C7D5ED;
		}
		svg {
			fill: #C7D5ED !important;
		}
	}

	> h1 {
		text-decoration: none;
		font-weight: 500;
		font-size: 20px;
		color: ${(props) => (props.active ? "#C7D5ED" : "#BEC2C8")};
		transition: 0.5s;
	}
`;

const Camshaft = () => {
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
			<Header name={engine.name} categories={<EngineHeaderCategories id={id} />} />
			<InputsWithSidebar>
				<Sidebar>
					<Link style={{color: "transparent"}} to={`/engines/${id}/edit/camshaft/intake`}>
						<SidebarItem>
							<h1>Intake</h1>
						</SidebarItem>
					</Link>
					<Link style={{color: "transparent"}} to={`/engines/${id}/edit/camshaft/exhaust`}>
						<SidebarItem>
							<h1>Exhaust</h1>
						</SidebarItem>
					</Link>
				</Sidebar>
				<SidebarInputs>
					<Input>
						<h1>Lobe Separation:</h1>
						<p>deg</p>
						<input
							type="number"
							defaultValue={engine.camshaft.lobe_separation}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.lobe_separation", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
					<Input>
						<h1>Base Radius:</h1>
						<p>inch</p>
						<input
							type="number"
							defaultValue={engine.camshaft.camshaft_base_radius}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.camshaft_base_radius", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
					<Input>
						<h1>Intake Lobe Center:</h1>
						<p>deg</p>
						<input
							type="number"
							defaultValue={engine.camshaft.intake_lobe_center}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.intake_lobe_center", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
					<Input>
						<h1>Exhaust Lobe Center:</h1>
						<p>deg</p>
						<input
							type="number"
							defaultValue={engine.camshaft.exhaust_lobe_center}
							required
							min="0"
							step="1"
							onChange={(e) => {
								DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "camshaft.exhaust_lobe_center", value: e.target.value });
								setEngine(DB.GetEngine(id))
							}}
						/>
					</Input>
				</SidebarInputs>
			</InputsWithSidebar>
		</GeneralDiv>
	);
};

export { InputsWithSidebar, Sidebar, SidebarInputs, SidebarItem };
export default Camshaft;
