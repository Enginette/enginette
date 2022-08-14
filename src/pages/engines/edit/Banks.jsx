import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingScreen } from "./General";
import plus from "../../../images/plus.svg";
import Header from "../../../components/Header/Header";
import BankInline from "../../../components/Banks/BankInline";
import Database from "../../../database/database";

const BanksDiv = styled.div`
	width: 100%;
	height: calc(100% - 70px);
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const Editor = styled.div`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	gap: 20px;
`;

const SideBar = styled.div`
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: 494px;
	background-color: white;
	border-radius: 20px;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
`;

const InternalEditor = styled.div`
	box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.2);
	width: 100%;
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
		transform: translateX(-5px);
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
const InlinBanksDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 5px;
	> a {
		text-decoration: none;
		width: 100%;
	}
`;

const Banks = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);

	const navigate = useNavigate();
	const [engine, setEngine] = useState(null);
	const [banks, setBanks] = useState([]);

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
			const engine = await Database.Engines.getById({
				db: database,
				id,
			});
			console.log(engine);
			setEngine({ ...engine, id });

			const banks = await Database.Engines.Banks.all({
				db: database,
				id,
			});
			setBanks(banks);
		};
		stuff();
	}, [database]);
	if (engine === undefined) {
		navigate("/");
		return;
	} else if (engine === null) {
		return (
			<LoadingScreen>
				<h1>Loading...</h1>
			</LoadingScreen>
		);
	}

	return (
		<BanksDiv>
			<Header engine={engine} />
			<Editor>
				<SideBar>
					<Top>
						<h3>Banks</h3>
						<img src={plus} alt="Add" onClick={addBank} />
					</Top>
					<InlinBanksDiv>
						{banks.map((bank, index) => (
							<BankInline
								name={`Bank ${index}`}
								{...bank}
								key={bank.id}
								banks={banks}
								setBanks={setBanks}
								database={database}
							/>
						))}
					</InlinBanksDiv>
				</SideBar>

				<InternalEditor></InternalEditor>
			</Editor>
		</BanksDiv>
	);
};

export default Banks;
