import styled from "styled-components";
import back from "../../images/back.svg";
import HeaderCategories from "./HeaderCategories";
import { Link } from "react-router-dom";

const HeaderDiv = styled.div`
	height: 70px;
	width: 100%;
	background-color: white;
	border-radius: 20px;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> h1 {
		color: #080b2d;
		font-size: 36px;
		font-weight: bold;
		margin-right: 20px;
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
		color: #0069ff;
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
				<Link to="/">Guide</Link>
			</Right>
		</HeaderDiv>
	);
};

export default Header;
