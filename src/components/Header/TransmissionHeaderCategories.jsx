import styled from "styled-components";
import Category from "./Category";
import { HeaderCategoriesDiv } from "./EngineHeaderCategories";
import DB from "../../database/db";

const TransmissionHeaderCategories = ({ id }) => {
	const baseUrl = `/transmissions/${id}/edit/`;
	return (
		<HeaderCategoriesDiv>
			<Category to={baseUrl + "general"}>General</Category>
		</HeaderCategoriesDiv>
	);
};

export default TransmissionHeaderCategories;
