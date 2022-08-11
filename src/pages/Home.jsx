import styled from "styled-components";
import plus from "../images/plus.svg";
import Engine from "../components/Engines/Engine.jsx";
import NewEngine from "../components/Engines/NewEngine.jsx";

const HomeDiv = styled.div`
    background-color: black;
    display: flex;
    justify-content: center;

`;

const EngineSelectorDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: white;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
    width: 641px;
    height: 653px;
    margin-top: 7%;
    margin-bottom: 7%;

    > h1 {
        color: #080B2D;
        font-size: 48px;
        font-weight: bold;
        margin-top: 10px;
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
`;

const EngineSelectorGroup5 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const EngineSelectorGroup3 = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    padding: 0px 15px;
    > h1 {
        color: #080B2D;
        font-size: 32px;
        margin-right: 20px;
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
`;

const EngineSelectorGroup5Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
    align-items: center;
    width 100%;
    padding: 15px;
`;

const Home = () => {
    return (
        <HomeDiv>
            <EngineSelectorDiv>
                <h1>Enginette</h1>

                <EngineSelectorGroup5>

                    <EngineSelectorGroup3>
                        <h1>Engines</h1>
                        <img src={plus} alt="plus"/>
                    </EngineSelectorGroup3>

                    <EngineSelectorGroup5Inner>
                        <Engine></Engine>
                        <NewEngine></NewEngine>
                    </EngineSelectorGroup5Inner>

                </EngineSelectorGroup5>
            </EngineSelectorDiv>
        </HomeDiv>
    )
};

export default Home;
