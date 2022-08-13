import styled from "styled-components";
import piston from "../../images/piston.svg";

const CylinderDiv = styled.div`
	border: 1px solid #8794B0;
    border-radius: 20px;
    padding: 20px;
    width: 244px;
    height: 371px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Top = styled.div`
    width: 100%;
    height: 100px;
    justify-content: center;
    display: flex;

    > h1 {
        position: absolute;
        margin-left: 50px;
        margin-top: 65px;
        font-weight: 500;
        font-size: 36px;
        color: #031B4E;
    }

    > img {
        width: 100px;
        height: 100px;
    }
`;

const Input = styled.div`
    width: 100%;
    > p {
        box-shadow: 0px 0px 3px rgba(100, 100, 111, 0.2);
        background-color: white;
        border-radius: 20px;
        padding: 1px 5px;
        color: #031B4E;
        font-size: 12px;
        font-weight: 400;
        
        position: absolute;
        margin-top: -10px;
        margin-left: 10px;
    }
    > select {
        height: 28px;
        border-radius: 20px;
        border: 1px solid #8794B0;
        width: 100%;
    }
`;

const Cylinder = () => {
	return (
		<CylinderDiv>
            <Top>
                <img src={piston} alt="P" />
                <h1>#1</h1>
            </Top>

            <Input>
                <p>Connecting Rod</p>
                <select>
                    <option>Option</option>
                </select>
            </Input>

            <Input>
                <p>Journal Rod</p>
                <select>
                    <option>Option</option>
                </select>
            </Input>

            <Input>
                <p>Intake</p>
                <select>
                    <option>Option</option>
                </select>
            </Input>

            <Input>
                <p>Exhaust</p>
                <select>
                    <option>Option</option>
                </select>
            </Input>

            <Input>
                <p>Piston</p>
                <select>
                    <option>Option</option>
                </select>
            </Input>
		</CylinderDiv>
	);
};

export default Cylinder;
