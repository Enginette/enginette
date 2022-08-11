import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home></Home>} />
				<Route path="/about" element={<h1>b</h1>} />
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App;
