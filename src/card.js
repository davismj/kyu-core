import uuid from './uuid';

/** 
 * Cards have four values and an optional type.
 * @class
 */
export class Card {

	// to be used whenever creating a new card object
	constructor(card) {
		this.id = card.id || uuid();
		this.top = card.top;
		this.right = card.right;
		this.bottom = card.bottom;
		this.left = card.left;
	}
	toString() {
		return `(${this.top}, ${this.right}, ${this.bottom}, ${this.left})`;
	}

	// to be used whenever generating a new card
	static new(values = {}) {
		return new Card({
			id: uuid(),
			top: values.top,
			right: values.right,
			bottom: values.bottom,
			left: values.left
		});
	}

	// card side from 0-9 
	// max card value 18
	static random() {
		var arr = [0,0,0,0],
			total = 0;
		while (total < 18) {
			let idx = Math.round(Math.random()*10) % 4
			if (arr[idx] < 9) {
				arr[idx] += 1;
				total += 1;
			}
		}
		return Card.new({
			top: arr[0],
			right: arr[1],
			bottom: arr[2],
			left: arr[3]
		});
	}
}