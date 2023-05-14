import styled from "styled-components";
import Database from "../../database/database";
import Generator from "../../exporter/exporter";
import plus from "../../images/plus.svg";

import { DeleteEngineDiv, Top, DeleteConfirmation } from "./DeleteEngine";

const DownloadEngineDiv = styled(DeleteEngineDiv)`
`;

const MyDeleteConfirmation = styled.div`
	box-shadow: 0px 4px 29px rgba(100, 100, 111, 0.2);
	background-color: #303237;
	border-radius: 20px;
	padding: 15px 20px;
	width: 100%;
	> p {
		font-size: 20px;
		font-weight: bold;
		color: #BEC2C8;
		width: 100%;
		margin-bottom: 20px;
	}
	> button {
		margin-bottom: 5px;
	}
`;

const DownloadButton = styled.button`
	cursor: pointer;
	outline: none;
	border: none;
	width: 100%;
	padding: 5px 0;
	background-color: #a0f265;
	color: #6e7177;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	border-radius: 2em;
`;

const LaunchButton = styled.button`
	cursor: pointer;
	outline: none;
	border: none;
	width: 100%;
	padding: 5px 0;
	background-color: #65c0f2;
	color: #6e7177;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	border-radius: 2em;
`;

const DownloadEngine = ({
	database,
	clickedEngine,
	setClickedEngine,
	toggleIsDownloadActive,
	engines,
	setEngines,
}) => {
	const handleCloseClick = () => {
		setClickedEngine(null);
		toggleIsDownloadActive();
	};
	const handleDownloadClick = async () => {
		//alert("Coming very soon...\nEXPERIMENTAL: Experimental data outputted data in console!");
		alert("Warning: This feature is still experimental, so bugs will happen.\nIf you encounter one please report it on github here: https://github.com/enginette/enginette/issues");
		console.log("Calling Generator.Generate(database, " + clickedEngine.id + ");");
		try {
			Generator.Generate(database, clickedEngine.id);
		} catch (error) {
			alert("Error happened: " + error);
		}
	};
	const handleLaunchClick = async () => {
		alert("Coming soon...");
	};
	return (
		<DownloadEngineDiv>
			<MyDeleteConfirmation>
				<Top>
					<h3>{clickedEngine.name}</h3>
					<img
						src={plus}
						alt="cancelButton"
						onClick={handleCloseClick}
					/>
				</Top>
				<p>What do you want to do?</p>
				<DownloadButton onClick={handleDownloadClick} >Download</DownloadButton>
				<LaunchButton onClick={handleLaunchClick} id="launch">Launch</LaunchButton>
			</MyDeleteConfirmation>
		</DownloadEngineDiv>
	);
};

export default DownloadEngine;
