import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import plus from "../../../images/plus.svg";
import { LoadingScreen, Input } from "./General";
import { SideBar, InternalEditor, Editor, EditorTop, Top } from "./Bank";
import LobeInline from "../../../components/Lobes/LobeInline";
import { MyInputs, ConnectingRodsDiv } from "./ConnectingRods";
import { InlineBanksDiv } from "./Bank";

const LobeDiv = styled(ConnectingRodsDiv)`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const InlineLobesDiv = styled(InlineBanksDiv)`
	max-height: calc((100vh - 390px) / 2 - 20px);
`;

const Lobe = ({database}) => {
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [lobes, setLobes] = useState([]);
	//selected intake
	const [lobe, setLobe] = useState(null);

	const handleDelete = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete Lobe #${id}?`
		);
		if (!confirmation) return;

		await Database.Lobes.remove({ db: database, id });
		navigate(`/engines/${engine.id}/edit/lobes`);
	};

	const addLobe = async () => {
		const lobe = await Database.Lobes.add({
			db: database,
			values: {
				engine: engine.id,
				durationAtFiftyThousands: 1,
				gamma: 1,
				lift: 0,
				steps: 100,
			},
		});

		setLobes([...lobes, lobe]);
	};

	useEffect(() => {
		if (!database) return;
		const loadDatabase = async () => {
			//load selected crankshaft
			const lobe = await Database.Lobes.getById({
				db: database,
				id,
			});
			if (!lobe) return setLobe(undefined);
			setLobe(lobe);

			const engine = await Database.Engines.getById({
				db: database,
				id: lobe.engine,
			});
			setEngine(engine);
			if (!engine) return;

			const lobes = await Database.Engines.Lobes.all({
				db: database,
				id: engine.id,
			});
			setLobes(lobes);
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
		<LobeDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Lobes</h3>
						<img src={plus} alt="Add" onClick={addLobe}/>
					</Top>

					<InlineLobesDiv>
						{lobes.map((lb) => (
									<LobeInline
										key={lb.id}
										engineID={engine.id}
										{...lb}
										lobes={lobes}
										setLobes={setLobes}
										database={database}
									/>
							))}
					</InlineLobesDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>Lobe {id}</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "none" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Duration at 50 thousands:</h1>
							<p>degrees</p>
							<input
								key={lobe.durationAtFiftyThousands}
								autoFocus
								type="number"
								min="0"
								defaultValue={lobe.durationAtFiftyThousands}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Lobes.update({
										db: database,
										id,
										values: {
											...lobe,
											durationAtFiftyThousands: parseInt(e.target.value),
										},
									});
									setLobe({
										...lobe,
										durationAtFiftyThousands: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Gamma:</h1>
							<input
								key={lobe.gamma}
								autoFocus
								type="number"
								min="0"
								step="0.01"
								defaultValue={lobe.gamma}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Lobes.update({
										db: database,
										id,
										values: {
											...lobe,
											gamma: parseInt(e.target.value),
										},
									});
									setLobe({
										...lobe,
										gamma: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Lift:</h1>
							<p>mm</p>
							<input
								key={lobe.lift}
								autoFocus
								type="number"
								min="0"
								defaultValue={lobe.lift}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Lobes.update({
										db: database,
										id,
										values: {
											...lobe,
											lift: parseInt(e.target.value),
										},
									});
									setLobe({
										...lobe,
										lift: parseInt(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Steps:</h1>
							<input
								key={lobe.steps}
								autoFocus
								type="number"
								min="0"
								step="10"
								defaultValue={lobe.steps}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Lobes.update({
										db: database,
										id,
										values: {
											...lobe,
											steps: parseInt(e.target.value),
										},
									});
									setLobe({
										...lobe,
										steps: parseInt(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>
				</InternalEditor>
			</Editor>
		</LobeDiv>
	);
};

export default Lobe;
