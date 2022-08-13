import "./styles/app.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import General from "./pages/engines/edit/General";
import Banks from "./pages/engines/edit/Banks";
import ConnectingRods from "./pages/engines/edit/ConnectingRods";
import JournalRods from "./pages/engines/edit/JournalRods";
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
				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
