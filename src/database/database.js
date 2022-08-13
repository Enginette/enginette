import Engine from "./Engine";

class Database {
	static Engines = class Engines {
		static update = (engines = []) => {
			localStorage.setItem(
				"engines",
				JSON.stringify(engines.map((engine) => engine.toJSON()))
			);
		};
		static edit = ({ name, engine }) => {
			const engines = Database.Engines.all();
			Database.Engines.update(
				engines.map((databaseEngine) => {
					if (databaseEngine.name === name) {
						return engine;
					}
					return databaseEngine;
				})
			);
		};
		static all = () => {
			const raw_engines =
				JSON.parse(localStorage.getItem("engines")) || [];

			return raw_engines.map((raw_engine) => new Engine(raw_engine));
		};
		static add = (engine) => {
			const engines = Database.Engines.all();
			engines.push(engine);
			this.update(engines);
		};
		static remove = (engine) => {
			const engines = Database.Engines.all();
			this.update(
				engines.filter(
					(database_engine) => database_engine.name !== engine.name
				)
			);
		};
		static exists = (name) => {
			const engines = Database.Engines.all();
			return engines.filter(
				(database_engine) => database_engine.name === name
			).length;
		};
		static get = ({ name, defaultValue = undefined }) => {
			let engines = Database.Engines.all();
			engines = engines.filter((engine) => engine.name === name);
			return engines.length ? engines[0] : defaultValue;
		};
	};
}

export default Database;
