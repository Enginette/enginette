class Database {
	static Engines = class Engines {
		static all = () => {
			return JSON.parse(localStorage.getItem("engines")) || [];
		};
		static add = (name) => {
			const engines = Database.Engines.all();
			localStorage.setItem("engines", JSON.stringify([...engines, name]));
		};
		static remove = (name) => {
			const engines = Database.Engines.all();
			localStorage.setItem(
				"engines",
				JSON.stringify(engines.filter((engine) => engine !== name))
			);
		};
		static exists = (name) => {
			const engines = Database.Engines.all();
			return engines.filter((engine) => engine === name).length;
		};
	};
}

export default Database;
