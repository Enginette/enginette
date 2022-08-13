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
function App() {
	const navigate = useNavigate();

	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home></Home>} />
				<Route path="/about" element={<h1>b</h1>} />

				<Route path="/engines/:name/edit/general" element={<General></General>} />

				<Route path="/engines/:name/edit/banks/:id" element={<Banks></Banks>} />

				<Route path="/engines/:name/edit/rods/connecting/:id" element={<ConnectingRods></ConnectingRods>} />

				<Route path="/engines/:name/edit/rods/journal/:id" element={<JournalRods></JournalRods>} />

				<Route path="/engines/:name/edit/crankshafts/:id" element={<Crankshafts></Crankshafts>} />

				<Route path="/engines/:name/edit/exhausts/:id" element={<Exhausts></Exhausts>} />

				<Route path="/engines/:name/edit/intakes/:id" element={<Intakes></Intakes>} />

				<Route path="/engines/:name/edit/pistons/:id" element={<Pistons></Pistons>} />
				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
