import styled from "styled-components";
import { Right, BankInlineDiv } from "../Banks/BankInline";
import Database from "../../database/database";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TuningTable1DDiv = styled.div`
	width: 660px;
	height: 64px;
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
	border-width: 1px 1px 2px 1px;
	border-style: solid;

	text-align: center;

	> p {
		font-weight: 500;
	}
`;

const Cell = styled.div`
	width: 65px;
	height: 22px;
	background-color: white;

	border-color: #8080808f;
	border-width: 0px 1px;
	border-style: solid;

	text-align: center;

	> input {
		width: 100%;
		height: 100%;
		border: 0px solid white;
		text-align: center;
	}

	> input:focus {
		width: 100%;
		height: 100%;
		border: 0px solid white;
		text-align: center;
	}
`;

const Flex = styled.div`
	display: flex;
	
`;

const TuningTable1D = ({ revLimit }) => {
	const blueMax = 10;
	const greenMax = 35;
	const yellowMax = 55;
	const orangeMax = 70;

	const blue = "#1f53fd";
	const green = "#4dda6c";
	const yellow = "#c8da2a";
	const orange = "#fd9f34";
	const red = "#f84727";

	return (
		<TuningTable1DDiv>
			<BG>
				<Flex>

					<TextCell>
						<p>0</p>
					</TextCell>
					
				</Flex>

				<Flex>

					<Cell>
						<input 
							onChange={(e) => {
								if(e.target.value < blueMax) {
									e.target.style = "color: white; background-color: " + blue;
									return;
								}
								if(e.target.value >= blueMax && e.target.value < greenMax) {
									e.target.style = "color: white; background-color: " + green;
									return;
								}
								if(e.target.value >= greenMax && e.target.value < yellowMax) {
									e.target.style = "color: white; background-color: " + yellow;
									return;
								}
								if(e.target.value >= yellowMax && e.target.value < orangeMax) {
									e.target.style = "color: white; background-color: " + orange;
									return;
								}
								if(e.target.value >= orangeMax) {
									e.target.style = "color: white; background-color: " + red;
									return;
								}
							}}/>
					</Cell>

				</Flex>
			</BG>
		</TuningTable1DDiv>
	);
};

export default TuningTable1D;
