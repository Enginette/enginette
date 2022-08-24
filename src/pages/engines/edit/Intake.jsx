import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import IntakeInline from "../../../components/Intakes/IntakeInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const IntakeDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineIntakesDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Intake = ({database}) => {
	let { name, id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [intakes, setIntakes] = useState([]);
	//selected intake
	const [intake, setIntake] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Intake #${id}?`
		);
		if (!confirmation) return;

		await Database.Intakes.remove({ db: database, id });
		navigate(`/engines/${engine.id}/edit/intakes`);
	};

	const addIntake = async () => {
		const intake = await Database.Intakes.add({
			db: database,
			values: {
				engine: engine.id,
				plenumVolume: 1,
				plenumCrossSectionArea: 10,
				flowRate: 300,
				idleFlowRate: 0,
				idleThrottlePlatePosition: 0.98,
				throttleGamma: 1,
			},
		});

		setIntakes([...intakes, intake]);
	};

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			//load selected crankshaft
			const intake = await Database.Intakes.getById({
				db: database,
				id,
			});
			if (!intake) return setIntake(undefined);
			setIntake(intake);

			const engine = await Database.Engines.getById({
				db: database,
				id: intake.engine,
			});
			setEngine(engine);
			if (!engine) return;

			const intakes = await Database.Engines.Intakes.all({
				db: database,
				id: engine.id,
			});
			setIntakes(intakes);
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
		<IntakeDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Intakes</h3>
						<img src={plus} alt="Add" onClick={addIntake}/>
					</Top>

					<InlineIntakesDiv>
						{intakes.map((intk) => (
									<IntakeInline
										key={intk.id}
										engineID={engine.id}
										{...intk}
										intakes={intakes}
										setIntakes={setIntakes}
										database={database}
									/>
							))}
					</InlineIntakesDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Intake {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Plenum Volume:</h1>
							<input
								key={intake.plenumVolume}
								autoFocus
								type="number"
								defaultValue={intake.plenumVolume}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Intakes.update({
										db: database,
										id,
										values: {
											...intake,
											plenumVolume: parseInt(e.target.value),
										},
									});
									setIntake({
										...intake,
										plenumVolume: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Plenum Cross Section Area:</h1>
							<input
								key={intake.plenumCrossSectionArea}
								autoFocus
								type="number"
								defaultValue={intake.plenumCrossSectionArea}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Intakes.update({
										db: database,
										id,
										values: {
											...intake,
											plenumCrossSectionArea: parseInt(e.target.value),
										},
									});
									setIntake({
										...intake,
										plenumCrossSectionArea: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Flow Rate:</h1>
							<p>scfm</p>
							<input
								key={intake.flowRate}
								autoFocus
								type="number"
								defaultValue={intake.flowRate}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Intakes.update({
										db: database,
										id,
										values: {
											...intake,
											flowRate: parseInt(e.target.value),
										},
									});
									setIntake({
										...intake,
										flowRate: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Idle Flow Rate:</h1>
							<p>scfm</p>
							<input
								key={intake.idleFlowRate}
								autoFocus
								type="number"
								defaultValue={intake.idleFlowRate}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Intakes.update({
										db: database,
										id,
										values: {
											...intake,
											idleFlowRate: parseInt(e.target.value),
										},
									});
									setIntake({
										...intake,
										idleFlowRate: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Idle throttle plate position:</h1>
							<input
								key={intake.idleThrottlePlatePosition}
								autoFocus
								type="number"
								defaultValue={intake.idleThrottlePlatePosition}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Intakes.update({
										db: database,
										id,
										values: {
											...intake,
											idleThrottlePlatePosition: parseFloat(e.target.value),
										},
									});
									setIntake({
										...intake,
										idleThrottlePlatePosition: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Throttle Gamma:</h1>
							<input
								key={intake.throttleGamma}
								autoFocus
								type="number"
								defaultValue={intake.throttleGamma}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Intakes.update({
										db: database,
										id,
										values: {
											...intake,
											throttleGamma: parseInt(e.target.value),
										},
									});
									setIntake({
										...intake,
										throttleGamma: parseInt(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</IntakeDiv>
	);
};

export default Intake;
