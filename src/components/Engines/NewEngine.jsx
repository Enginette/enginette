import { useState } from "react";
import styled from "styled-components";
import edit from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import { EngineDiv, Right } from "./Engine";
import Database from "../../database/database";
import Engine from "../../database/Engine";

const Left = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	> button {
		width: 30px;
		height: 30px;
		border: none;
		outline: none;
		background-color: white;
		cursor: pointer;
	}
	> input {
		padding: 10px 15px;
		border-radius: 2em;
		font-size: 20px;
		color: #080b2d;
		outline: none;
		border: 1px solid #8794b0;
	}
`;

const listOfEngines = [
	"Toyota 2JZ GTE",
	"Nissan RB32",
	"Big block V8",
	"Small block V8",
	"Honda B-Series VTEC",
	"GM LS V8",
	"BMW N54",
];

const NewEngine = ({ close, engines, setEngines }) => {
	const [name, setName] = useState("");
	const handleNameChange = (e) => {
		if (e.target.value.length === 0)
			e.target.placeholder =
				listOfEngines[Math.floor(Math.random() * listOfEngines.length)];
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Database.Engines.exists(name)) {
			alert("Engine already exists.");
			return;
		} else if (name.length === 0) {
			alert("Please fill the name");
			return;
		}

		const engine = new Engine({ name });
		Database.Engines.add(engine);
		setEngines([...engines, engine]);
		close();
	};

	return (
		<EngineDiv>
			<Left onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder={
						listOfEngines[
							Math.floor(Math.random() * listOfEngines.length)
						]
					}
					value={name}
					onChange={handleNameChange}
				/>
				<button type="submit">
					<img src={edit} alt="edit" />
				</button>
			</Left>
			<Right>
				<img src={deleteIcon} alt="Delete" onClick={close} />
			</Right>
		</EngineDiv>
	);
};

export default NewEngine;
