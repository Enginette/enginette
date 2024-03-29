import styled from "styled-components";
import downloadIcon from "../../images/download.svg";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import { Link } from "react-router-dom";

const EngineDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #3D3F45;
	border-radius: 20px;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: 100%;
	padding: 20px;
	margin-bottom: 10px;
	> p {
		font-size: 24px;
		color: #BEC2C8;
	}
	&:last-of-type {
		margin-bottom: unset;
	}
`;

const Right = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	cursor: pointer;
`;

const Engine = ({ id, name, setClickedEngine, toggleIsDeleteActive, toggleIsDownloadActive }) => {
	const handleClick = () => {
		setClickedEngine({ name, id });
		toggleIsDeleteActive();
	};

	const handleClickDownload = () => {
		setClickedEngine({ name, id });
		toggleIsDownloadActive();
	};
	return (
		<EngineDiv>
			<p>{name}</p>
			<Right>
				<img src={downloadIcon} alt="Download" onClick={handleClickDownload} />
				<Link to={`/engines/${id}/edit/general`}>
					<img src={editIcon} alt="Edit" />
				</Link>
				<img src={deleteIcon} alt="Delete" onClick={handleClick} />
			</Right>
		</EngineDiv>
	);
};

export { EngineDiv, Right };
export default Engine;
