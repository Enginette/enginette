import styled from "styled-components";
import deleteIcon from "../../images/delete.svg";

const EngineDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
    width: 100%;
    height: 76px;
    padding 0 15px;
    margin-top: 5px;

    > p {
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
    }

    > input {
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        font-style: normal;
        font-weight: 400;
        border-radius: 10px;
        font-size: 24px;
    }
`;

const Left = styled.div`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

let title = "My new engine";

const NewEngine = () => {
    return (
        <EngineDiv>
            <input value={title}/>
            <Left>
                <img src={deleteIcon} alt="Delete"/>
            </Left>
        </EngineDiv>
    )
};

export default NewEngine;
