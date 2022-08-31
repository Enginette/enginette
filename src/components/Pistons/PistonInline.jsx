import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import Database from "../../database/database";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import { Link } from "react-router-dom";

const PistonDiv = styled(BankInlineDiv)`
    
`;

const PistonInline = ({ id, engineID, pistons, setPistons, database }) => {
	const baseUrl = `/engines/edit/piston/`;
	const navigate = useNavigate();

    const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete 'Piston ${id}'`
		);
		if (!confirmation) return;

		await Database.Pistons.remove({
			db: database,
			id,
		});
		setPistons(pistons.filter((piston) => piston.id !== id));
		navigate(`/engines/${engineID}/edit/pistons`);
	};

    const setNav = (e) => {
        navigate(baseUrl + id) 
    };

	return (
        <Link to={`/engines/edit/piston/${id}`}>
            <PistonDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + id)}>
                <h1>Piston {id}</h1>
                <Right>
                    <img src={deleteIcon} alt="Delete" onClick={handleDelete}/>
                </Right>
            </PistonDiv>
        </Link>
	);
};

export default PistonInline;
