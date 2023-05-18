import Database from "../database/database";

class JsonGenerator {

    static Generate = async (database, id) => {

        //#region DATABASE STUFF

        const engine = await Database.Engines.getById({
            db: database,
            id,
        });

        const banks = await Database.Engines.Banks.all({
            db: database,
            id,
        });

        const connectingRods = await Database.Engines.ConnectingRods.all({
            db: database,
            id,
        });
        
        const journalRods = await Database.Engines.JournalRods.all({
            db: database,
            id,
        });

        const crankshafts = await Database.Engines.Crankshafts.all({
            db: database,
            id,
        });

        const cylinders = await Database.Engines.Cylinders.all({
            db: database,
            id,
        });

        const cylinderHead = await Database.CylinderHeads.getById({
            db: database,
            id,
        });

        const distributor = await Database.Distributor.getById({
            db: database,
            id,
        });

        const intakes = await Database.Engines.Intakes.all({
            db: database,
            id,
        });

        const exhausts = await Database.Engines.Exhausts.all({
            db: database,
            id,
        });

        const pistons = await Database.Engines.Pistons.all({
            db: database,
            id,
        });

        // LOBES
        const intake_lobe = await Database.Lobes.getById({
            db: database,
            id: cylinderHead.intake_lobe,
        });
        const exhaust_lobe = await Database.Lobes.getById({
            db: database,
            id: cylinderHead.exhaust_lobe,
        });

        //#endregion

        const name = engine.name;
        const nodeName = engine.name.trim().replace(" ", "_");

        json = {
            "name": name,
            "nodeName": nodeName,
            
            "wireCount": cylinders.length,
            "distributor": {
                "node": {
                    "name": nodeName + "_distributor",
                    "revLimit": "5500",
                    "limiter_duration": "0.1"
                },
                "wires": [
                    ["(0.0 / 6.0) * cycle"],
                    ["(1.0 / 6.0) * cycle"]
                ]
            },

            "camshaft": {
                "node": {
                    "name": nodeName + "_camshaft_builder",
                    
                }
            }
        }

    }
}
