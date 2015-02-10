import { KyuBoard } from "./board";

/** 
 * A game has two players and a Kyu board.
 * @class 
 */
export class Game {
	constructor(player1, player2) {
		this.players = new Set();
		this.hands = new Map();
		this.board = new KyuBoard();
		this.isStarted = false;
		this.turn = null;
	}
	
	/** 
	 * Assigns the current turn and flags the game for start.
	 * @method start
	 * @argument {Number} [turn] - The first player's turn, either 0 or 1. If
	 * 	no value provided, picks at random. 
	 */
	start(turn = Date.now() % 2) {
		
		// verify that turn is valid
		if (turn !== 0 && turn !== 1)
			throw `Invalid turn ${turn} provided.`;

		this.turn = turn;
		this.isStarted = true;
	}
}