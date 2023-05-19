import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VerticalNav from "../../../components/VerticalNav/VerticalNav";
import DB from "../../../database/db";
import EngineNavCategories from "../../../components/VerticalNav/EngineNavCategories";
import { GeneralDiv, LoadingScreen, Inputs, Input } from "./General";

const Exhaust = () => {
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
					<h1>Length:</h1>
					<p>inch</p>
					<input
						type="number"
						defaultValue={engine.exhaust.exhaust_length}
						required
						min="0"
						step="1"
						onChange={(e) => {
							DB.Thing.ChangeParam({ type: "engine", name: engine.name, path: "exhaust.exhaust_length", value: e.target.value});
							setEngine(DB.GetEngine(id))
						}}
					/>
				</Input>
			</Inputs>
		</GeneralDiv>
	);
};

export default Exhaust;
