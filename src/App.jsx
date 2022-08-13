import "./styles/app.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { openDB, deleteDB, wrap, unwrap } from "idb";
import { useState, useEffect } from "react";
import Database from "./database/database";
function App() {
	const navigate = useNavigate();
	const [database, setDatabase] = useState(null);

	useEffect(() => {
		const stuff = async () => {
			const version = 1;
			const db = await openDB("enginette", version, {
				upgrade(db, oldVersion, newVersion, transaction) {
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
					path="/engines/:name/edit/general"
					element={<General></General>}
				/>

				<Route
					path="/engines/:name/edit/banks/:id"
					element={<Banks></Banks>}
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
