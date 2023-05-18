
class DB {
    static Thing = class Thing {
        static TypeCallback = (type, engineCallback, transmissionCallback, vehicleCallback) => {
            switch (type.toLowerCase()) {
                case "engine":
                    return engineCallback();
                case "transmission":
                    return transmissionCallback();
                case "vehicle":
                    return vehicleCallback();    
            
                default:
                    window.alert("Invalid type!\nNOTE: If you are not the developer, you should contact the devs because this shouldn't happen!");
                    break;
            }
        }

        static Exists = ({type, name}) => {
            return this.GetThing({type, name}) !== undefined;
        }

        static GetThing = ({type, name}) => {
            return this.TypeCallback(type, () => DB.GetEngine(name), () => DB.GetTransmission(name), () => DB.GetVehicle(name));
        }

        static Set = ({type, name, value}) => {
            let db = DB.GetDB();
            let id = DB.ID(name);
            this.TypeCallback(type, () => {
                // engine
                db.engines[id] = value;
            }, () => {
                // transmission
                db.transmissions[id] = value;
            }, () => {
                // vehicle
                db.vehicles[id] = value;
            })
            DB.SetDB(db);
        }

        // eval(`engine.${path} = ${value};`);

        //! Vulnerable but eh...
        static ChangeParam = ({type, name, path, value}) => {
            
            if(path === "name") {
                let db = DB.GetDB();
                let oldID = DB.ID(name);
                let newID = DB.ID(value);
                let newName = value;
                
                debugger;
                this.TypeCallback(type, () => {
                    db.engines[newID] = db.engines[oldID];
                    db.engines[newID].name = newName;
                    db.engines[oldID] = undefined;
                }, () => {
                    db.transmissions[newID] = db.transmissions[oldID];
                    db.transmissions[newID].name = newName;
                    db.transmissions[oldID] = undefined;
                }, () => {
                    db.vehicles[newID] = db.vehicles[oldID];
                    db.vehicles[newID].name = newName;
                    db.vehicles[oldID] = undefined;                    
                });
                DB.SetDB(db);

                let oldLocation = window.location.toString();
                let newLocation = oldLocation.replace(name, value);
                window.location = newLocation;
                return;
            }

            let thing = this.GetThing({type, name});
            console.log({type, name, path, value});
            console.log(thing);
            console.log(this.GetThing({type, name}));
            eval(`thing.${path} = ${value}\n`);
            this.Set({type, name, value: thing})
        }

        static Add = ({type, name}) => {
            this.TypeCallback(type, () => {
                // engine
                DB.AddEngine(name);
            }, () => {
                // transmission
                DB.AddTransmission(name);
            }, () => {
                // vehicle
                DB.AddVehicle(name);
            })
        }

        static Delete = ({type, name}) => {
            this.TypeCallback(type, () => {
                // engine
                DB.DeleteEngine(name);
            }, () => {
                // transmission
                DB.DeleteTransmission(name);
            }, () => {
                // vehicle
                DB.DeleteVehicle(name);
            })
        }
    }

    static DATABASE_TEMPLATE = {
        type: "enginette",
        engines: {},
        transmissions: {},
        vehicles: {}
    }

    static ENGINE_TEMPLATE = {
        starter_torque: 70,
        starter_speed: 500,
        redline: 8000,
        throttle_gamma: 2.0,
        
        sound: {
            hf_gain: 0.01,
            noise: 1.0,
            jitter: 0.1,
        },

        main: {
            stroke: 86,
            bore: 86,
            rod_length: 120,
            rod_mass: 50,
            compression_height: 25.4,
            crank_mass: 10,
            flywheel_mass: 10,
            flywheel_radius: 100,
            piston_mass: 50,
            piston_blowby: 0.0,
        },

        intake: {
            plenum_volume: 1.325,
            plenum_cross_section_area: 20.0,
            intake_flow_rate: 3000,
            runner_flow_rate: 400,
            runner_length: 16,
            idle_flow_rate: 0,
            idle_throttle_plate_position: 0.999,
        },

        exhaust: {
            exhaust_length: 20,
        },

        camshaft: {
            lobe_separation: 114,
            camshaft_base_radius: 0.5,
            
            intake_lobe_center: 90,
            exhaust_lobe_center: 112,

            intake: {
                lift: 551,
                duration: 234,
                gamma: 1.1,
                steps: 512,
            },

            exhaust: {
                lift: 551,
                duration: 235,
                gamma: 1.1,
                steps: 512,
            },
        },

        head: {
            chamber_volume: 300,
            intake_runner_volume: 149.6,
            intake_runner_cross_section: [1.75, 1.75],
            exhaust_runner_volume: 50.0,
            exhaust_runner_cross_section: [1.75, 1.75],

            intake_flow: [0,58,103,156,214,249,268,280,280,281],
            exhaust_flow: [0,37,72,113,160,196,222,235,245,246],
        },

        distributor: {
            firing_order: [0],
            timing_curve: [
                [0,18],
                [1000,40],
                [2000,40],
                [3000,40],
                [4000,40],
                [5000,40],
                [6000,40],
                [7000,40],
                [8000,40],
                [9000,40],
            ],
            rev_limit: 9000,
            limiter_duration: 0.1,
        },
        
        banks: [
            { cylinders: 4, bank_angle: 0 }
        ],

        fuel: {
            molecular_mass: 100,
            energy_density: 48.1,
            density: 0.755,
            molecular_afr: 25 / 2.0,
            max_burning_efficiency: 0.8,
            burning_efficiency_randomness: 0.5,
            low_efficiency_attenuation: 0.6,
            max_turbulence_effect: 2,
            max_dilution_effect: 10
        },

        simulation_frequency: 10000,
    }
    
