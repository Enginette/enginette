import styled from "styled-components";
import github from "../../images/github.svg";

const FooterDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	width: 100%;
	background-color: #6598F2;
	padding: 0 15px;
`;

const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> h1 {
		font-size: 24px;
		font-weight: bold;
		color: white;
		margin-right: 20px;
	}
	> h2 {
		font-size: 22px;
		font-weight: bold;
		color: white;
		margin-right: 20px;
	}
	> p {
		font-size: 20px;
		color: white;

		> a {
			font-size: 20px;
			color: white;
			//margin-right: 10px;
			text-decoration: none;
		}
	}
`;

const Right = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> p {
		font-size: 20px;
		color: white;
		margin-right: 10px;
	}
	> a {
		font-size: 20px;
		color: white;
		margin-left: 10px;
		text-decoration: none;
		> img {
			width: 40px;
			height: 40px;
		}
	}
`;

const Footer = () => {
	return (
		<FooterDiv>
			<Left>
				<h1>Enginette 0.1.0</h1>
				{/* <h2>We're out of alpha baby!</h2> */}
				<p>Made with ❤️ by <a href="https://github.com/pooriaahmadi">Pooria</a>, <a href="https://github.com/DDev247">DDev</a> and <a href="https://github.com/zRevenger">zRevenger</a></p>
			</Left>
			<Right>
				{/* <a href="https://github.com/DDev247/enginette-client">
					Get the client
				</a> */}
				<a href="https://github.com/DDev247/enginette">
					<img src={github} alt="github" />
				</a>
			</Right>
		</FooterDiv>
	);
};

export default Footer;
