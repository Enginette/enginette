import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop } from "./Banks";
import { Top } from "../../Home";
import Intake from "../../../components/Intakes/Intake";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

const IntakesDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Intakes = () => {
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
		<IntakesDiv>
			<Header engine={engine} />
            <Editor>
			    <SideBar>
                    <Top>
                        <h3>Intakes</h3>
                        <img src={plus} alt="Add" />
                    </Top>
                    
                    <Intake name="Intake 1" btnID={1} engineName={name}/>
                </SideBar>

                <InternalEditor>
                    <EditorTop>
                        <h1>Intake {id}</h1>
                        <img src={deleteIcon} alt="Delete" style={{transform: 'none'}} />
                    </EditorTop>

                    <MyInputs>
                        <Input>
                            <p>Plenum Volume:</p>
					        <input
					        	type="number"
					        	defaultValue={1}
					        	onChange={(e) => {
					        		// TODO: implement the database shit
					        	}}
					        />
                        </Input>

						<Input>
                            <p>Plenum Cross Section Area:</p>
					        <input
					        	type="number"
					        	defaultValue={10}
					        	onChange={(e) => {
					        		// TODO: implement the database shit
					        	}}
					        />
                        </Input>

						<Input>
                            <p>Flow Rate:</p>
					        <input
					        	type="number"
					        	defaultValue={300}
					        	onChange={(e) => {
					        		// TODO: implement the database shit
					        	}}
					        />
                        </Input>

						<Input>
                            <p>Idle Flow Rate:</p>
					        <input
					        	type="number"
					        	defaultValue={0}
					        	onChange={(e) => {
					        		// TODO: implement the database shit
					        	}}
					        />
                        </Input>

						<Input>
                            <p>Idle throttle plate position:</p>
					        <input
					        	type="number"
					        	defaultValue={0.98}
					        	onChange={(e) => {
					        		// TODO: implement the database shit
					        	}}
					        />
                        </Input>

						<Input>
                            <p>Throttle Gamma:</p>
					        <input
					        	type="number"
					        	defaultValue={1}
					        	onChange={(e) => {
					        		// TODO: implement the database shit
					        	}}
					        />
                        </Input>
                    </MyInputs>
                </InternalEditor>
            </Editor>

		</IntakesDiv>
	);
};

export default Intakes;
