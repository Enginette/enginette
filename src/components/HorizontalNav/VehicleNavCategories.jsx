import styled from "styled-components";
import NavCategory from "./NavCategory";
import { NavCategoriesDiv } from "./EngineNavCategories";
import DB from "../../database/db";

const VehicleNavCategories = ({ id }) => {
	const baseUrl = `/vehicles/${id}/edit/`;
	return (
		<NavCategoriesDiv>
			<NavCategory to={baseUrl + "general"}>General</NavCategory>
		</NavCategoriesDiv>
	);
};

export default VehicleNavCategories;
