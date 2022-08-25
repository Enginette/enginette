import styled from "styled-components";
import github from "../../images/github.svg";

const FooterDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	width: 100%;
	background-color: #0069ff;
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
		margin-right: 10px;
		text-decoration: none;
	}
	> img {
		width: 50px;
		height: 50px;
	}
`;

const Footer = () => {
	return (
		<FooterDiv>
			<Left>
				<h1>Enginette 0.0.3a</h1>
				<p>Made with ❤️ by <a href="https://github.com/pooriaahmadi">Pooria</a>, <a href="https://github.com/DDev247">DDev</a> and <a href="https://github.com/zRevenger">zRevenger</a></p>
			</Left>
			<Right>
				<a href="https://github.com/DDev247/enginette-client">
					Get the client
				</a>
				<a href="https://github.com/DDev247/enginette">
					<img src={github} alt="github" />
				</a>
			</Right>
		</FooterDiv>
	);
};

export default Footer;
