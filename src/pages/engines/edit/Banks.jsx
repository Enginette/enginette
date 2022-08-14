import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingScreen } from "./General";
import plus from "../../../images/plus.svg";
import Header from "../../../components/Header/Header";
import BankInline from "../../../components/Banks/BankInline";
import Database from "../../../database/database";
import {
	BanksDiv,
	Editor,
	InlinBanksDiv,
	InternalEditor,
	SideBar,
	Top,
} from "./Bank";

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
export { InlinBanksDiv, Top };
export default Banks;
