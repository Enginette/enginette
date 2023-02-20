import styled from "styled-components";
import { Link } from "react-router-dom";

const GuideDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100% - 70px);
`;

const EngineSelector = styled.div`
	border-radius: 20px;
	background-color: #303237;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 650px;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	position: relative;
	padding-bottom: 20px;
	> h1 {
		padding: 0 0px;
		padding-top: 20px;
		font-size: 48px;
		color: #C7D5ED;
		margin-bottom: 20px;
	}
	> h3 {
		padding: 0 20px;
		padding-top: 20px;
		font-size: 36px;
		color: #BEC2C8;
		margin-bottom: 20px;
	}
`;

const Guide = () => {
	return (
		<GuideDiv>
			<EngineSelector>
				<h1>Enginette Guide</h1>
				<h3>TODO</h3>
				<Link to={"/"}>Go back to home</Link>
			</EngineSelector>
		</GuideDiv>
	);
};

export default Guide;
