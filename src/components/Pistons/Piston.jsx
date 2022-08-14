import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import { Right, BankInlineDiv } from "../Banks/BankInline";

const PistonDiv = styled(BankInlineDiv)`
    
`;

const Piston = ({ name, btnID, engineName }) => {
	const baseUrl = `/engines/${engineName}/edit/pistons/`;
	const navigate = useNavigate();

    const setNav = (e) => {
        navigate(baseUrl + btnID) 
    };

	return (
		<PistonDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + btnID)}>
            <h1>{name}</h1>
            <Right>
                <img src={deleteIcon} alt="Delete" />
            </Right>
		</PistonDiv>
	);
};

export default Piston;
