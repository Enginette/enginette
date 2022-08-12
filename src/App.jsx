import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import General from "./pages/engines/edit/General";
function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home></Home>} />
				<Route path="/about" element={<h1>b</h1>} />
				<Route path="/engines/:name/edit/general" element={<General></General>} />
				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
