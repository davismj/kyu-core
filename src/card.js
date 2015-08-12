/** 
 * Cards have four values and an optional type.
 * @class
 */
export class Card {
	constructor(values) {
		this.id = Guid();
		this.top = values.top;
		this.right = values.right;
		this.bottom = values.bottom;
		this.left = values.left;
	}
	toString() {
		return `(${this.top}, ${this.right}, ${this.bottom}, ${this.left})`;
	}
	static random() {
		let c = new Card({
			top: Math.round(Math.random() * 10) + 1,
			right: Math.round(Math.random() * 10) + 1,
			bottom: Math.round(Math.random() * 10) + 1,
			left: Math.round(Math.random() * 10) + 1
		});
		console.log(`Random card generated: ${c}.`);
		return c;
	}
}

// TODO, base 64 guid
function Guid() {
	return Guid.s4() + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4()
   		+ '-' + Guid.s4() + '-' + Guid.s4() + Guid.s4() + Guid.s4();
}
Guid.s4 = function() {
	return Math.floor((1 + Math.random()) * 0x10000)
       .toString(16)
       .substring(1);	
}