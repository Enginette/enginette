import styled from "styled-components";
import downloadIcon from "../../images/download.svg";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";

const EngineDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	border-radius: 20px;
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: 100%;
	padding: 20px;
	margin-bottom: 10px;
	> p {
		font-size: 24px;
		color: #080b2d;
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

const Engine = ({ children }) => {
	return (
		<EngineDiv>
			<p>{children}</p>
			<Right>
				<img src={downloadIcon} alt="Download" />
				<img src={editIcon} alt="Edit" />
				<img src={deleteIcon} alt="Delete" />
			</Right>
		</EngineDiv>
	);
};

export { EngineDiv, Right };
export default Engine;
