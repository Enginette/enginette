import styled from "styled-components";
import Category from "./Category";
import { HeaderCategoriesDiv } from "./EngineHeaderCategories";
import DB from "../../database/db";

const VehicleHeaderCategories = ({ id }) => {
	const baseUrl = `/vehicles/${id}/edit/`;
	return (
		<HeaderCategoriesDiv>
			<Category to={baseUrl + "general"}>General</Category>
		</HeaderCategoriesDiv>
	);
};

export default VehicleHeaderCategories;
