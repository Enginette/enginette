import styled from "styled-components";
import { Link } from "react-router-dom";
import { Div, GuideDiv } from "../Guide";

const Guide = () => {
	return (
		<GuideDiv>
			<Div>
				<h1>Enginette Guide</h1>
				<pre>Welcome to the Enginette Guide for Transmissions!</pre>
				<br/>
				<h3>TODO</h3>
				<br/>
				<Link to={"/transmissions"}>Go back to transmission list</Link>
				<Link to={"/guide"}>Go back to guide list</Link>
				<Link to={"/"}>Go back to home</Link>
			</Div>
		</GuideDiv>
	);
};

export default Guide;
