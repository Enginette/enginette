import styled from "styled-components";
import plus from "../../images/plus.svg";
import { useState, useEffect } from "react";
import { HomeDiv, Div, Selector, Top, EnginesDiv } from "../engines/Engines";
import { Link } from "react-router-dom";
import DB from "../../database/db";
import NewThing from "../../components/NewThing";
import DeleteThing from "../../components/DeleteThing";
import Thing from "../../components/Thing";

const Transmissions = () => {
	const [transmissions, setTransmissions] = useState([]);
	const [clicked, setClicked] = useState(null);
	const [isNewActive, setIsNewActive] = useState(false);
	const [isDeleteActive, setIsDeleteActive] = useState(false);

	const toggleIsDeleteActive = () => {
		setIsDeleteActive(!isDeleteActive);
	};
	const toggleIsNewActive = () => {
		setIsNewActive(!isNewActive);
	};

	useEffect(() => {
		setTransmissions(DB.GetTransmissions());
	}, []);

	return (
		<HomeDiv>
			<Div>
				<h1>Enginette</h1>
				<pre>Welcome to Enginette!</pre>
				<Link to={"/"}>Go back to home</Link>

				{isDeleteActive && (
					<DeleteThing
						type={"transmission"}
						clicked={clicked}
						setClicked={setClicked}
						toggleIsDeleteActive={toggleIsDeleteActive}/>
				)}

				<Selector>
					<Top>
						<h3>Transmissions</h3>
						<div>
							<img src={plus} onClick={toggleIsNewActive} alt="New" />
						</div>
					</Top>
					<EnginesDiv>
						{transmissions.map((transmission) => (
							<Thing
								type={"transmission"}
								name={transmission}
								setClicked={setClicked}
								toggleIsDeleteActive={toggleIsDeleteActive}/>
						))}
						{isNewActive && (
							<NewThing
								type={"transmission"}
								close={toggleIsNewActive}
								setThings={setTransmissions}/>
						)}
					</EnginesDiv>
				</Selector>
			</Div>
		</HomeDiv>
	);
};

export { Top };
export default Transmissions;
