import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";

import General from "./pages/engines/edit/General";
import Cylinderhead from "./pages/engines/edit/Cylinderhead";

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
						"cylinder_heads",
						"banks",
						"connecting_rods",
						"journal_rods",
						"crankshafts",
						"exhausts",
						"intakes",
						"lobes",
						"distributor",
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
				{/* HOME AND OTHER STUFF */}
				<Route path="/" element={<Home database={database}></Home>} />
				<Route path="/about" element={<h1>b</h1>} />
				<Route path="/guide" element={<Guide></Guide>} />

				{/* GENERAL */}
				<Route
					path="/engines/:id/edit/general"
					element={<General database={database}></General>}
				/>

				{/* CYLINDER HEAD */}
				<Route 
					path="/engines/:id/edit/head"
					element={<Cylinderhead database={database}></Cylinderhead>}
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
					element={
						<ConnectingRods database={database}></ConnectingRods>
					}
				/>
				<Route
					path="/engines/edit/rods/journal/:id"
					element={<JournalRods database={database}></JournalRods>}
				/>

				{/* CRANKSHAFTS */}
				<Route
					path="/engines/:id/edit/crankshafts"
					element={<Crankshafts database={database}></Crankshafts>}
				/>
				<Route
					path="/engines/edit/crankshaft/:id"
					element={<Crankshaft database={database}></Crankshaft>}
				/>

				{/* LOBES */}
				<Route
					path="/engines/:id/edit/lobes"
					element={<Lobes database={database}></Lobes>}
				/>

				<Route 
					path="/engines/edit/lobe/:id" 
					element={<Lobe database={database}></Lobe>} 
				/>

				{/* EXHAUSTS */}
				<Route
					path="/engines/:id/edit/exhausts"
					element={<Exhausts database={database}></Exhausts>}
				/>

				<Route
					path="/engines/edit/exhaust/:id"
					element={<Exhaust database={database}></Exhaust>}
				/>

				{/* INTAKES */}
				<Route
					path="/engines/:id/edit/intakes"
					element={<Intakes database={database}></Intakes>}
				/>

				<Route
					path="/engines/edit/intake/:id"
					element={<Intake database={database}></Intake>}
				/>

				{/* PISTONS */}
				<Route
					path="/engines/:id/edit/pistons"
					element={<Pistons database={database}></Pistons>}
				/>

				<Route
					path="/engines/edit/piston/:id"
					element={<Piston database={database}></Piston>}
				/>

				{/* DISTRIBUTOR */}
				<Route
					path="/engines/:id/edit/distributor"
					element={<Distributor database={database}></Distributor>}
				/>
				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
