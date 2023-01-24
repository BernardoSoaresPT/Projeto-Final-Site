export class Generator {
	constructor(name, cost = 1,costMultiplyer = 1, production = 1, n=0) {
		this.name = name;
		this.cost = cost;
		this.costMultiplyer = costMultiplyer;
		this.output = production;
		this.n = n;
	}
	generate() {
		if(this.n==0){
			console.log("check");
			return 0;
		}
		console.log("check2");
		let resources = this.output * this.n +1;
		return resources;
	}
}