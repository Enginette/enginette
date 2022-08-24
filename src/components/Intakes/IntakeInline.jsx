import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import Database from "../../database/database";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import { Link } from "react-router-dom";

const IntakeDiv = styled(BankInlineDiv)`
    
`;

const IntakeInline = ({ id, engineID, intakes, setIntakes, database }) => {
	const baseUrl = `/engines/edit/intake/`;
	const navigate = useNavigate();

    const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete 'Intake ${id}'`
		);
		if (!confirmation) return;

		await Database.Intakes.remove({
			db: database,
			id,
		});
		setIntakes(intakes.filter((intake) => intake.id !== id));
		navigate(`/engines/${engineID}/edit/intakes`);
	};

    const setNav = (e) => {
        navigate(baseUrl + id) 
    };

	return (
        <Link to={`/engines/edit/intake/${id}`}>
            <IntakeDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + id)}>
                <h1>Intake {id}</h1>
                <Right>
                    <img src={deleteIcon} alt="Delete" onClick={handleDelete}/>
                </Right>
            </IntakeDiv>
        </Link>
	);
};

export default IntakeInline;
