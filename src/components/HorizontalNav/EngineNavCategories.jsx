import styled from "styled-components";
import NavCategory from "./NavCategory";

const NavCategoriesDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	overflow-x: auto;
	width: 100%;
`;

const EngineNavCategories = ({ id }) => {
	const baseUrl = `/engines/${id}/edit/`;
	return (
		<NavCategoriesDiv>
			<NavCategory to={baseUrl + "general"}>General</NavCategory>
			<NavCategory to={baseUrl + "main"}>Measurements</NavCategory>
			<NavCategory to={baseUrl + "banks"}>Banks</NavCategory>
			<NavCategory to={baseUrl + "intake"}>Intake</NavCategory>
			<NavCategory to={baseUrl + "exhaust"}>Exhaust</NavCategory>
			<NavCategory to={baseUrl + "camshaft"}>Camshaft</NavCategory>
			<NavCategory to={baseUrl + "head"}>Cylinderhead</NavCategory>
			<NavCategory to={baseUrl + "distributor"}>Distributor</NavCategory>
			<NavCategory to={baseUrl + "sound"}>Sound</NavCategory>
			<NavCategory to={baseUrl + "fuel"}>Fuel</NavCategory>
		</NavCategoriesDiv>
	);
};

export { NavCategoriesDiv };
export default EngineNavCategories;
