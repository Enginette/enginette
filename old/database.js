class Database {
	static initiate = (db) => {
		const engines = db.createObjectStore("engines", {
			autoIncrement: true,
		});
		engines.createIndex("name", "name", { unique: true });

		// Cylinder heads
		const heads = db.createObjectStore("cylinder_heads", {
			autoIncrement: true,
		});
		heads.createIndex("engine", "engine");

		//Banks
		const banks = db.createObjectStore("banks", {
			autoIncrement: true,
		});
		banks.createIndex("engine", "engine");

		//Connecting rods
		const connectingRods = db.createObjectStore("connecting_rods", {
			autoIncrement: true,
		});
		connectingRods.createIndex("engine", "engine");

		//Journal rods
		const journalRods = db.createObjectStore("journal_rods", {
			autoIncrement: true,
		});
		journalRods.createIndex("engine", "engine");

		//Crankshafts
		const crankshafts = db.createObjectStore("crankshafts", {
			autoIncrement: true,
		});
		crankshafts.createIndex("engine", "engine");

		//Exhausts
		const exhausts = db.createObjectStore("exhausts", {
			autoIncrement: true,
		});
		exhausts.createIndex("engine", "engine");

		//Intakes
		const intakes = db.createObjectStore("intakes", {
			autoIncrement: true,
		});
		intakes.createIndex("engine", "engine");

		//Lobes
		const lobes = db.createObjectStore("lobes", {
			autoIncrement: true,
		});
		lobes.createIndex("engine", "engine");

		//Distributor
		const distributor = db.createObjectStore("distributor", {
			autoIncrement: true,
		});
		distributor.createIndex("engine", "engine");

		//Cylinders
		const cylinders = db.createObjectStore("cylinders", {
			autoIncrement: true,
		});
		cylinders.createIndex("engine", "engine");

		//Pistons
		const pistons = db.createObjectStore("pistons", {
			autoIncrement: true,
		});
		pistons.createIndex("engine", "engine");
	};

	static clearAll = async (db) => {
		for (let i = 0; i < db.objectStoreNames.length; i++) {
			const objectStore = db.objectStoreNames[i];

			/*
			await db.deleteObjectStore(objectStore);
			const store = db.createObjectStore(objectStore, {
				autoIncrement: true,
			});
			if(objectStore === "engines")
				store.createIndex("name", "name", { unique: true });
			else
				store.createIndex("engine", "engine");
			*/

			const tx = db.transaction(objectStore, "readwrite");
			await tx.objectStore(objectStore).clear();
		}
	}

	//Cylinder heads
	static CylinderHeads = class CylinderHeads {
		static add = async ({ db, values }) => {
			const tx = db.transaction("cylinder_heads", "readwrite");
			const id = await tx.objectStore("cylinder_heads").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("cylinder_heads", "readonly");
			const objectStore = tx.objectStore("cylinder_heads");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("cylinder_heads", "readwrite");
			const objectStore = txn.objectStore("cylinder_heads");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("cylinder_heads", "readwrite");
			const objectStore = txn.objectStore("cylinder_heads");
			await objectStore.put(values, id);
		};
	};

	//Connecting rods
	static ConnectingRods = class ConnectingRods {
		static add = async ({ db, values }) => {
			const tx = db.transaction("connecting_rods", "readwrite");
			const id = await tx.objectStore("connecting_rods").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("connecting_rods", "readonly");
			const objectStore = tx.objectStore("connecting_rods");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("connecting_rods", "readwrite");
			const objectStore = txn.objectStore("connecting_rods");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("connecting_rods", "readwrite");
			const objectStore = txn.objectStore("connecting_rods");
			await objectStore.put(values, id);
		};
	};

	//Journal rods
	static JournalRods = class JournalRods {
		static add = async ({ db, values }) => {
			const tx = db.transaction("journal_rods", "readwrite");
			const id = await tx.objectStore("journal_rods").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("journal_rods", "readonly");
			const objectStore = tx.objectStore("journal_rods");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("journal_rods", "readwrite");
			const objectStore = txn.objectStore("journal_rods");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("journal_rods", "readwrite");
			const objectStore = txn.objectStore("journal_rods");
			await objectStore.put(values, id);
		};
	};

	//Crankshafts
	static Crankshafts = class Crankshafts {
		static add = async ({ db, values }) => {
			const tx = db.transaction("crankshafts", "readwrite");
			const id = await tx.objectStore("crankshafts").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("crankshafts", "readonly");
			const objectStore = tx.objectStore("crankshafts");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("crankshafts", "readwrite");
			const objectStore = txn.objectStore("crankshafts");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("crankshafts", "readwrite");
			const objectStore = txn.objectStore("crankshafts");
			await objectStore.put(values, id);
		};
	};

	//Intakes
	static Intakes = class Intakes {
		static add = async ({ db, values }) => {
			const tx = db.transaction("intakes", "readwrite");
			const id = await tx.objectStore("intakes").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("intakes", "readonly");
			const objectStore = tx.objectStore("intakes");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("intakes", "readwrite");
			const objectStore = txn.objectStore("intakes");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("intakes", "readwrite");
			const objectStore = txn.objectStore("intakes");
			await objectStore.put(values, id);
		};
	};

	//Exhausts
	static Exhausts = class Exhausts {
		static add = async ({ db, values }) => {
			const tx = db.transaction("exhausts", "readwrite");
			const id = await tx.objectStore("exhausts").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("exhausts", "readonly");
			const objectStore = tx.objectStore("exhausts");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("exhausts", "readwrite");
			const objectStore = txn.objectStore("exhausts");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("exhausts", "readwrite");
			const objectStore = txn.objectStore("exhausts");
			await objectStore.put(values, id);
		};
	};

	//Lobes
	static Lobes = class Lobes {
		static add = async ({ db, values }) => {
			const tx = db.transaction("lobes", "readwrite");
			const id = await tx.objectStore("lobes").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("lobes", "readonly");
			const objectStore = tx.objectStore("lobes");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("lobes", "readwrite");
			const objectStore = txn.objectStore("lobes");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("lobes", "readwrite");
			const objectStore = txn.objectStore("lobes");
			await objectStore.put(values, id);
		};
	};

	//Distributor
	static Distributor = class Distributor {
		static add = async ({ db, values }) => {
			const tx = db.transaction("distributor", "readwrite");
			const id = await tx.objectStore("distributor").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("distributor", "readonly");
			const objectStore = tx.objectStore("distributor");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("distributor", "readwrite");
			const objectStore = txn.objectStore("distributor");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("distributor", "readwrite");
			const objectStore = txn.objectStore("distributor");
			await objectStore.put(values, id);
		};
	};

	//Cylinders
	static Cylinders = class Cylinders {
		static add = async ({ db, values }) => {
			const tx = db.transaction("cylinders", "readwrite");
			const id = await tx.objectStore("cylinders").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("cylinders", "readonly");
			const objectStore = tx.objectStore("cylinders");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("cylinders", "readwrite");
			const objectStore = txn.objectStore("cylinders");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("cylinders", "readwrite");
			const objectStore = txn.objectStore("cylinders");
			await objectStore.put(values, id);
		};
	};

	//Pistons
	static Pistons = class Pistons {
		static add = async ({ db, values }) => {
			const tx = db.transaction("pistons", "readwrite");
			const id = await tx.objectStore("pistons").add(values);

			return { ...values, id };
		};
		static getById = async ({ db, id }) => {
			const tx = db.transaction("pistons", "readonly");
			const objectStore = tx.objectStore("pistons");
			return { ...(await objectStore.get(id)), id };
		};
		static remove = async ({ db, id }) => {
			const txn = db.transaction("pistons", "readwrite");
			const objectStore = txn.objectStore("pistons");
			await objectStore.delete(id);
		};
		static update = async ({ db, id, values }) => {
			const txn = db.transaction("pistons", "readwrite");
			const objectStore = txn.objectStore("pistons");
			await objectStore.put(values, id);
		};
	};

	//Banks
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

	//Engines
	static Engines = class Engines {
		//Cylinder heads
		static CylinderHeads = class CylinderHeads {
			static all = async ({ db, id }) => {
				const txn = db.transaction("cylinder_heads", "readonly");
				const objectStore = txn.objectStore("cylinder_heads");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { ...item, id: keys[index] };
				});
			};
		};
		
		//Journal rods
		static JournalRods = class JournalRods {
			static all = async ({ db, id }) => {
				const txn = db.transaction("journal_rods", "readonly");
				const objectStore = txn.objectStore("journal_rods");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { ...item, id: keys[index] };
				});
			};
		};

		//Connecting rods
		static ConnectingRods = class ConnectingRods {
			static all = async ({ db, id }) => {
				const txn = db.transaction("connecting_rods", "readonly");
				const objectStore = txn.objectStore("connecting_rods");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { ...item, id: keys[index] };
				});
			};
		};

		//Banks
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

		//Crankshafts
		static Crankshafts = class Crankshafts {
			static all = async ({ db, id }) => {
				const txn = db.transaction("crankshafts", "readonly");
				const objectStore = txn.objectStore("crankshafts");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};

		//Exhausts
		static Exhausts = class Exhausts {
			static all = async ({ db, id }) => {
				const txn = db.transaction("exhausts", "readonly");
				const objectStore = txn.objectStore("exhausts");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};

		//Intakes
		static Intakes = class Intakes {
			static all = async ({ db, id }) => {
				const txn = db.transaction("intakes", "readonly");
				const objectStore = txn.objectStore("intakes");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};

		//Lobes
		static Lobes = class Lobes {
			static all = async ({ db, id }) => {
				const txn = db.transaction("lobes", "readonly");
				const objectStore = txn.objectStore("lobes");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};

		//Distributor
		static Distributor = class Distributor {
			static all = async ({ db, id }) => {
				const txn = db.transaction("distributor", "readonly");
				const objectStore = txn.objectStore("distributor");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};

		//Pistons
		static Pistons = class Pistons {
			static all = async ({ db, id }) => {
				const txn = db.transaction("pistons", "readonly");
				const objectStore = txn.objectStore("pistons");
				const index = objectStore.index("engine");
				const keys = await index.getAllKeys(id);
				return (await index.getAll(id)).map((item, index) => {
					return { id: keys[index], ...item };
				});
			};
		};

		//Cylinders
		static Cylinders = class Cylinders {
			static all = async ({ db, id }) => {
				const txn = db.transaction("cylinders", "readonly");
				const objectStore = txn.objectStore("cylinders");
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
