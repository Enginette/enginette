import styled from "styled-components";
import { Link } from "react-router-dom";
import { Div, HomeDiv } from "./Home";

const GuideDiv = styled(HomeDiv)``;

const Guide = () => {
	return (
		<GuideDiv>
			<Div>
				<h1>Enginette Guide</h1>
				<pre>Welcome to the Enginette Guide!</pre>
				<br/>
				<Link to={"/engines/guide"}>Engine Guide</Link>
				<Link to={"/transmissions/guide"}>Transmission Guide</Link>
				<Link to={"/vehicles/guide"}>Vehicle Guide</Link>
				<br/>
				<Link to={"/"}>Go back to home</Link>
			</Div>
		</GuideDiv>
	);
};

export { GuideDiv, Div };
export default Guide;
