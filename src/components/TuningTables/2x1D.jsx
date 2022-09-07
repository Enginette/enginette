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

const TuningTable2x1D = ({ database, setCylinderHead, cylinderHead }) => {
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

		//set db
		console.log("a");
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
									id={"intake0"}
									defaultValue={cylinderHead.intake_0}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>1</p>
							</TextCell>
							<Cell>
								<input
									id={"intake1"}
									defaultValue={cylinderHead.intake_1}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>2</p>
							</TextCell>
							<Cell>
								<input
									id={"intake2"}
									defaultValue={cylinderHead.intake_2}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>3</p>
							</TextCell>
							<Cell>
								<input
									id={"intake3"}
									defaultValue={cylinderHead.intake_3}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>4</p>
							</TextCell>
							<Cell>
								<input
									id={"intake4"}
									defaultValue={cylinderHead.intake_4}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>5</p>
							</TextCell>
							<Cell>
								<input
									id={"intake5"}
									defaultValue={cylinderHead.intake_5}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>6</p>
							</TextCell>
							<Cell>
								<input
									id={"intake6"}
									defaultValue={cylinderHead.intake_6}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>7</p>
							</TextCell>
							<Cell>
								<input
									id={"intake7"}
									defaultValue={cylinderHead.intake_7}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>8</p>
							</TextCell>
							<Cell>
								<input
									id={"intake8"}
									defaultValue={cylinderHead.intake_8}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>9</p>
							</TextCell>
							<Cell>
								<input
									id={"intake9"}
									defaultValue={cylinderHead.intake_9}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>10</p>
							</TextCell>
							<Cell>
								<input
									id={"intake10"}
									defaultValue={cylinderHead.intake_10}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>11</p>
							</TextCell>
							<Cell>
								<input
									id={"intake11"}
									defaultValue={cylinderHead.intake_11}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>12</p>
							</TextCell>
							<Cell>
								<input
									id={"intake12"}
									defaultValue={cylinderHead.intake_12}
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
									id={"exhaust0"}
									defaultValue={cylinderHead.exhaust_0}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>1</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust1"}
									defaultValue={cylinderHead.exhaust_1}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>2</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust2"}
									defaultValue={cylinderHead.exhaust_2}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>3</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust3"}
									defaultValue={cylinderHead.exhaust_3}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>4</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust4"}
									defaultValue={cylinderHead.exhaust_4}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>5</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust5"}
									defaultValue={cylinderHead.exhaust_5}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>6</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust6"}
									defaultValue={cylinderHead.exhaust_6}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>7</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust7"}
									defaultValue={cylinderHead.exhaust_7}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>8</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust8"}
									defaultValue={cylinderHead.exhaust_8}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>9</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust9"}
									defaultValue={cylinderHead.exhaust_9}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>10</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust10"}
									defaultValue={cylinderHead.exhaust_10}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>11</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust11"}
									defaultValue={cylinderHead.exhaust_11}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}/>
							</Cell>
						</Flex>

						<Flex>
							<TextCell>
								<p>12</p>
							</TextCell>
							<Cell>
								<input
									id={"exhaust12"}
									defaultValue={cylinderHead.exhaust_12}
									style={{"color": "white", "backgroundColor": "#1f53fd"}} 
									onChange={changedInput}
									onLoad={changedInput}/>
							</Cell>
						</Flex>

					</Flex3>

				</Flex2>

			</BG>
		</TuningTable2x1DDiv>
	);
};

export default TuningTable2x1D;
