import styled from "styled-components";
import Database from "../../database/database";

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

	text-align: left;
	padding-left: 5px;

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

	text-align: left;

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

const TuningTable1D = ({rpms, distributor, database, id, setArray, setDistributor}) => {
	const blueMax = 10;
	const greenMax = 35;
	const yellowMax = 55;
	const orangeMax = 70;

	const blue = "#1f53fd";
	const green = "#4dda6c";
	const yellow = "#c8da2a";
	const orange = "#fd9f34";
	const red = "#f84727";

	const changedInput = (e) => {

		if(e.target.value.length === 0) return;

		const setDistrib = async (index, value) => {

			let count = parseInt(distributor.rpm);
			let array = [];
			let array2 = [];
			for(let i = 0; i <= count; i += 1000) 
			{
				if(distributor.timings[i/1000] === undefined) {
					array.push([i, 30]);
					array2.push(30);
				}
				else {
					array.push([i, distributor.timings[i/1000]]);
					array2.push(distributor.timings[i/1000]);
				}
			}
			array[index] = [ array[index][0], value ];
			array2[index] = [ value ];
			setArray(array);

			await Database.Distributor.update({
				db: database,
				id,
				values: {
					...distributor,
					timings: [
						...array2,
					],
				},
			});
			setDistributor({
				...distributor,
				timings: [
					...array2,
				],
			});
		}

		if(e.target.id.startsWith("value")) {
			let s = e.target.id.substring(5);
			let number = parseInt(s);
			number /= 1000;
			setDistrib(number, parseInt(e.target.value));
		}

		e.target.style = "color: white; background-color: " + returnColor(e.target.value);
	};

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
		<TuningTable1DDiv>
			<BG>
				<Flex>
					{rpms.map((element) => {
						return(
							<TextCell key={element[0] + (Math.random() % 1000)}>
								<p 
								  key={element[0] + (Math.random() % 1000)}>
								  {element[0]}</p>
							</TextCell>
						)
					})}
				</Flex>

				<Flex>
					{rpms.map((element) => {
						let color = returnColor(element[1]);

						return(
							<Cell key={element[1] + (Math.random() % 1000)}>
								<input
									key={element[1] + (Math.random() % 1000)}
									id={"value" + element[0]}
									type="number"
									style={{"color": "white", "backgroundColor": color}} 
									defaultValue={element[1]}
									onChange={changedInput}/>
							</Cell>
						)
					})}
				</Flex>
			</BG>
		</TuningTable1DDiv>
	);
};

export { TextCell, Cell }
export default TuningTable1D;
