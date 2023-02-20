import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../images/delete.svg";
import Database from "../../database/database";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import { Link } from "react-router-dom";

const IntakeDiv = styled(BankInlineDiv)`
    svg {
		fill: ${(props) => (props.active ? "#C7D5ED" : "#e9515b")};
	}
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
					<svg
						viewBox="0 0 30 30"
						xmlns="http://www.w3.org/2000/svg"
						onClick={handleDelete}
					>
						<path d="M23.703 3.59425H19.0332C18.8003 1.57428 17.0817 0 15.0002 0C12.9188 0 11.2004 1.57422 10.9675 3.59425H6.29747C4.40765 3.59425 2.87036 5.13196 2.87036 7.02171V7.19759C2.87036 8.64171 3.76957 9.87777 5.03629 10.3814V26.5725C5.03629 28.4624 6.57376 30 8.46346 30H21.537C23.4269 30 24.9642 28.4622 24.9642 26.5725V10.3815C26.2308 9.87777 27.1301 8.64171 27.1301 7.19765V7.02178C27.1301 5.13197 25.5927 3.59425 23.703 3.59425ZM15.0002 1.62546C16.184 1.62546 17.1722 2.47398 17.3909 3.59425H12.61C12.8286 2.47392 13.8168 1.62546 15.0002 1.62546ZM23.3387 26.5725C23.3387 27.5661 22.5303 28.3746 21.537 28.3746H8.46338C7.4701 28.3746 6.66169 27.5661 6.66169 26.5725V10.625H23.3387V26.5725ZM25.5047 7.19759C25.5047 8.19117 24.6962 8.99964 23.7029 8.99964H6.29747C5.30419 8.99964 4.49578 8.19117 4.49578 7.19759V7.02171C4.49578 6.02812 5.30419 5.21966 6.29747 5.21966H23.703C24.6963 5.21966 25.5047 6.02812 25.5047 7.02171V7.19759Z" />
						<path d="M10.6425 26.2959C11.0914 26.2959 11.4552 25.9318 11.4552 25.4832V16.3324C11.4552 15.8836 11.0913 15.5196 10.6425 15.5196C10.1937 15.5196 9.82983 15.8836 9.82983 16.3324V25.4832C9.82977 25.932 10.1937 26.2959 10.6425 26.2959Z" />
						<path d="M15.0004 26.2959C15.4492 26.2959 15.8131 25.9318 15.8131 25.4832V16.3324C15.8131 15.8836 15.4492 15.5196 15.0004 15.5196C14.5516 15.5196 14.1877 15.8836 14.1877 16.3324V25.4832C14.1877 25.932 14.5516 26.2959 15.0004 26.2959Z" />
						<path d="M19.3577 26.2959C19.8065 26.2959 20.1704 25.9318 20.1704 25.4832V16.3324C20.1704 15.8836 19.8065 15.5196 19.3577 15.5196C18.9087 15.5196 18.545 15.8836 18.545 16.3324V25.4832C18.5448 25.932 18.9089 26.2959 19.3577 26.2959Z" />
					</svg>
                </Right>
            </IntakeDiv>
        </Link>
	);
};

export default IntakeInline;
