import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import { Right, BankInlineDiv } from "../Banks/BankInline";

const ConnectingRodDiv = styled(BankInlineDiv)`
    
`;

const ConnectingRod = ({ name, btnID, engineName }) => {
	const baseUrl = `/engines/${engineName}/edit/rods/connecting/`;
	const navigate = useNavigate();

    const setNav = (e) => {
        navigate(baseUrl + btnID) 
    };

	return (
		<ConnectingRodDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + btnID)}>
            <h1>{name}</h1>
            <Right>
                <img src={deleteIcon} alt="Delete" />
            </Right>
		</ConnectingRodDiv>
	);
};

export default ConnectingRod;
