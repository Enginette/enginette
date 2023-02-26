import styled from "styled-components";
import plus from "../images/plus.svg";
import deleteIcon from "../images/delete.svg";
import Engine from "../components/Engines/Engine";
import NewEngine from "../components/Engines/NewEngine";
import { useState, useEffect } from "react";
import DeleteEngine from "../components/Engines/DeleteEngine";
import DownloadEngine from "../components/Engines/DownloadEngine";
import Database from "../database/database";

const HomeDiv = styled.div`
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
	> h1 {
		padding: 0 20px;
		padding-top: 20px;
		font-size: 48px;
		color: #C7D5ED;
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
	padding: 15px;

	> h1 {
	}

	> h3 {
		color: #BEC2C8;
		font-size: 32px;
		font-weight: 500;
	}
	> div {
		gap: 10px;
		display: flex;
	}
	> img {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
`;

const Engines = styled.div`
	width: 100%;
	max-height: 50vh;
	overflow-y: auto;
	padding: 15px;
`;

const Home = ({ database }) => {
	const [engines, setEngines] = useState([]);
	const [clickedEngine, setClickedEngine] = useState(null);
	const [isNewActive, setIsNewActive] = useState(false);
	const [isDeleteActive, setIsDeleteActive] = useState(false);
	const [isDownloadActive, setIsDownloadActive] = useState(false);

	const toggleIsDownloadActive = () => {
		setIsDownloadActive(!isDownloadActive);
	};
	const toggleIsDeleteActive = () => {
		setIsDeleteActive(!isDeleteActive);
	};
	const toggleIsNewActive = () => {
		setIsNewActive(!isNewActive);
	};

	const deleteAll = async () => {
		await Database.clearAll(database);
		window.alert("Database cleared.\nRefreshing...");
		window.location.reload();
	}

	useEffect(() => {
		if (!database) return;
		const stuff = async () => {
			const engines = await Database.Engines.all(database);
			setEngines(engines);
		};
		stuff();
	}, [database]);

	return (
		<HomeDiv>
			<EngineSelector>
				{isDeleteActive && (
					<DeleteEngine
						database={database}
						clickedEngine={clickedEngine}
						setClickedEngine={setClickedEngine}
						toggleIsDeleteActive={toggleIsDeleteActive}
						engines={engines}
						setEngines={setEngines}
					/>
				)}

				{isDownloadActive && (
					<DownloadEngine
						database={database}
						clickedEngine={clickedEngine}
						setClickedEngine={setClickedEngine}
						toggleIsDownloadActive={toggleIsDownloadActive}
						engines={engines}
						setEngines={setEngines}
					/>
				)}
				<h1>Enginette</h1>
				<Selector>
					<Top>
						<h3>Engines</h3>
						<div>
							<img src={plus} onClick={toggleIsNewActive} alt="Delete all" />
							<img src={deleteIcon} onClick={deleteAll} alt="New" />
						</div>
					</Top>
					<Engines>
						{engines.map((engine) => (
							<Engine
								key={engine.id}
								setClickedEngine={setClickedEngine}
								toggleIsDeleteActive={toggleIsDeleteActive}
								toggleIsDownloadActive={toggleIsDownloadActive}
								{...engine}
							/>
						))}
						{isNewActive && (
							<NewEngine
								database={database}
								close={toggleIsNewActive}
								engines={engines}
								setEngines={setEngines}
							/>
						)}
					</Engines>
				</Selector>
			</EngineSelector>
		</HomeDiv>
	);
};

export { Top };
export default Home;
