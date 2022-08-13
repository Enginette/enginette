import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import { Right, BankInlineDiv } from "../Banks/BankInline";

const JournalRodDiv = styled(BankInlineDiv)`
    
`;

const JournalRod = ({ name, btnID, engineName }) => {
	const baseUrl = `/engines/${engineName}/edit/rods/journal/`;
	const navigate = useNavigate();

    const setNav = (e) => {
        navigate(baseUrl + btnID) 
    };

	return (
		<JournalRodDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + btnID)}>
            <h1>{name}</h1>
            <Right>
                <img src={deleteIcon} alt="Delete" />
            </Right>
		</JournalRodDiv>
	);
};

export default JournalRod;
