import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Top } from "../../Home";
import { LoadingScreen } from "./General";
import plus from "../../../images/plus.svg";
import Header from "../../../components/Header/Header";
import BankInline from "../../../components/Banks/BankInline";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import Cylinder from "../../../components/Cylinders/Cylinder";

const BanksDiv = styled.div`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Editor = styled.div`
    display: flex;
	flex-direction: row;
	flex-grow: 1;
    gap: 20px;
`;

const SideBar = styled.div`
    box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
    width: 494px;
    background-color: white;
    border-radius: 20px;
	height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const InternalEditor = styled.div`
    box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
    width: 100%;
    background-color: white;
    border-radius: 20px;
	height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const EditorTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > img {
        cursor: pointer;
        transform: translateX(-5px);
    }

    > h1 {
        color: #080B2D;
        font-weight: 700;
        font-size: 32px;
    }

    > h3 {
        color: #031B4E;
        font-weight: 500;
        font-size: 24px;
    }
`;

const Cylinders = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

const Banks = () => {
    let { name, id } = useParams();
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);

	useEffect(() => {
		const engine = Database.Engines.get({ name });
		if (!engine) return setEngine(undefined);
		setEngine(engine);
	}, []);

	if (engine === null) {
		return (
            <LoadingScreen>
                <h1>Loading...</h1>
            </LoadingScreen>
        );
	} else if (engine === undefined) {
		navigate("/");
		return;
	}

	return (
		<BanksDiv>
			<Header engine={engine} />
            <Editor>
                <SideBar>
                    <Top>
                        <h3>Banks</h3>
						<img style={{height: 20, width: 20}} src={plus} alt="Add" />
                    </Top>
                    {/* somehow get banks */}
                    <BankInline name="Bank 1" btnID={1} engineName={name} currentID={id}/>

                    <BankInline name="Bank 2" btnID={2} engineName={name} currentID={id}/>
                </SideBar>

                <InternalEditor>
                    <EditorTop>
                        <h1>Bank {id}</h1>
                        <img src={deleteIcon} alt="Delete" style={{transform: 'none'}} />
                    </EditorTop>

                    <EditorTop>
                        <h3>Cylinders</h3>
                        <img src={plus} alt="Delete" style={{height: 20 + 'px', width: 20 + 'px'}} />
                    </EditorTop>

                    {/* Somehow get bank cyls */}
                    <Cylinders>
                        <Cylinder/>
                        <Cylinder/>
                        <Cylinder/>
                    </Cylinders>

                </InternalEditor>
            </Editor>
            
		</BanksDiv>
	);
};

export default Banks;
