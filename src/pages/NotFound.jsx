import styled from "styled-components";
import { Div } from "./Home";

const ErrDiv = styled.div`
	/* background-color: white; */
	height: calc(100% - 60px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	> div > h1 {
		font-size: 200px;
		font-weight: 100;
		margin-right: 20px;
		bottom: 200px;
	}
`;

const NotFound = () => {
	return (
		<ErrDiv>
			<Div>
				<h1>404</h1>
				<h2>Page not found</h2>
				<br/>
				<a href="/">Go back to home</a>
			</Div>
		</ErrDiv>
	);
};

export default NotFound;
