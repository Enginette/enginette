import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import ExhaustInline from "../../../components/Exhausts/ExhaustInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const ExhaustsDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineExhaustsDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Exhaust = ({database}) => {
	let { name, id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [exhausts, setExhausts] = useState([]);
	//selected exhaust
	const [exhaust, setExhaust] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Exhaust #${id}?`
		);
		if (!confirmation) return;

		await Database.Exhausts.remove({ db: database, id });
		navigate(`/engines/${engine.id}/edit/exhausts`);
	};

	const addExhaust = async () => {
		const exhaust = await Database.Exhausts.add({
			db: database,
			values: {
				engine: engine.id,
				outletFlowRate: 0,
				length: 0,
				flowRate: 0,
				velocityDecay: 0,
				volume: 0,
			},
		});

		setExhausts([...exhausts, exhaust]);
	};

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			//load selected crankshaft
			const exhaust = await Database.Exhausts.getById({
				db: database,
				id,
			});
			if (!exhaust) return setExhaust(undefined);
			setExhaust(exhaust);

			const engine = await Database.Engines.getById({
				db: database,
				id: exhaust.engine,
			});
			setEngine(engine);
			if (!engine) return;

			const exhausts = await Database.Engines.Exhausts.all({
				db: database,
				id: engine.id,
			});
			setExhausts(exhausts);
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
		<ExhaustsDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Exhausts</h3>
						<img src={plus} alt="Add" onClick={addExhaust}/>
					</Top>

					<InlineExhaustsDiv>
						{exhausts.map((exh) => (
									<ExhaustInline
										key={exh.id}
										engineID={engine.id}
										{...exh}
										exhausts={exhausts}
										setExhausts={setExhausts}
										database={database}
									/>
							))}
					</InlineExhaustsDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Exhaust {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Outlet Flow Rate:</h1>
							<p>scfm</p>
							<input
								key={exhaust.outletFlowRate}
								autoFocus
								type="number"
								min="0"
								defaultValue={exhaust.outletFlowRate}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Exhausts.update({
										db: database,
										id,
										values: {
											...exhaust,
											outletFlowRate: parseInt(e.target.value),
										},
									});
									setExhaust({
										...exhaust,
										outletFlowRate: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Length:</h1>
							<p>inches</p>
							<input
								key={exhaust.length}
								autoFocus
								type="number"
								min="0"
								defaultValue={exhaust.length}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Exhausts.update({
										db: database,
										id,
										values: {
											...exhaust,
											length: parseInt(e.target.value),
										},
									});
									setExhaust({
										...exhaust,
										length: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Flow Rate:</h1>
							<p>scfm</p>
							<input
								key={exhaust.flowRate}
								autoFocus
								type="number"
								min="0"
								defaultValue={exhaust.flowRate}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Exhausts.update({
										db: database,
										id,
										values: {
											...exhaust,
											flowRate: parseInt(e.target.value),
										},
									});
									setExhaust({
										...exhaust,
										flowRate: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Velocity Decay:</h1>
							<input
								key={exhaust.velocityDecay}
								autoFocus
								type="number"
								min="0"
								step="0.1"
								defaultValue={exhaust.velocityDecay}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Exhausts.update({
										db: database,
										id,
										values: {
											...exhaust,
											velocityDecay: parseInt(e.target.value),
										},
									});
									setExhaust({
										...exhaust,
										velocityDecay: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Volume:</h1>
							<p>liters</p>
							<input
								key={exhaust.volume}
								autoFocus
								type="number"
								min="0"
								defaultValue={exhaust.volume}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Exhausts.update({
										db: database,
										id,
										values: {
											...exhaust,
											volume: parseInt(e.target.value),
										},
									});
									setExhaust({
										...exhaust,
										volume: parseInt(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</ExhaustsDiv>
	);
};

export default Exhaust;
