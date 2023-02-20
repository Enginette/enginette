import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingScreen, Inputs, Input } from "./General";
import plus from "../../../images/plus.svg";
import Header from "../../../components/Header/Header";
import BankInline from "../../../components/Banks/BankInline";
import Database from "../../../database/database";
import deleteIcon from "../../../images/delete.svg";
import Cylinder from "../../../components/Cylinders/Cylinder";

const BanksDiv = styled.div`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;
const InlineBanksDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 5px;
	overflow-y: auto;
	max-height: calc(100vh - 300px);
	> a {
		text-decoration: none;
		width: 100%;
	}
`;
const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	> h3 {
		font-size: 24px;
		font-weight: 500;
		color: #C7D5ED;
	}
	> img {
		cursor: pointer;
		width: 20px;
		height: 20px;
	}
`;
const Editor = styled.div`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	gap: 20px;
`;

const SideBar = styled.div`
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: 350px;
	background-color: #303237;
	border-radius: 20px;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
`;

const InternalEditor = styled.div`
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: calc(100% - 350px - 20px);
	background-color: #303237;
	border-radius: 20px;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

const EditorTop = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	> img {
		cursor: pointer;
	}

	> h1 {
		color: #C7D5ED;
		font-weight: 700;
		font-size: 32px;
	}

	> h3 {
		color: #BEC2C8;
		font-weight: 500;
		font-size: 24px;
	}
`;

const Cylinders = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;
`;

const MyInputs = styled(Inputs)`
	background-color: transparent;
	box-shadow: none;
	padding: 0px;
`;

const Bank = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [bank, setBank] = useState(null);
	const [banks, setBanks] = useState([]);
	const [cylinders, setCylinders] = useState([]);

	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const [exhausts, setExhausts] = useState([]);
	const [pistons, setPistons] = useState([]);

	const handleDelete = async () => {
		const confirmation = window.confirm(`Are you sure you want to delete?`);
		if (!confirmation) return;
		await Database.Banks.remove({
			db: database,
			id,
		});
		if (banks.length <= 1) {
			return navigate(`/engines/${engine.id}/edit/banks`);
		}
		navigate(
			`/engines/edit/banks/${
				banks.filter((databaseBank) => databaseBank.id !== id)[0].id
			}`
		);
		setBanks(banks.filter((databaseBank) => databaseBank.id !== id));
	};

	const addBank = async () => {
		const bank = await Database.Banks.add({
			db: database,
			values: {
				engine: engine.id,
				bore: 70,
				deck_height: 200,
				angle: 0,
			},
		});
		setBanks([...banks, bank]);
	};

	const addCylinder = async () => {
		const cylinder = await Database.Cylinders.add({
			db: database,
			values: {
				engine: engine.id,
				bank: id,
				
				piston: pistons[0].id,
				exhaust: exhausts[0].id,
				intake: intakes[0].id,
				connectingRod: connectingRods[0].id,
				journalRod: journalRods[0].id,
			},
		});
		setCylinders([...cylinders, cylinder]);
	};

	useEffect(() => {
		if (!database) return;

		const stuff = async () => {
			const bank = await Database.Banks.getById({
				db: database,
				id,
			});
			if (!bank) return setBank(undefined);
			setBank(bank);

			const banks = await Database.Engines.Banks.all({
				db: database,
				id: bank.engine,
			});
			setBanks(banks);

			const cylinders = await Database.Engines.Cylinders.all({
				db: database,
				id: bank.engine,
			});
			setCylinders(cylinders);

			const engine = await Database.Engines.getById({
				db: database,
				id: bank.engine,
			});
			setEngine(engine);

			//load connecting rods from database
			const connectingRods = await Database.Engines.ConnectingRods.all({
				db: database,
				id: engine.id,
			});
			setConnectingRods(connectingRods);

			//load journal rods from database
			const journalRods = await Database.Engines.JournalRods.all({
				db: database,
				id: engine.id,
			});
			setJournalRods(journalRods);

        	//load intakes from database
			const intakes = await Database.Engines.Intakes.all({
				db: database,
				id: engine.id,
			});
			setIntakes(intakes);

        	//load exhausts from database
			const exhausts = await Database.Engines.Exhausts.all({
				db: database,
				id: engine.id,
			});
			setExhausts(exhausts);

        	//load pistons from database
			const pistons = await Database.Engines.Pistons.all({
				db: database,
				id: engine.id,
			});
			setPistons(pistons);
		};
		stuff();
	}, [database, id]);

	if (bank === undefined) {
		navigate("/");
		return;
	} else if (bank === null || banks === null || engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>
					Not Loading? <br /> Maybe the page encountered an error.
					Check the console for more details
				</p>
			</LoadingScreen>
		);
	}

	if (!banks.filter((item) => item.id === id).length) {
		navigate(`/engines/${engine.id}/edit/banks`);
		return;
	}

	return (
		<BanksDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Banks</h3>
						<img
							style={{ height: 20, width: 20 }}
							src={plus}
							alt="Add"
							onClick={addBank}
						/>
					</Top>
					<InlineBanksDiv>
						{banks.map((bank) => {
							let count = 0;
			
							cylinders.forEach(element => {
								if(element.bank === bank.id) {
									count++;
								}
							});
							return (
							<BankInline
								key={bank.id}
								cylinderCount={count}
								engineID={engine.id}
								{...bank}
								banks={banks}
								setBanks={setBanks}
								database={database}
							/>);
						})}
					</InlineBanksDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>
							Bank {banks.filter((item) => item.id === id)[0].id}
						</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "translateX(4px)" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<MyInputs>
						<Input>
							<h1>Angle</h1>
							<p>degrees</p>
							<input
								type="number"
								min={0}
								key={bank.angle}
								autoFocus
								defaultValue={bank.angle}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Banks.update({
										db: database,
										id,
										values: {
											...bank,
											angle: parseFloat(e.target.value),
										},
									});
									setBank({
										...bank,
										angle: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Bore</h1>
							<p>mm</p>
							<input
								type="number"
								min={0}
								key={bank.bore}
								autoFocus
								defaultValue={bank.bore}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Banks.update({
										db: database,
										id,
										values: {
											...bank,
											bore: parseFloat(e.target.value),
										},
									});
									setBank({
										...bank,
										bore: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>

						<Input>
							<h1>Deck height</h1>
							<p>mm</p>
							<input
								type="number"
								min={0}
								key={bank.deck_height}
								autoFocus
								defaultValue={bank.deck_height}
								onChange={async (e) => {
									if (e.target.value.length === 0) return;
									await Database.Banks.update({
										db: database,
										id,
										values: {
											...bank,
											deck_height: parseFloat(e.target.value),
										},
									});
									setBank({
										...bank,
										deck_height: parseFloat(e.target.value),
									});
								}}
							/>
						</Input>
					</MyInputs>

					<EditorTop>
						<h3>Cylinders</h3>
						<img
							src={plus}
							alt="Plus"
							style={{ height: "20px", width: "20px" }}
							onClick={addCylinder}
						/>
					</EditorTop>

					<Cylinders>
						{cylinders.map((cyl) => {
							if(cyl.bank == id)
							return (<Cylinder
								key={cyl.id}
								engineID={engine.id}
								{...cyl}
								cylinders={cylinders}
								setCylinders={setCylinders}
								database={database}
							/>
						)})}
					</Cylinders>
				</InternalEditor>
			</Editor>
		</BanksDiv>
	);
};

export {
	BanksDiv,
	SideBar,
	InternalEditor,
	Editor,
	EditorTop,
	InlineBanksDiv,
	Top,
};
export default Bank;
