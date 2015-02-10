/** 
 * A board has m x n spaces on which cards can be played.
 * @class 
 * @extends Array
 */
export class Board extends Array {
	constructor(height, width) {
		super(height * width);
		this.minHand = Math.ceil(this.length/2);
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