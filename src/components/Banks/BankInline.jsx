import styled from "styled-components";
import deleteIcon from "../../images/delete.svg";
import piston from "../../images/piston.svg";
import { Link } from "react-router-dom";
import Database from "../../database/database";

const BankInlineDiv = styled.div`
	width: 100%;
	background-color: white;
	border: 1px solid #8794b0;
	border: 1px solid ${(props) => (props.active ? "#0069ff" : "#8794B0")};
	background-color: ${(props) => (props.active ? "#0069FF" : "white")};
	border-radius: 15px;
	padding: 15px;
	display: flex;
	cursor: pointer;
	justify-content: space-between;
	align-items: center;
	transition: 0.5s;

	&:hover {
		background-color: #0069ff;
		border: 1px solid #0069ff;
		> h1 {
			color: white;
		}
		p {
			color: white;
		}
	}

	> h1 {
		font-weight: 500;
		font-size: 20px;
		color: ${(props) => (props.active ? "white" : "#080B2D")};
		transition: 0.5s;
	}
`;

const Right = styled.div`
	display: flex;
	gap: 8px;
	> img {
		height: 25px;
		width: 25px;
		cursor: pointer;
		z-index: 10;
	}
	> div {
		position: relative;
		> p {
			position: absolute;
			transition: 0.5s;
			bottom: 0;
			right: 0;
			font-weight: 500;
			font-size: 13px;
			cursor: pointer;
			color: ${(props) => (props.active ? "white" : "#031b4e")};
		}
	}
`;

const BankInline = ({ name, id, banks, setBanks, database }) => {
	const handleDelete = async (e) => {
		e.preventDefault();
		const confirmation = window.confirm(
			`Are you sure you want to delete '${name}'`
		);
		if (!confirmation) return;
		await Database.Banks.remove({
			db: database,
			id,
		});
		setBanks(banks.filter((databaseBank) => databaseBank.id !== id));
	};
	return (
		<Link to={`/engines/edit/banks/${id}`}>
			<BankInlineDiv
				active={
					window.location.pathname === `/engines/edit/banks/${id}`
				}
			>
				<h1>{name}</h1>
				<Right
					active={
						window.location.pathname === `/engines/edit/banks/${id}`
					}
				>
					<div>
						<img src={piston} alt="P" />
						<p>4</p>
					</div>
					<img src={deleteIcon} alt="Delete" onClick={handleDelete} />
				</Right>
			</BankInlineDiv>
		</Link>
	);
};

export { Right, BankInlineDiv };
export default BankInline;
