import styled from "styled-components";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import { Link } from "react-router-dom";
import DB from "../database/db";

const ThingDiv = styled.div`
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

const Thing = ({ type, name, setClicked, toggleIsDeleteActive }) => {
	const handleClick = () => {
		setClicked(name);
		toggleIsDeleteActive();
	};

	return (
		<ThingDiv>
			<p>{name}</p>
			<Right>
				<Link to={`/${type}s/${DB.ID(name)}/edit/general`}>
					<img src={editIcon} alt="Edit" />
				</Link>
				<img src={deleteIcon} alt="Delete" onClick={handleClick} />
			</Right>
		</ThingDiv>
	);
};

export { ThingDiv, Right };
export default Thing;
