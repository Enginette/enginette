import styled from "styled-components";
import plus from "../images/plus.svg";
import x from "../images/x.svg";
import Engine from "../components/Engines/Engine";
import NewEngine from "../components/Engines/NewEngine";
import { useState } from "react";

const HomeDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100% - 70px);
`;

const EngineSelector = styled.div`
	padding: 20px;
	border-radius: 20px;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 650px;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	> h1 {
		font-size: 48px;
		color: #080b2d;
		margin-bottom: 20px;
	}
`;

const Selector = styled.div`
	width: 100%;
`;

const Top = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
	> h3 {
		color: #031b4e;
		font-size: 32px;
		font-weight: 500;
	}
	> img {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
`;

const Engines = styled.div`
	width: 100%;
`;

const Blur = styled.div`
	filter: blur(10px);
	width: 100%;
	transition: filter 250ms;
	> h1 {
		font-size: 48px;
		color: #080b2d;
		margin-bottom: 20px;
	}
`;

const DeleteConfirmator = styled.div`
	display: flex;
	padding: 15px 20px;
	flex-direction: column;
	position: absolute;
	justify-content: space-between;
	align-self: center;

	width: 450px;
	height: 163px;

	filter: drop-shadow(0px 4px 29px rgba(0, 0, 0, 0.2));

	border-radius: 20px;
	background-color: white;

	animation-name: fadein;
	animation-duration: 250ms;
	animation-iteration-count: 1;

	@keyframes fadein {
		from { opacity: 0%; }
		to { opacity: 100%; }
	}

	> h2 {
		padding: 10px 0;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		font-size: 20px;
		color: #080B2D;
	}
`;

const DeleteConfirmatorTop = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-self: start;

	> h1 {
		font-weight: 700;
		font-size: 32px;
		color: #080B2D;
	}

	> img {
		width: 30px;
		height 30px;
		cursor: pointer;
	}
`;

const DeleteBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: end;

	width: 100%;
	height: 28px;
	border-radius: 20px;
	background-color: red;
	> h1 {
		font-style: normal;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		color: white;
	}
`;

const Home = () => {
	const [isNewActive, setIsNewActive] = useState(false);
	const toggleIsNewActive = () => {
		setIsNewActive(!isNewActive);
	};

	const [isDeleteActive, setIsDeleteActive] = useState(false);
	const toggleIsDeleteActive = () => {
		setIsDeleteActive(!isDeleteActive);
	};
	const enableIsDeleteActive = () => {
		setIsDeleteActive(true);
	};

	return (
		<HomeDiv>
			<EngineSelector>

				{ isDeleteActive &&
				<DeleteConfirmator>
					<DeleteConfirmatorTop>
						<h1>Engine name</h1>
						<img src={x} alt="X" onClick={toggleIsDeleteActive} />
					</DeleteConfirmatorTop>
					<h2>Are you sure you want to delete this design?</h2>
					<DeleteBtn>
						<h1>Delete</h1>
					</DeleteBtn>
				</DeleteConfirmator>
				}

				
				<Blur style={{filter: isDeleteActive ? 'none' : 'none', pointerEvents: isDeleteActive ? 'none' : 'auto'}}>
					<h1>Enginette</h1>
					<Selector>
						<Top>
							<h3>Engines</h3>
							<img src={plus} onClick={toggleIsNewActive} alt="New" />
						</Top>
						<Engines>
							<Engine deleteClick={enableIsDeleteActive}>Honda v12</Engine>
							{isNewActive && <NewEngine close={toggleIsNewActive} />}
						</Engines>
					</Selector>
				</Blur>
			</EngineSelector>
		</HomeDiv>
	);
};

export default Home;
