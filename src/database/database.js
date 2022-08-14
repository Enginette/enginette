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
