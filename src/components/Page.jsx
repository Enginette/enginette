import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DB from "../database/db";

const Page = (props) => {
	let { id } = useParams();

    useEffect(() => {
        let prepend = "";
        if(props.prependEngine) {
            prepend = DB.GetEngine(id).name;
        }
        else if(props.prependTransmission) {
            prepend = DB.GetTransmission(id).name;
        }
        else if(props.prependVehicle) {
            prepend = DB.GetVehicle(id).name;
        }
        document.title = "Enginette - " + prepend + props.title || "Enginette";
    }, [props.title]);
    return props.children;
};

export default Page;