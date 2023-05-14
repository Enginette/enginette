import styled from "styled-components";
import Category from "./Category";
import DB from "../../database/db";

const HeaderCategoriesDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	overflow-x: auto;
`;

const EngineHeaderCategories = ({ id }) => {
	const baseUrl = `/engines/${id}/edit/`;
	return (
		<HeaderCategoriesDiv>
			<Category to={baseUrl + "general"}>General</Category>
			<Category to={baseUrl + "main"}>Measurements</Category>
			<Category to={baseUrl + "banks"}>Banks</Category>
			<Category to={baseUrl + "intake"}>Intake</Category>
			<Category to={baseUrl + "exhaust"}>Exhaust</Category>
			<Category to={baseUrl + "camshaft"}>Camshaft</Category>
			<Category to={baseUrl + "head"}>Cylinderhead</Category>
			<Category to={baseUrl + "distributor"}>Distributor</Category>
			<Category to={baseUrl + "sound"}>Sound</Category>
		</HeaderCategoriesDiv>
	);
};

export { HeaderCategoriesDiv };
export default EngineHeaderCategories;
