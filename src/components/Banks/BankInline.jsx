import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import piston from "../../images/piston.svg";

const BankInlineDiv = styled.div`
    background-color: white;
    border: 1px solid #8794B0;
    border: ${(props) => (props.active ? "none" : "1px solid #8794B0")};
    height: 62px;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    background-color: ${(props) => (props.active ? "#0069FF" : "transparent")};

    &:hover {
        background-color: #0069FF;
        border: none;
        > h1 {
            color: white;
        }
    }

    > h1 {
        font-weight: 500;
        font-size: 24px;
        color: ${(props) => (props.active ? "white" : "#080B2D")};
    }
`;

const Right = styled.div`
    display: flex;
    gap: 8px;

    &.active {
        > img {
            color: white;
        }

        > p {
            color: white;
        }
    }

    > img {
        height: 25px;
        width: 25px;
        cursor: pointer;
    }

    > p {
        position: absolute;
        margin-left: 12px;
        margin-top: 12px;
        color: #031B4E;
        cursor: pointer;
    }
`;

const BankInline = ({ name, btnID, engineName }) => {
	const baseUrl = `/engines/${engineName}/edit/banks/`;
	const navigate = useNavigate();

    const setNav = (e) => {
        navigate(baseUrl + btnID) 
    };

	return (
		<BankInlineDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + btnID)}>
            <h1>{name}</h1>
            <Right>
                <img src={piston} alt="P" />
                <p>4</p>
                <img src={deleteIcon} alt="Delete" />
            </Right>
		</BankInlineDiv>
	);
};

export default BankInline;
