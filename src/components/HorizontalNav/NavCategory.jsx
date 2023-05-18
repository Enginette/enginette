import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
	width: 100%;
	> a {
		text-decoration: none;
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px 10px;
	border-radius: 10px;
	background-color: ${(props) => (props.active ? "#3D3F45" : "#303237")};
	font-size: 20px;
	color: ${(props) => (props.active ? "#C7D5ED" : "#BEC2C8")};
	text-decoration: none;
	transition: 0.5s;

	&:hover {
		color: #C7D5ED;
		background-color: #3D3F45;
	}
`;

const NavCategory = ({ children, to }) => {
	return (
		<Wrapper>
			<Link to={to}>
				<Inner active={window.location.pathname === encodeURI(to)}>
					{children}
				</Inner>
			</Link>
		</Wrapper>
	);
};

export default NavCategory;
