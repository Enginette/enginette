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
	InlineBanksDiv,
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
	const [cylinders, setCylinders] = useState([]);

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

			const cylinders = await Database.Engines.Cylinders.all({
				db: database,
				id: engine.id,
			});
			setCylinders(cylinders);
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
				<p>
					Not Loading? <br /> Maybe the page encountered an error.
					Check the console for more details
				</p>
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

				<InternalEditor></InternalEditor>
			</Editor>
		</BanksDiv>
	);
};
export { InlineBanksDiv, Top };
export default Banks;
