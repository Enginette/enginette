import styled from "styled-components";

const ErrDiv = styled.div`
	background-color: white;
	height: calc(100% - 70px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	> h1 {
		color: #080b2d;
		font-size: 200px;
		font-weight: 100;
		margin-right: 20px;
		bottom: 200px;
	}

	> h2 {
		color: #080b2d;
		font-size: 48px;
		font-weight: 400;
		margin-right: 20px;
		bottom: 200px;
	}

	> a {
		color: #080b2d;
		font-size: 24px;
		font-weight: 400;
		margin-right: 20px;
		bottom: 200px;
	}
`;

const NotFound = () => {
	return (
		<ErrDiv>
			<h1>404</h1>
			<h2>Page not found</h2>
			<a href="/">Go back to home</a>
		</ErrDiv>
	);
};

export default NotFound;
