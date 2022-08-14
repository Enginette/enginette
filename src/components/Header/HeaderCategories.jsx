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
			<Category to={baseUrl + "banks"}>Banks</Category>
			<Category to={baseUrl + "rods"}>Rods</Category>
			<Category to={baseUrl + "crankshafts"}>Crankshaft</Category>
			<Category to={baseUrl + "exhausts"}>Exhausts</Category>
			<Category to={baseUrl + "intakes"}>Intakes</Category>
			<Category to={baseUrl + "pistons"}>Pistons</Category>
			<Category to={baseUrl + "lobes"}>Lobes</Category>
			<Category to={baseUrl + "distributor"}>Distributor</Category>
		</HeaderCategoriesDiv>
	);
};

export default HeaderCategories;
