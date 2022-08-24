import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import Database from "../../database/database";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import { Link } from "react-router-dom";

const ExhaustDiv = styled(BankInlineDiv)`
    
`;

const ExhaustInline = ({ id, engineID, exhausts, setExhausts, database }) => {
	const baseUrl = `/engines/edit/exhaust/`;
	const navigate = useNavigate();

    const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete 'Crankshaft ${id}'`
		);
		if (!confirmation) return;

		await Database.Exhausts.remove({
			db: database,
			id,
		});
		setExhausts(exhausts.filter((shaft) => shaft.id !== id));
		navigate(`/engines/${engineID}/edit/exhausts`);
	};


    const setNav = (e) => {
        navigate(baseUrl + id) 
    };

	return (
        <Link to={`/engines/edit/exhaust/${id}`}>
        <ExhaustDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + id)}>
            <h1>Exhaust {id}</h1>
            <Right>
                <img src={deleteIcon} alt="Delete" onClick={handleDelete}/>
            </Right>
        </ExhaustDiv>
    </Link>
	);
};

export default ExhaustInline;
