import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import { Right, BankInlineDiv } from "../Banks/BankInline";

const ExhaustDiv = styled(BankInlineDiv)`
    
`;

const ExhaustInline = ({ name, btnID, engineName }) => {
	const baseUrl = `/engines/edit/exhaust/`;
	const navigate = useNavigate();

    const setNav = (e) => {
        navigate(baseUrl + btnID) 
    };

	return (
		<ExhaustDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + btnID)}>
            <h1>{name}</h1>
            <Right>
                <img src={deleteIcon} alt="Delete" />
            </Right>
		</ExhaustDiv>
	);
};

export default ExhaustInline;
