import styled from "styled-components";
import { useState, useEffect } from "react";
import piston from "../../images/piston.svg";
import Database from "../../database/database";
import deleteIcon from "../../images/delete.svg";
import { Right } from "../Banks/BankInline";

const CylinderDiv = styled.div`
	border: 1px solid #8794B0;
    border-radius: 20px;
    padding: 20px;
    width: 244px;
    height: 371px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Top = styled.div`
    width: 100%;
    height: 100px;
    justify-content: center;
    display: flex;

    > h1 {
        position: absolute;
        margin-left: 50px;
        margin-top: 65px;
        font-weight: 500;
        font-size: 36px;
        color: #031B4E;
    }

    > img {
        width: 100px;
        height: 100px;
    }
`;

const Input = styled.div`
    width: 100%;
    > p {
        box-shadow: 0px 0px 3px rgba(100, 100, 111, 0.2);
        background-color: white;
        border-radius: 20px;
        padding: 1px 5px;
        color: #031B4E;
        font-size: 12px;
        font-weight: 400;
        
        position: absolute;
        margin-top: -10px;
        margin-left: 10px;
    }
    > select {
        height: 28px;
        border-radius: 20px;
        border: 1px solid #8794B0;
        width: 100%;
    }
`;

const Cylinder = ({id, engineID, cylinders, setCylinders, database}) => {
    id = parseInt(id);

    const [cylinder, setCylinder] = useState([]);

	const [journalRods, setJournalRods] = useState([]);
	const [connectingRods, setConnectingRods] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const [exhausts, setExhausts] = useState([]);

    const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete Cylinder '${id}'`
		);
		if (!confirmation) return;
		await Database.Cylinders.remove({
			db: database,
			id,
		});
		setCylinders(cylinders.filter((databaseBank) => databaseBank.id !== id));
	};

    useEffect(() => {
		if (!database) return;
		const loadRodsAsync = async () => {

            //load cylinder
			const cylinder = await Database.Cylinders.getById({
				db: database,
				id,
			});
			if (!cylinder) return setCylinder(undefined);
			setCylinder(cylinder);

			//load connecting rods from database
			const connectingRods = await Database.Engines.ConnectingRods.all({
				db: database,
				id: engineID,
			});
			setConnectingRods(connectingRods);

			//load journal rods from database
			const journalRods = await Database.Engines.JournalRods.all({
				db: database,
				id: engineID,
			});
			setJournalRods(journalRods);

            //load intakes from database
			const intakes = await Database.Engines.Intakes.all({
				db: database,
				id: engineID,
			});
			setIntakes(intakes);

            //load exhausts from database
			const exhausts = await Database.Engines.Exhausts.all({
				db: database,
				id: engineID,
			});
			setExhausts(exhausts);
		};

		loadRodsAsync();
	}, [database]);

	return (
		<CylinderDiv>
            <Top>
                <img src={piston} alt="P" />
                <h1>#{id}</h1>
            </Top>

            <Input>
                <p>Connecting Rod</p>
                <select>
                    {connectingRods.map((rod) => (
						<option>Connecting Rod {rod.id}</option>
					))}
                </select>
            </Input>

            <Input>
                <p>Journal Rod</p>
                <select>
                    {journalRods.map((rod) => (
						<option>Journal Rod {rod.id}</option>
					))}
                </select>
            </Input>

            <Input>
                <p>Intake</p>
                <select
                    defaultValue={cylinder.intake}
                    autoFocus
                    key={cylinder.intake}
                    onChange={async (e) => {
                        console.log("changing intake");
                        if (e.target.value.length === 0) return;
                        await Database.Cylinders.update({
                            db: database,
                            id,
                            values: {
                                ...cylinder,
                                intake: e.target.value,
                            },
                        });
                        setCylinder({
                            ...cylinder,
                            intake: e.target.value,
                        });
                    }}>
                    {
                    intakes.map((intake) => (
						<option value={`Intake ${intake.id}`} >Intake {intake.id}</option>
					))}
                </select>
            </Input>

            <Input>
                <p>Exhaust</p>
                <select>
                    {exhausts.map((exhaust) => (
						<option>Exhaust {exhaust.id}</option>
					))}
                </select>
            </Input>

            <Input>
                <p>Piston</p>
                <select>
                    <option>Not Yet Implemented</option>
                </select>
            </Input>
            <img
                src={deleteIcon}
                alt="Delete"
                style={{ transform: "translateX(4px)" }}
                onClick={handleDelete}
            />
           
		</CylinderDiv>
	);
};

export default Cylinder;
