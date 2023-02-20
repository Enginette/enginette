import styled from "styled-components";
import back from "../../images/back.svg";
import HeaderCategories from "./HeaderCategories";
import { Link } from "react-router-dom";

const HeaderDiv = styled.div`
	height: 70px;
	width: 100%;
	background-color: #303237;
	border-radius: 20px;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	box-shadow: 0px 7px 29px rgb(100 100 111 / 20%);
`;

const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> h1 {
		color: #C7D5ED;
		font-size: 36px;
		font-weight: bold;
		margin-right: 10px;
	}
	> a {
		display: flex;
		justify-content: center;
		align-items: center;
		> img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
	}
`;

const Right = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> a {
		text-decoration: none;
		color: #65c0f2;
		font-size: 20px;
	}
`;

const Header = ({ engine }) => {
	return (
		<HeaderDiv>
			<Left>
				<Link to="/">
					<img src={back} alt="back" />
				</Link>
				<h1>{engine.name}</h1>
				<HeaderCategories engine={engine} />
			</Left>
			<Right>
				<Link to="/guide">Guide</Link>
			</Right>
		</HeaderDiv>
	);
};

export default Header;
