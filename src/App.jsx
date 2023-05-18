import "./styles/app.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// MAIN SITES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";
import Generate from "./pages/Generate";

// ENGINES
import Engines from "./pages/engines/Engines";
import EnginesGuide from "./pages/engines/Guide";

import EnginesGeneral from "./pages/engines/edit/General";

import Main from "./pages/engines/edit/Main";
import Banks from "./pages/engines/edit/Banks";
import Intake from "./pages/engines/edit/Intake";
import Exhaust from "./pages/engines/edit/Exhaust";
import Camshaft from "./pages/engines/edit/Camshaft";
import IntakeCamshaft from "./pages/engines/edit/IntakeCamshaft";
import ExhaustCamshaft from "./pages/engines/edit/ExhaustCamshaft";
import Cylinderhead from "./pages/engines/edit/Cylinderhead";
import Distributor from "./pages/engines/edit/Distributor";
import Sound from "./pages/engines/edit/Sound";
import Fuel from "./pages/engines/edit/Fuel";

// TRANSMISSIONS
import Transmissions from "./pages/transmissions/Transmissions";
import TransmissionsGuide from "./pages/transmissions/Guide";

import TransmissionsGeneral from "./pages/transmissions/edit/General";

// VEHICLES
import Vehicles from "./pages/vehicles/Vehicles";
import VehiclesGuide from "./pages/vehicles/Guide";

import VehiclesGeneral from "./pages/vehicles/edit/General";

// OTHER
import DB from "./database/db.js";
import Footer from "./components/Footer/Footer";
import Page from "./components/Page";

function App() {
	useEffect(() => {
		DB.Init();
	}, []);

	if(DB.GetDB() === undefined) {
		return (<div className="app">
			<h1>Please wait 5 seconds and refresh the page.</h1>
		</div>)
	}
	
	return (
		<div className="app">
			<div className="routes">
				<Routes>
					{/* HOME AND OTHER STUFF */}
					<Route
						path="/"
						element={<Page title="Home">
							<Home/>
						</Page>}
					/>
					<Route
						path="/guide"
						element={<Page title="Guide - Home">
							<Guide/>
						</Page>}
					/>
					<Route
						path="/generate"
						element={<Page title="Generate">
							<Generate/>
						</Page>}
					/>

					{/* ENGINES */}
					<Route
						path="/engines"
						element={<Page title="Engines">
							<Engines/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/general"
						element={<Page title=" - General" prependEngine={true}>
							<EnginesGeneral/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/main"
						element={<Page title=" - Measurements" prependEngine={true}>
							<Main/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/banks"
						element={<Page title=" - Banks" prependEngine={true}>
							<Banks/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/intake"
						element={<Page title=" - Intake" prependEngine={true}>
							<Intake/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/exhaust"
						element={<Page title=" - Exhaust" prependEngine={true}>
							<Exhaust/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/camshaft"
						element={<Page title=" - Camshaft" prependEngine={true}>
							<Camshaft/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/camshaft/intake"
						element={<Page title=" - Intake Camshaft" prependEngine={true}>
							<IntakeCamshaft/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/camshaft/exhaust"
						element={<Page title=" - Exhaust Camshaft" prependEngine={true}>
							<ExhaustCamshaft/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/head"
						element={<Page title=" - Cylinderhead" prependEngine={true}>
							<Cylinderhead/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/distributor"
						element={<Page title=" - Distributor" prependEngine={true}>
							<Distributor/>
						</Page>}
					/>
					<Route
						path="/engines/:id/edit/sound"
						element={<Page title=" - Sound" prependEngine={true}>
							<Sound/>
						</Page>}
					/>\
					<Route
						path="/engines/:id/edit/fuel"
						element={<Page title=" - Fuel" prependEngine={true}>
							<Fuel/>
						</Page>}
					/>
					<Route
						path="/engines/guide"
						element={<Page title="Guide - Engines">
							<EnginesGuide/>
						</Page>}
					/>
				
					{/* TRANSMISSIONS */}
					<Route
						path="/transmissions"
						element={<Page title="Transmissions">
							<Transmissions/>
						</Page>}
					/>
					<Route
						path="/transmissions/:id/edit/general"
						element={<Page title=" - General" prependTransmission={true}>
							<TransmissionsGeneral/>
						</Page>}
					/>
					<Route
						path="/transmissions/guide"
						element={<Page title="Guide - Transmissions">
							<TransmissionsGuide/>
						</Page>}
					/>

					{/* VEHICLES */}
					<Route
						path="/vehicles"
						element={<Page title="Vehicles">
							<Vehicles/>
						</Page>}
					/>
					<Route
						path="/vehicles/:id/edit/general"
						element={<Page title=" - General" prependVehicle={true}>
							<VehiclesGeneral/>
						</Page>}
					/>
					<Route
						path="/vehicles/guide"
						element={<Page title="Guide - Vehicles">
							<VehiclesGuide/>
						</Page>}
					/>

					<Route
						path="*"
						element={<Page title="404 Not Found">
							<NotFound/>
						</Page>}
					/>
				</Routes>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default App;
