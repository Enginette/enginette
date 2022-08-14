class Database {
	static initiate = (db) => {
		const engines = db.createObjectStore("engines", {
			autoIncrement: true,
		});
		engines.createIndex("name", "name", { unique: true });

		const banks = db.createObjectStore("banks", {
			autoIncrement: true,
		});
		banks.createIndex("engine", "engine");

		const connectingRods = db.createObjectStore("connecting_rods", {
			autoIncrement: true,
		});
		connectingRods.createIndex("engine", "engine");

		const journalRods = db.createObjectStore("journal_rods", {
			autoIncrement: true,
		});
		journalRods.createIndex("engine", "engine");
	};
	static ConnectingRods = class ConnectingRods {
		static add = async ({ db, values }) => {
			const tx = db.transaction("connecting_rods", "readwrite");
			const id = await tx.objectStore("connecting_rods").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("connecting_rods", "readonly");
			const objectStore = tx.objectStore("connecting_rods");
			return { ...(await objectStore.get(id), id) };
		};
		static remove = async ({ db, id }) => {
			const tx = db.transaction("connecting_rods", "readwrite");
			const objectStore = txn.objectStore("connecting_rods");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("connecting_rods", "readwrite");
			const objectStore = txn.objectStore("connecting_rods");
			await objectStore.put(values, id);
		};
	};
	static JournalRods = class JournalRods {
		static add = async ({ db, values }) => {
			const tx = db.transaction("journal_rods", "readwrite");
			const id = await tx.objectStore("journal_rods").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("journal_rods", "readonly");
			const objectStore = tx.objectStore("journal_rods");
			return { ...(await objectStore.get(id), id) };
		};
		static remove = async ({ db, id }) => {
			const tx = db.transaction("journal_rods", "readwrite");
			const objectStore = txn.objectStore("journal_rods");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("journal_rods", "readwrite");
			const objectStore = txn.objectStore("journal_rods");
			await objectStore.put(values, id);
		};
	};
	static Banks = class Banks {
		static add = async ({ db, values }) => {
			const tx = db.transaction("banks", "readwrite");
			const id = await tx.objectStore("banks").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("banks", "readonly");
			const objectStore = tx.objectStore("banks");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("banks", "readwrite");
			const objectStore = txn.objectStore("banks");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("banks", "readwrite");
			const objectStore = txn.objectStore("banks");
			await objectStore.put(values, id);
		};
	};
	static Engines = class Engines {
		static JournalRods = class JournalRods {
			static all = async ({ db, id }) => {
				const txn = db.transaction("journal_rods", "readonly");
				const objectStore = txn.objectStore("journal_rods");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};
		static ConnectingRods = class ConnectingRods {
			static all = async ({ db, id }) => {
				const txn = db.transaction("connecting_rods", "readonly");
				const objectStore = txn.objectStore("connecting_rods");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};
		static Banks = class Banks {
			static all = async ({ db, id }) => {
				const txn = db.transaction("banks", "readonly");
				const objectStore = txn.objectStore("banks");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("engines", "readwrite");
			const objectStore = txn.objectStore("engines");
			await objectStore.put(values, id);
		};
		static all = async (db) => {
			const txn = db.transaction("engines", "readonly");
			const objectStore = txn.objectStore("engines");
			const keys = await objectStore.getAllKeys();
			return (await objectStore.getAll()).map((item, index) => {
				return { id: keys[index], ...item };
			});
		};
		static add = async ({ db, values }) => {
			const tx = db.transaction("engines", "readwrite");
			const id = await tx.objectStore("engines").add({
				starterTorque: 200,
				redLine: 6000,
				maxTurbulenceEffect: 3,
				burningRandomness: 1,
				maxBurningEfficiency: 0.85,
				...values,
			});
			return {
				id,
				starterTorque: 200,
				redLine: 6000,
				maxTurbulenceEffect: 3,
				burningRandomness: 1,
				maxBurningEfficiency: 0.85,
				...values,
			};
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("engines", "readwrite");
			const objectStore = txn.objectStore("engines");
			await objectStore.delete(id);
		};
		static exists = async ({ name, db }) => {
			const tx = db.transaction("engines", "readonly");
			const objectStore = tx.objectStore("engines");
			const index = objectStore.index("name");
			return await index.get(name);
		};
		static getById = async ({ id, db }) => {
			const tx = db.transaction("engines", "readonly");
			const objectStore = tx.objectStore("engines");
			return { ...(await objectStore.get(id)), id };
		};
	};
}

export default Database;