    static TRANSMISSION_TEMPLATE = {
        gears: [2.8, 2.29, 1.93, 1.583, 1.375, 1.19],
        max_clutch_torque: 1000
    }

    static VEHICLE_TEMPLATE = {
        mass: 798,
        drag_coefficient: 0.9,
        cross_sectional_area: [72, 36],
        
        diff_ratio: 4.10,
        tire_radius: 9,
        rolling_resistance: 200,
    }

    static Init = () => {
        if(!window.localStorage) {
            alert("Please allow localStorage!");
            window.location.reload();
            return null;
        }

        if(window.localStorage.getItem("database") == null) {
            let db = window.localStorage.setItem("database", JSON.stringify(this.DATABASE_TEMPLATE));
            return db;
        }
    }

    static SetDB = (db) => {
        let data = db
        if(typeof(data) == "object")
            data = JSON.stringify(data);
        return window.localStorage.setItem("database", data);
    }

    static GetDB = () => {
        return JSON.parse(window.localStorage.getItem("database"));
    }

    static GetCount = () => {
        return {
            engines: Object.keys(this.GetDB().engines).length,
            transmissions: Object.keys(this.GetDB().transmissions).length,
            vehicles: Object.keys(this.GetDB().vehicles).length,
        }
    }

    static ID = (name) => {
        return name.replaceAll(" ", "_").toLowerCase();
    }

    static AddEngine = (name) => {
        let db = this.GetDB();
        db.engines[this.ID(name)] = this.ENGINE_TEMPLATE;
        db.engines[this.ID(name)].name = name;
        this.SetDB(db);
    }

    static AddTransmission = (name) => {
        let db = this.GetDB();
        db.transmissions[this.ID(name)] = this.TRANSMISSION_TEMPLATE;
        db.transmissions[this.ID(name)].name = name;
        this.SetDB(db);
    }

    static AddVehicle = (name) => {
        let db = this.GetDB();
        db.vehicles[this.ID(name)] = this.VEHICLE_TEMPLATE;
        db.vehicles[this.ID(name)].name = name;
        this.SetDB(db);
    }

    static DeleteEngine = (name) => {
        let db = this.GetDB();
        db.engines[this.ID(name)] = undefined;
        this.SetDB(db);
    }

    static DeleteTransmission = (name) => {
        let db = this.GetDB();
        db.transmissions[this.ID(name)] = undefined;
        this.SetDB(db);
    }

    static DeleteVehicle = (name) => {
        let db = this.GetDB();
        db.vehicles[this.ID(name)] = undefined;
        this.SetDB(db);
    }

    static GetEngine = (name) => {
        return this.GetDB().engines[this.ID(name)];
    }

    static GetTransmission = (name) => {
        return this.GetDB().transmissions[this.ID(name)];
    }

    static GetVehicle = (name) => {
        return this.GetDB().vehicles[this.ID(name)];
    }

    static GetEngines = () => {
        let db = this.GetDB();
        let returning = [];
        Object.keys(db.engines).forEach((engine) => {
            returning.push(db.engines[engine].name);
        })

        return returning;
    }

    static GetTransmissions = () => {
        let db = this.GetDB();
        let returning = [];
        Object.keys(db.transmissions).forEach((transmission) => {
            returning.push(db.transmissions[transmission].name);
        })

        return returning;
    }

    static GetVehicles = () => {
        let db = this.GetDB();
        let returning = [];
        Object.keys(db.vehicles).forEach((vehicle) => {
            returning.push(db.vehicles[vehicle].name);
        })

        return returning;
    }

    static PotentialUpgrade = (item, key, data) => {
        // If key not found, add it and set the things inside of it
        if(!Object.keys(item).find((value) => value === key)) {
            item[key] = data;
        }
        // Else, Check each key of `item` and if that key exists in the `item`,
        // leave it. Otherwise add it.
        else {
            Object.keys(data).forEach((value) => {
                if(item[key][value] === undefined) {
                    item[key][value] = data[value];
                    // console.log(`${value} = ${data[value]}`);
                }
            })
        }
    }
}

export default DB;
