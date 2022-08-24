import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import Database from "../../database/database";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import { Link } from "react-router-dom";

const CrankshaftDiv = styled(BankInlineDiv)`
    
`;

const CrankshaftInline = ({ id, engineID, crankshafts, setCrankshafts, database }) => {
	const baseUrl = `/engines/edit/crankshaft/`;
	const navigate = useNavigate();

    const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete 'Crankshaft ${id}'`
		);
		if (!confirmation) return;

		await Database.Crankshafts.remove({
			db: database,
			id,
		});
		setCrankshafts(crankshafts.filter((shaft) => shaft.id !== id));
		navigate(`/engines/${engineID}/edit/crankshafts`);
	};

    const setNav = (e) => {
        navigate(baseUrl + id) 
    };

	return (
		<Link to={`/engines/edit/crankshaft/${id}`}>
			<CrankshaftDiv onClick={setNav} active={window.location.pathname === encodeURI(baseUrl + id)}>
				<h1>Crankshaft {id}</h1>
				<Right>
					<img src={deleteIcon} alt="Delete" onClick={handleDelete}/>
				</Right>
			</CrankshaftDiv>
		</Link>
		
	);
};

export default CrankshaftInline;
