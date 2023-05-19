import styled from "styled-components";
import NavCategory from "./NavCategory";
import { NavCategoriesDiv } from "./EngineNavCategories";
import DB from "../../database/db";

const TransmissionNavCategories = ({ id }) => {
	const baseUrl = `/transmissions/${id}/edit/`;
	return (
		<NavCategoriesDiv>
			<NavCategory to={baseUrl + "general"}>General</NavCategory>
		</NavCategoriesDiv>
	);
};

export default TransmissionNavCategories;
