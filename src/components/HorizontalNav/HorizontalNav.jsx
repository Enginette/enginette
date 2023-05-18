import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import NavCategory from "./NavCategory";
import back from "../../images/back.svg";

const HorizontalNavDiv = styled.div`
	height: 100%;
    flex-grow: 0.25;
    min-width: 200px;
    max-width: 300px;
	background-color: #303237;
	border-radius: 20px;
	padding: 10px 20px;
	display: flex;
    gap: 20px;
    flex-direction: column;
	/* justify-content: space-between; */
	/* align-items: center; */
	margin-bottom: 20px;
	box-shadow: 0px 7px 29px rgb(100 100 111 / 20%);
`;

const Top = styled.div`
    display: flex;
    width: 100%;
    > h1 {
        width: 100%;
        text-align: right;
    }
`;
const Middle = styled(Top)`
    flex-grow: 1;
`;
const Bottom = styled(Top)`
    display: flex;
`;

const HorizontalNav = ({ name, categories }) => {
    return (
        <HorizontalNavDiv>
            <Top>
                <Link to={"/"}>
                    <img src={back}/>
                </Link>
                <h1>{name}</h1>
            </Top>
            <Middle>
                {categories}
            </Middle>
            <Bottom>
                <NavCategory to={"/"}>Go Back Home</NavCategory>
            </Bottom>
        </HorizontalNavDiv>
    )
};

export default HorizontalNav;