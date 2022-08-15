import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import General from "./pages/engines/edit/General";

import Banks from "./pages/engines/edit/Banks";
import Bank from "./pages/engines/edit/Bank";

import Rods from "./pages/engines/edit/Rods";
import ConnectingRods from "./pages/engines/edit/ConnectingRods";
import JournalRods from "./pages/engines/edit/JournalRods";

import Crankshafts from "./pages/engines/edit/Crankshafts";
import Crankshaft from "./pages/engines/edit/Crankshaft";

import Exhausts from "./pages/engines/edit/Exhausts";
import Exhaust from "./pages/engines/edit/Exhaust";

import Intakes from "./pages/engines/edit/Intakes";
import Intake from "./pages/engines/edit/Intake";

import Pistons from "./pages/engines/edit/Pistons";
import Piston from "./pages/engines/edit/Piston";

import Lobes from "./pages/engines/edit/Lobes";
import Lobe from "./pages/engines/edit/Lobe";

import Distributor from "./pages/engines/edit/Distributor";

import { openDB } from "idb";
import { useState, useEffect } from "react";
import Database from "./database/database";
function App() {
	const [database, setDatabase] = useState(null);

	useEffect(() => {
		const stuff = async () => {
			const version = 3;
			const db = await openDB("enginette", version, {
				async upgrade(db, oldVersion, newVersion, transaction) {
					const objectStores = [
						"engines",
						"banks",
						"connecting_rods",
						"journal_rods",
					];
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

				{/* BANKS */}
				<Route
					path="/engines/:id/edit/banks"
					element={<Banks database={database}></Banks>}
				/>
				<Route
					path="/engines/edit/banks/:id"
					element={<Bank database={database}></Bank>}
				/>

				{/* RODS */}
				<Route
					path="/engines/:id/edit/rods"
					element={<Rods database={database}></Rods>}
				/>
				<Route
					path="/engines/edit/rods/connecting/:id"
					element={<ConnectingRods></ConnectingRods>}
				/>
				<Route
					path="/engines/edit/rods/journal/:id"
					element={<JournalRods></JournalRods>}
				/>

				{/* CRANKSHAFTS */}
				<Route
					path="/engines/:id/edit/crankshafts"
					element={<Crankshafts></Crankshafts>}
				/>
				<Route
					path="/engines/edit/crankshaft/:id"
					element={<Crankshaft></Crankshaft>}
				/>

				{/* LOBES */}
				<Route
					path="/engines/:id/edit/lobes"
					element={<Lobes></Lobes>}
				/>

				<Route path="/engines/edit/lobe/:id" element={<Lobe></Lobe>} />

				{/* EXHAUSTS */}
				<Route
					path="/engines/:id/edit/exhausts"
					element={<Exhausts></Exhausts>}
				/>

				<Route
					path="/engines/edit/exhaust/:id"
					element={<Exhaust></Exhaust>}
				/>

				{/* INTAKES */}
				<Route
					path="/engines/:id/edit/intakes"
					element={<Intakes></Intakes>}
				/>

				<Route
					path="/engines/edit/intake/:id"
					element={<Intake></Intake>}
				/>

				{/* PISTONS */}
				<Route
					path="/engines/:id/edit/pistons"
					element={<Pistons></Pistons>}
				/>

				<Route
					path="/engines/edit/piston/:id"
					element={<Piston></Piston>}
				/>

				{/* DISTRIBUTOR */}
				<Route
					path="/engines/:id/edit/distributor"
					element={<Distributor></Distributor>}
				/>
				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
