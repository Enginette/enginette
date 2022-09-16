import styled from "styled-components";
import { useState, useEffect, setState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import { LoadingScreen, Input } from "./General";
import { InternalEditor, Editor, EditorTop } from "./Bank";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";

import TuningTable1D from "../../../components/TuningTables/1D";

const DistributorDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const MyInternalEditor = styled(InternalEditor)`
	width: 100%;
`;

const Distributor = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [distributor, setDistributor] = useState(null);
	const [someArray, setArray] = useState(null);

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			const distributor = await Database.Distributor.getById({ 
				db: database,
				id,
			});
			if (!distributor) return setDistributor(undefined);
			setDistributor(distributor);

			let count = parseInt(distributor.rpm);
			let array = [];
			for(let i = 0; i <= count; i += 1000) 
			{
				array.push([i, distributor.timings[i/1000]]);
			}
			setArray(array);

			const engineID = distributor.engine;
			//console.log(engineID);
			const engine = await Database.Engines.getById({ 
				db: database,
				id: engineID,
			});
			if (!engine) return setEngine(undefined);
			//console.log(engine);
			setEngine(engine);
		}
		loadDatabase();
	}, [database, id]);

	const updated = async (e) => {
		if (e.target.value.length === 0) return;
		
		let count = parseInt(e.target.value);
		let array = [];
		let array2 = [];
		for(let i = 0; i <= count; i += 1000) 
		{
			if(distributor.timings[i/1000] === undefined) {
				array.push([i, 30]);
				array2.push(30);
			}
			else {
				array.push([i, distributor.timings[i/1000]]);
				array2.push(distributor.timings[i/1000]);
			}
		}
		setArray(array);

		await Database.Distributor.update({
			db: database,
			id,
			values: {
				...distributor,
				rpm: parseInt(e.target.value),
				timings: [
					...array2,
				],
			},
		});
		setDistributor({
			...distributor,
			rpm: parseInt(e.target.value),
			timings: [
				...array2,
			],
		});
	}

	if (engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
			</LoadingScreen>
		);
	} else if (engine === undefined) {
		navigate("/");
		return;
	}
	return (
		<DistributorDiv>
			<Header engine={engine} />
			<Editor>
				<MyInternalEditor>
					<EditorTop>
						<h1>Distributor</h1>
						{/*
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
						/>
						*/}
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Rev limit:</h1>
							<p>rpm</p>
							<input
								type="number"
								defaultValue={distributor.rpm}
								min="0"
								step="100"
								onChange={updated}
							/>
						</Input>
						
						{/* <h1>pls add a timing table idk how to do this</h1> */}
						{/* <p>maybe even a graph? 👀</p> */}

						<TuningTable1D rpms={someArray} distributor={distributor} database={database} setDistributor={setDistributor} id={id} setArray={setArray} />
						
					</MyInputs>
				</MyInternalEditor>
			</Editor>
		</DistributorDiv>
	);
};

export { MyInternalEditor };
export default Distributor;
