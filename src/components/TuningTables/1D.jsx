import styled from "styled-components";
import Database from "../../database/database";

const TuningTable1DDiv = styled.div`
	/* height: 64px; */
	background-color: #3D3F45;
	border-radius: 10px;
	padding: 10px 10px;
	color: #BEC2C8;
`;

const BG = styled.div`
	width: 100%;
	height: 100%;
	border-radius:105px;
`;

const TextCell = styled.div`
	width: 65px;
	height: 22px;
	background-color: #52555a;

	/* border-color: #8080808f; */
	/* border-width: 1px 1px 2px 1px; */
	/* border-style: solid; */

	text-align: left;
	padding-left: 5px;

	> p {
		font-weight: 500;
	}
`;

const Cell = styled.div`
	width: 65px;
	height: 22px;
	background-color: #52555a;

	/* border-color: #8080808f; */
	/* border-width: 0px 1px; */
	/* border-style: solid; */

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

	const blue = "#65c0f2";
	const green = "#a0f265";
	const yellow = "#f2ce65";
	const orange = "#f4844d";
	const red = "#e9515b";

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
					{rpms.map((element, index) => {
						let styles = {};
						if(index == 0)
							styles = {"borderRadius": "10px 0px 0px 0px"};
						else if(index == rpms.length-1)
							styles = {"borderRadius": "0px 10px 0px 0px"};

						return(
							<TextCell style={styles} key={element[0] + (Math.random() % 1000)}>
								<p 
								  key={element[0] + (Math.random() % 1000)}>
								  {element[0]}</p>
							</TextCell>
						)
					})}
				</Flex>

				<Flex>
					{rpms.map((element, index) => {
						let color = returnColor(element[1]);
						let styles = {};
						if(index == 0)
							styles = {"borderRadius": "0px 0px 0px 10px"};
						else if(index == rpms.length-1)
							styles = {"borderRadius": "0px 0px 10px 0px"};

						console.log(styles);
						return(
							<Cell style={styles} key={element[1] + (Math.random() % 1000)}>
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
