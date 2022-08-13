class Engine {
	constructor({
		name,
		starterTorque = 200,
		redLine = 6000,
		maxTurbulenceEffect = 3,
		burningRandomness = 1,
		maxBurningEfficiency = 0.85,
	}) {
		this.name = name;
		this.starterTorque = starterTorque;
		this.redLine = redLine;
		this.maxTurbulenceEffect = maxTurbulenceEffect;
		this.burningRandomness = burningRandomness;
		this.maxBurningEfficiency = maxBurningEfficiency;
	}

	copy = () => {
		return new Engine({
			name: this.name,
			starterTorque: this.starterTorque,
			redLine: this.redLine,
			maxTurbulenceEffect: this.maxTurbulenceEffect,
			burningRandomness: this.burningRandomness,
			maxBurningEfficiency: this.maxBurningEfficiency,
		});
	};

	toJSON = () => {
		return {
			name: this.name,
			starterTorque: this.starterTorque,
			redLine: this.redLine,
			maxTurbulenceEffect: this.maxTurbulenceEffect,
			burningRandomness: this.burningRandomness,
			maxBurningEfficiency: this.maxBurningEfficiency,
		};
	};
}

export default Engine;
