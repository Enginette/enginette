import styled from "styled-components";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import Database from "../../database/database";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TuningTable1DDiv = styled.div`
	width: 660px;
	height: 400px;
	background-color: lightgray;
	border-radius: 5px;
	padding: 10px 10px;
`;

const BG = styled.div`
	width: 100%;
	height: 100%;
	background-color: #e0e0e0;
	border-radius: 5px;
`;

const TextCell = styled.div`
	width: 65px;
	height: 22px;
	background-color: white;

	border-color: #8080808f;
	border-width: 1px 1px;
	border-style: solid;

	text-align: center;
`;

const Cell = styled.div`
	width: 65px;
	height: 22px;
	background-color: white;

	border-color: #8080808f;
	border-width: 1px 1px;
	border-style: solid;

	text-align: center;

	> input {
		width: 100%;
		height: 100%;
		border: 0px solid white;
	}

	> input:focus {
		width: 100%;
		height: 100%;
		border: 0px solid clear;
	}
`;

const Flex = styled.div`
	display: flex;
	
`;

const TuningTable1D = ({ revLimit }) => {
	return (
		<TuningTable1DDiv>
			<BG>
				<Flex>

					<TextCell>
						<p>0</p>
					</TextCell>

					<TextCell>
						<p>1000</p>
					</TextCell>

					<TextCell>
						<p>2000</p>
					</TextCell>

					<TextCell>
						<p>3000</p>
					</TextCell>

					<TextCell>
						<p>4000</p>
					</TextCell>

					<TextCell>
						<p>5000</p>
					</TextCell>

					<TextCell>
						<p>6000</p>
					</TextCell>

					<TextCell>
						<p>7000</p>
					</TextCell>
					
				</Flex>

				<Flex>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

					<Cell>
						<input/>
					</Cell>

				</Flex>
			</BG>
		</TuningTable1DDiv>
	);
};

export default TuningTable1D;
