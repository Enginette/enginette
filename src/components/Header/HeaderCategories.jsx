import styled from "styled-components";
import Category from "./Category";

const HeaderCategoriesDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HeaderCategories = ({ engine }) => {
	const baseUrl = `/engines/${engine.id}/edit/`;
	return (
		<HeaderCategoriesDiv>
			<Category to={baseUrl + "general"}>Engine</Category>
			<Category to={baseUrl + "banks/1"}>Banks</Category>
			<Category to={baseUrl + "rods/connecting/1"}>Rods</Category>
			<Category to={baseUrl + "crankshafts/1"}>Crankshaft</Category>
			<Category to={baseUrl + "exhausts/1"}>Exhausts</Category>
			<Category to={baseUrl + "intakes/1"}>Intakes</Category>
			<Category to={baseUrl + "pistons/1"}>Pistons</Category>
		</HeaderCategoriesDiv>
	);
};

export default HeaderCategories;
