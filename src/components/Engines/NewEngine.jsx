import { useState } from "react";
import styled from "styled-components";
import edit from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import { EngineDiv, Right } from "./Engine";

const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	> img {
		width: 30px;
		height: 30px;
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

const NewEngine = ({ close }) => {
	const [name, setName] = useState("");
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	return (
		<EngineDiv>
			<Left>
				<input
					type="text"
					placeholder="My badass engine"
					value={name}
					onChange={handleNameChange}
				/>
				<img src={edit} alt="edit" />
			</Left>
			<Right>
				<img src={deleteIcon} alt="Delete" onClick={close} />
			</Right>
		</EngineDiv>
	);
};

export default NewEngine;
