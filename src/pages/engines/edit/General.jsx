import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";

const GeneralDiv = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
const Body = styled.div`
    width: 100%;
    border-radius: 20px;
    background-color: white;
    padding: 15px 0 0;
    flex-grow: 1;
    display: flex;
`;

const InnerBody = styled.div`
    width: 100%;
    padding: 10px;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    column-gap: 50px;
`;

const Input = styled.div`
    width: 30%;
    height: 56px;

    > h2 {
        font-size: 16px;
        font-weight: 400;
        width: 100%;
        color: #031B4E;
    }

    > input {
        padding: 5px 5px;
        font-size: 16px;
        width: 100%;
        border-radius: 8px;
        border: 1px solid #8794b0;
    }  
`;

const General = () => {
    let { name } = useParams();
    const [curName, setName] = useState("");
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <GeneralDiv>
            <Header/>
            <Body>
                <InnerBody>

                    {/* sorry for weird code but i understand it better this way */}
                    <Input>
                        <h2>Name:</h2>
                        <input type="text" defaultValue={name} onChange={handleNameChange} />
                    </Input>

                    <Input>
                        <h2>Starter torque:</h2>
                        <input type="number" defaultValue="10" min="10" />
                    </Input>

                    <Input>
                        <h2>Redline:</h2>
                        <input type="number" defaultValue="500" min="500" max="100000" />
                    </Input>

                    <Input>
                        <h2>Max turbulence effect:</h2>
                        <input type="number" />
                    </Input>

                    <Input>
                        <h2>Burning efficiency randomness:</h2>
                        <input type="number" defaultValue="1" />
                    </Input>

                    <Input>
                        <h2>Max burning efficiency:</h2>
                        <input type="number" defaultValue="1" />
                    </Input>

                </InnerBody>
            </Body>
        </GeneralDiv>
    );
};

export default General;
