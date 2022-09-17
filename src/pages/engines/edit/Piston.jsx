import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import PistonInline from "../../../components/Pistons/PistonInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const PistonDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlinePistonsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Piston = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [pistons, setPistons] = useState([]);
	//selected piston
	const [piston, setPiston] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Piston #${id}?`
		);
		if (!confirmation) return;

		await Database.Intakes.remove({ db: database, id });
		navigate(`/engines/${engine.id}/edit/pistons`);
	};

	const addPiston = async () => {
		const piston = await Database.Pistons.add({
			db: database,
			values: {
				engine: engine.id,
				mass: 400,
				compressionHeight: 32,
				wristPinPosition: 0,
				displacement: 0,
			},
		});

		setPistons([...pistons, piston]);
	};

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			//load selected piston
			const piston = await Database.Pistons.getById({
				db: database,
				id,
			});
			if (!piston) return setPiston(undefined);
			setPiston(piston);

			const engine = await Database.Engines.getById({
				db: database,
				id: piston.engine,
			});
			setEngine(engine);
			if (!engine) return;

			const pistons = await Database.Engines.Pistons.all({
				db: database,
				id: engine.id,
			});
			setPistons(pistons);
		};
		loadDatabase();
	}, [database, id]);

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
		<PistonDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Piston</h3>
						<img src={plus} alt="Add" onClick={addPiston}/>
					</Top>

					<InlinePistonsDiv>
						{pistons.map((piston) => (
									<PistonInline
										key={piston.id}
										engineID={engine.id}
										{...piston}
										pistons={pistons}
										setPistons={setPistons}
										database={database}
									/>
							))}
					</InlinePistonsDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Piston {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Mass:</h1>
							<p>grams</p>
							<input
								key={piston.mass}
								autoFocus
								type="number"
								min="0"
								defaultValue={piston.mass}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Pistons.update({
										db: database,
										id,
										values: {
											...piston,
											mass: parseFloat(e.target.value),
										},
									});
									setPiston({
										...piston,
										mass: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Compression height:</h1>
							<p>mm</p>
							<input
								key={piston.compressionHeight}
								autoFocus
								type="number"
								min="0"
								defaultValue={piston.compressionHeight}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Pistons.update({
										db: database,
										id,
										values: {
											...piston,
											compressionHeight: parseFloat(e.target.value),
										},
									});
									setPiston({
										...piston,
										compressionHeight: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Wristpin Position:</h1>
							<input
								key={piston.wristPinPosition}
								autoFocus
								type="number"
								min="0"
								defaultValue={piston.wristPinPosition}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Pistons.update({
										db: database,
										id,
										values: {
											...piston,
											wristPinPosition: parseFloat(e.target.value),
										},
									});
									setPiston({
										...piston,
										wristPinPosition: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Displacement:</h1>
							<input
								key={piston.displacement}
								autoFocus
								type="number"
								min="0"
								defaultValue={piston.displacement}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Pistons.update({
										db: database,
										id,
										values: {
											...piston,
											displacement: parseFloat(e.target.value),
										},
									});
									setPiston({
										...piston,
										displacement: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</PistonDiv>
	);
};

export default Piston;
