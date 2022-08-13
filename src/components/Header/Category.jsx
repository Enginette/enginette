import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
	> a {
		text-decoration: none;
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px 15px;
	border-radius: 10px;
	background-color: ${(props) => (props.active ? "#E3E8F4" : "white")};
	font-size: 20px;
	color: ${(props) => (props.active ? "#0069ff" : "#4D5B7C")};
	text-decoration: none;
	transition: 0.5s;

	&:hover {
		color: #0069ff;
		background-color: #e3e8f4;
	}
`;

const Category = ({ children, to }) => {
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

export default Category;
