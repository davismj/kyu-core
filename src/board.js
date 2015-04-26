/** 
 * A board has m x n spaces on which cards can be played.
 * @class 
 * @extends Array
 */
export class Board extends Array {

	constructor(height, width) {
		super(height * width);
		this.height = height;
		this.width = width;
		this.length = height * width;
		this.fill(null);
		this.minHand = Math.ceil(this.length/2);
	}

	empty() {
		this.fill(null);
	}
}

/** 
 * A KyuBoard is a 3 x 3 Board.
 * @class
 * @extends Board
 */
export class KyuBoard extends Board {
	constructor() {
		super(3,3);
	}
}