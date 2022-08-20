import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingScreen } from "./General";
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
		color: #031b4e;
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
	background-color: white;
	border-radius: 20px;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
`;

const InternalEditor = styled.div`
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: calc(100% - 350px - 20px);
	background-color: white;
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
		color: #080b2d;
		font-weight: 700;
		font-size: 32px;
	}

	> h3 {
		color: #031b4e;
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

const Bank = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [bank, setBank] = useState(null);
	const [banks, setBanks] = useState(null);

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
			},
		});
		setBanks([...banks, bank]);
	};

	useEffect(() => {
		if (!database) return;

		const stuff = async () => {
			const bank = await Database.Banks.getById({
				db: database,
				id,
			});
			setBank(bank);
			if (!bank) return;
			const banks = await Database.Engines.Banks.all({
				db: database,
				id: bank.engine,
			});
			setBanks(banks);

			const engine = await Database.Engines.getById({
				db: database,
				id: bank.engine,
			});
			setEngine(engine);
		};
		stuff();
	}, [database]);
	if (bank === undefined) {
		navigate("/");
		return;
	} else if (bank === null || banks === null || engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
				<p>Not Loading? <br/> Maybe the page encountered an error. Check the console for more details</p>
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
					{/* somehow get banks */}
					<InlineBanksDiv>
						{banks.map((bank, index) => (
							<BankInline
								name={`Bank ${index}`}
								{...bank}
								banks={banks}
								setBanks={setBanks}
								database={database}
							/>
						))}
					</InlineBanksDiv>
				</SideBar>

				<InternalEditor>
					<EditorTop>
						<h1>
							Bank{" "}
							{banks.indexOf(
								banks.filter((item) => item.id === id)[0]
							)}
						</h1>
						<img
							src={deleteIcon}
							alt="Delete"
							style={{ transform: "translateX(4px)" }}
							onClick={handleDelete}
						/>
					</EditorTop>

					<EditorTop>
						<h3>Cylinders</h3>
						<img
							src={plus}
							alt="Plus"
							style={{ height: "20px", width: "20px" }}
						/>
					</EditorTop>

					<Cylinders>
						<Cylinder />
						<Cylinder />
						<Cylinder />
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
