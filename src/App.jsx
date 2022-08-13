import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import General from "./pages/engines/edit/General";
import Banks from "./pages/engines/edit/Banks";
import ConnectingRods from "./pages/engines/edit/ConnectingRods";
import JournalRods from "./pages/engines/edit/JournalRods";
import Crankshafts from "./pages/engines/edit/Crankshafts";
import Exhausts from "./pages/engines/edit/Exhausts";
import Intakes from "./pages/engines/edit/Intakes";
import Pistons from "./pages/engines/edit/Pistons";
import { openDB } from "idb";
import { useState, useEffect } from "react";
import Database from "./database/database";
import Bank from "./pages/engines/edit/Bank";
function App() {
	const [database, setDatabase] = useState(null);

	useEffect(() => {
		const stuff = async () => {
			const version = 2;
			const db = await openDB("enginette", version, {
				async upgrade(db, oldVersion, newVersion, transaction) {
					const objectStores = ["engines", "banks"];
					for (let i = 0; i < objectStores.length; i++) {
						try {
							await db.deleteObjectStore(objectStores[i]);
						} catch (error) {}
					}
					Database.initiate(db);
				},
			});
			setDatabase(db);
		};
		stuff();
	}, []);

	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home database={database}></Home>} />
				<Route path="/about" element={<h1>b</h1>} />

				<Route
					path="/engines/:id/edit/general"
					element={<General database={database}></General>}
				/>
				<Route
					path="/engines/:id/edit/banks"
					element={<Banks database={database}></Banks>}
				/>
				<Route
					path="/engines/edit/banks/:id"
					element={<Bank database={database}></Bank>}
				/>

				<Route
					path="/engines/:name/edit/rods/connecting/:id"
					element={<ConnectingRods></ConnectingRods>}
				/>

				<Route
					path="/engines/:name/edit/rods/journal/:id"
					element={<JournalRods></JournalRods>}
				/>
				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
