import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import { Right, BankInlineDiv } from "../Banks/BankInline";

const LobeDiv = styled(BankInlineDiv)`
    
`;

const LobeInline = ({ name, btnID, engineName }) => {
	const baseUrl = `/engines/edit/lobe/`;
	const navigate = useNavigate();

    const setNav = (e) => {
        navigate(baseUrl + btnID) 
    };

	return (
		<LobeDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + btnID)}>
            <h1>{name}</h1>
            <Right>
                <img src={deleteIcon} alt="Delete" />
            </Right>
		</LobeDiv>
	);
};

export default LobeInline;
