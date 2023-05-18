import styled from "styled-components";
import plus from "../../images/plus.svg";
import { useState, useEffect } from "react";
import { HomeDiv, Div } from "../Home";
import { Link } from "react-router-dom";
import DB from "../../database/db";
import NewThing from "../../components/NewThing";
import DeleteThing from "../../components/DeleteThing";
import Thing from "../../components/Thing";

const Selector = styled.div`
	width: 100%;
`;

const Top = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;

	> h1 {
	}

	> h3 {
		color: #BEC2C8;
		font-size: 32px;
		font-weight: 500;
	}
	> div {
		gap: 10px;
		display: flex;
	}
	> img {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
`;

const EnginesDiv = styled.div`
	width: 100%;
	max-height: 50vh;
	overflow-y: auto;
	padding: 15px;
`;

const Engines = () => {
	const [engines, setEngines] = useState([]);
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
		setEngines(DB.GetEngines());
	}, []);

	return (
		<HomeDiv>
			<Div>
				<h1>Enginette</h1>
				<pre>Welcome to Enginette!</pre>
				<Link to={"/"}>Go back to home</Link>
				<h4 style={{color: "yellow"}}>WARNING: Your engines may have dissapeared as the database was changed. You can still view your old engine parameters by clicking F12 and viewing the application tab.</h4>

				{isDeleteActive && (
					<DeleteThing
						type={"engine"}
						clicked={clicked}
						setClicked={setClicked}
						toggleIsDeleteActive={toggleIsDeleteActive}/>
				)}

				<Selector>
					<Top>
						<h3>Engines</h3>
						<div>
							<img src={plus} onClick={toggleIsNewActive} alt="New" />
						</div>
					</Top>
					<EnginesDiv>
						{engines.map((engine) => (
							<Thing
								type={"engine"}
								name={engine}
								setClicked={setClicked}
								toggleIsDeleteActive={toggleIsDeleteActive}/>
						))}
						{isNewActive && (
							<NewThing
								type={"engine"}
								close={toggleIsNewActive}
								setThings={setEngines}/>
						)}
					</EnginesDiv>
				</Selector>
			</Div>
		</HomeDiv>
	);
};

export { HomeDiv, Div, Selector, Top, EnginesDiv };
export default Engines;
