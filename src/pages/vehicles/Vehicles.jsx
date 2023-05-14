import styled from "styled-components";
import plus from "../../images/plus.svg";
import { useState, useEffect } from "react";
import { HomeDiv, Div, Selector, Top, EnginesDiv } from "../engines/Engines";
import { Link } from "react-router-dom";
import DB from "../../database/db";
import NewThing from "../../components/NewThing";
import DeleteThing from "../../components/DeleteThing";
import Thing from "../../components/Thing";

const Vehicles = () => {
	const [vehicles, setVehicles] = useState([]);
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
		setVehicles(DB.GetVehicles());
	}, []);

	return (
		<HomeDiv>
			<Div>
				<h1>Enginette</h1>
				<pre>Welcome to Enginette!</pre>
				<Link to={"/"}>Go back to home</Link>

				{isDeleteActive && (
					<DeleteThing
						type={"vehicle"}
						clicked={clicked}
						setClicked={setClicked}
						toggleIsDeleteActive={toggleIsDeleteActive}/>
				)}

				<Selector>
					<Top>
						<h3>Vehicles</h3>
						<div>
							<img src={plus} onClick={toggleIsNewActive} alt="New" />
						</div>
					</Top>
					<EnginesDiv>
						{vehicles.map((vehicle) => (
							<Thing
								type={"vehicle"}
								name={vehicle}
								setClicked={setClicked}
								toggleIsDeleteActive={toggleIsDeleteActive}/>
						))}
						{isNewActive && (
							<NewThing
								type={"vehicle"}
								close={toggleIsNewActive}
								setThings={setVehicles}/>
						)}
					</EnginesDiv>
				</Selector>
			</Div>
		</HomeDiv>
	);
};

export { Top };
export default Vehicles;
