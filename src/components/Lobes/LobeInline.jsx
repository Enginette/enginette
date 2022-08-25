import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import Database from "../../database/database";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import { Link } from "react-router-dom";

const LobeDiv = styled(BankInlineDiv)`
    
`;

const LobeInline = ({ id, engineID, lobes, setLobes, database }) => {
	const baseUrl = `/engines/edit/lobe/`;
	const navigate = useNavigate();

    const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete 'Lobe ${id}'`
		);
		if (!confirmation) return;

		await Database.Intakes.remove({
			db: database,
			id,
		});
		setLobes(lobes.filter((lobe) => lobe.id !== id));
		navigate(`/engines/${engineID}/edit/lobes`);
	};

    const setNav = (e) => {
        navigate(baseUrl + id) 
    };

	return (
        <Link to={`/engines/edit/lobe/${id}`}>
            <LobeDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + id)}>
                <h1>Lobe {id}</h1>
                <Right>
                    <img src={deleteIcon} alt="Delete" onClick={handleDelete}/>
                </Right>
            </LobeDiv>
        </Link>
	);
};

export default LobeInline;
