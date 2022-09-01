import styled from "styled-components";
import Database from "../../database/database";
import { TextCell, Cell } from "./1D";

const TuningTable2x1DDiv = styled.div`
	width: 320px;
	//height: 660px;
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

const FullWidthTextCell = styled(TextCell)`
	width: 100%;
`;

const Flex = styled.div`
	display: flex;
`;

const Flex2 = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Flex3 = styled.div`
	display: flex;
	flex-direction: column;
`;

const TuningTable2x1D = ({ revLimit }) => {
	const blueMax = 20;
	const greenMax = 50;
	const yellowMax = 100;
	const orangeMax = 200;

	const blue = "#1f53fd";
	const green = "#4dda6c";
	const yellow = "#c8da2a";
	const orange = "#fd9f34";
	const red = "#f84727";

	const changedInput = (e) => {
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
	}

	return (
		<TuningTable2x1DDiv>
			<BG>

				<Flex2>
					
					<Flex3>

						<FullWidthTextCell>
							<p>Intake</p>
						</FullWidthTextCell>

						<Flex>

							<TextCell>
								<p>0</p>
							</TextCell>

							<Cell>
								<input
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
								
						</Flex>
					
					</Flex3>

					<Flex3>

						<FullWidthTextCell>
							<p>Exhaust</p>
						</FullWidthTextCell>

						<Flex>

							<TextCell>
								<p>0</p>
							</TextCell>

							<Cell>
								<input
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>

						</Flex>

					</Flex3>

				</Flex2>

			</BG>
		</TuningTable2x1DDiv>
	);
};

export default TuningTable2x1D;
