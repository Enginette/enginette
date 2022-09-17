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

	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const [exhausts, setExhausts] = useState([]);
	const [pistons, setPistons] = useState([]);

	const addBank = async () => {
		const bank = await Database.Banks.add({
			db: database,
			values: {
				engine: engine.id,
				bore: 70,
				deck_height: 205,
				angle: 0,
				
				piston: pistons[0].id,
				exhaust: exhausts[0].id,
				intake: intakes[0].id,
				connectingRod: connectingRods[0].id,
				journalRod: journalRods[0].id,
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
