import styled from "styled-components";
import Database from "../../database/database";
import { TextCell, Cell } from "./1D";
import { useEffect } from "react";

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

const TuningTable2x1D = ({ database, id, setCylinderHead, cylinderHead }) => {
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
		e.target.style = "color: white; background-color: " + returnColor(e.target.value);

		if(e.target.value.length === 0) return;

		const setValue = async (index, value, intake = true) => {
			if(intake) {
				cylinderHead.intake[index] = value;

				await Database.CylinderHeads.update({
					db: database,
					id,
					values: {
						...cylinderHead,
					},
				});
				setCylinderHead({
					...cylinderHead,
				});
			}
			else {
				cylinderHead.exhaust[index] = value;

				await Database.CylinderHeads.update({
					db: database,
					id,
					values: {
						...cylinderHead,
					},
				});
				setCylinderHead({
					...cylinderHead,
				});
			}
		}

		if(e.target.id.startsWith("intake")) {
			let s = e.target.id.substring(6);
			let number = parseInt(s);
			setValue(number, parseFloat(e.target.value));
			//setDistrib(number, parseInt(e.target.value));
		}
		else if(e.target.id.startsWith("exhaust")) {
			let s = e.target.id.substring(7);
			let number = parseInt(s);
			setValue(number, parseFloat(e.target.value), false);
			//setDistrib(number, parseInt(e.target.value));
		}
	}

	const returnColor = (value) => {
		if(value < blueMax) {
			return blue;
		}
		if(value >= blueMax && value < greenMax) {
			return green;
		}
		if(value >= greenMax && value < yellowMax) {
			return yellow;
		}
		if(value >= yellowMax && value < orangeMax) {
			return orange;
		}
		if(value >= orangeMax) {
			return red;
		}
	};

	return (
		<TuningTable2x1DDiv>
			<BG>

				<Flex2>
					
					<Flex3>

						<FullWidthTextCell>
							<p>Intake</p>
						</FullWidthTextCell>

						{cylinderHead.intake.map((value, index) => {
							let id = "intake" + index;
							let color = returnColor(value);
							
							return (
								<Flex key={value + (Math.random() % 1000)}>
									<TextCell>
										<p>{index}</p>
									</TextCell>
									<Cell>
										<input
											id={id}
											defaultValue={value}
											type="number"
											style={{"color": "white", "backgroundColor": color}} 
											onChange={changedInput}/>
									</Cell>
								</Flex>
							)
						})}
					
					</Flex3>

					<Flex3>

						<FullWidthTextCell>
							<p>Exhaust</p>
						</FullWidthTextCell>

						{cylinderHead.exhaust.map((value, index) => {
							let id = "exhaust" + index;
							let color = returnColor(value);
							
							return (
								<Flex key={value + (Math.random() % 1000)}>
									<TextCell>
										<p>{index}</p>
									</TextCell>
									<Cell>
										<input
											id={id}
											defaultValue={value}
											type="number"
											style={{"color": "white", "backgroundColor": color}} 
											onChange={changedInput}/>
									</Cell>
								</Flex>
							)
						})}

					</Flex3>

				</Flex2>

			</BG>
		</TuningTable2x1DDiv>
	);
};

export default TuningTable2x1D;
