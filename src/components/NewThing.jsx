import { useState } from "react";
import styled from "styled-components";
import edit from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import { ThingDiv, Right } from "./Thing";
import DB from "../database/db";

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
		cursor: pointer;
		background-color: transparent;
	}
	> input {
		padding: 10px 15px;
		border: none;
		border-radius: 2em;
		font-size: 20px;
		color: #BEC2C8;
		background-color: #52555a;
		outline: none;
	}
`;

const NewThing = ({ type, close, setThings }) => {
	const [name, setName] = useState("");
	const handleNameChange = (e) => {
		setName(e.target.value);
		e.target.style.border = "1px solid #8794b0";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (await DB.Thing.Exists({ type, name })) {
			document.getElementById("name_input").style.border =
				"1px solid red";
			alert("Already exists.");
			return;
		} else if (name.trim().length === 0) {
			document.getElementById("name_input").style.border =
				"1px solid red";
			alert("Please fill the name");
			return;
		}

        DB.Thing.Add({type, name});
        DB.Thing.TypeCallback(type, () => {
            setThings(DB.GetEngines());
        }, () => {
            setThings(DB.GetTransmissions());
        }, () => {
            setThings(DB.GetVehicles());
        })
		close();
	};

	return (
		<ThingDiv>
			<Left onSubmit={handleSubmit}>
				<input
					id="name_input"
					type="text"
					placeholder="Name"
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
		</ThingDiv>
	);
};

export default NewThing;
