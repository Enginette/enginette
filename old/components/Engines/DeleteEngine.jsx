import styled from "styled-components";
import Database from "../../database/database";
import plus from "../../images/plus.svg";

const DeleteEngineDiv = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(5px);
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(230, 230, 230, 0.2);
	padding: 60px;

	animation-name: fade;
	animation-duration: 250ms;
	animation-iteration-count: 1;

	@keyframes fade {
		from { backdrop-filter: blur(0px) }
		to { backdrop-filter: blur(5px) }
	}
`;

const DeleteConfirmation = styled.div`
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
		cursor: pointer;
		outline: none;
		border: none;
		width: 100%;
		padding: 5px 0;
		background-color: #e9515b;
		color: #BEC2C8;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		border-radius: 2em;
	}
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 15px;
	> h3 {
		font-size: 32px;
		font-weight: bold;
		color: #BEC2C8;
	}
	> img {
		cursor: pointer;
		width: 30px;
		height: 30px;
		transform: rotate(45deg);
	}
`;

const DeleteEngine = ({
	database,
	clickedEngine,
	setClickedEngine,
	toggleIsDeleteActive,
	engines,
	setEngines,
}) => {
	const handleCloseClick = () => {
		setClickedEngine(null);
		toggleIsDeleteActive();
	};
	const handleDeleteClick = async () => {
		await Database.Engines.remove({
			db: database,
			id: clickedEngine.id,
		});
		setEngines(engines.filter((engine) => engine.id !== clickedEngine.id));
		handleCloseClick();
	};
	return (
		<DeleteEngineDiv>
			<DeleteConfirmation>
				<Top>
					<h3>{clickedEngine.name}</h3>
					<img
						src={plus}
						alt="cancelButton"
						onClick={handleCloseClick}
					/>
				</Top>
				<p>Are you sure you want to delete this engine?</p>
				<button onClick={handleDeleteClick}>Delete</button>
			</DeleteConfirmation>
		</DeleteEngineDiv>
	);
};

export default DeleteEngine;
export { Top, DeleteConfirmation, DeleteEngineDiv };
