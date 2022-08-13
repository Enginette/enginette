class Database {
	static initiate = (db) => {
		const engines = db.createObjectStore("engines", {
			autoIncrement: true,
		});
		engines.createIndex("name", "name", { unique: true });
	};
	static Engines = class Engines {
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
			return await objectStore.get(id);
		};
	};
}

export default Database;
