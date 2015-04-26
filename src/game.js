import { Board } from "./board";

/** 
 * A game has two players and a Kyu board.
 * @class 
 */
export default class Game {
	
	/** 
	 * Creates a new game. Recycles an ended game if available, otherwise
	 * creates a new game and adds it to the cache of games.
	 * @static 
	 * @method new
	 * @return {Game} A new game.
	 */
	static new() {
		// var game = games.find(game => !game.isStarted);
		// if (game) {
		// 	game.initialize();
		// } else {
		var game = new Game();
		// 	Game.games.push(game);
		// }
		return game;
	}

	/** 
	 * 
	 */
	// static games = [];

	/** 
	 * 
	 */
	constructor(rules = [Rules.ADJACENT]) {
		this.players = new Set();
		this.hands = new Map();
		this.board = new Board(3,3);
		this.rules = rules;
		this.status = GameStatus.NEW;
		this.turn = null;
		this.winner = null;
	}

	/**
	 * 
	 * @method initialize
	 */
 	initialize() {
 		this.players.clear();
 		this.hands.clear();
 		this.board.empty();
 		this.status = GameStatus.NEW;
 		this.turn = null;
 		this.winner = null;
 	}

 	add(player, hand) { 
 		if (player.canJoin(this) 
 			&& player.canUse(hand)) {

 			this.players.add(player);
 			this.hands.set(player, hand.map(card => {
 				var cardIndex = player.cards.indexOf(card);
 				return player.cards.splice(cardIndex, 1)[0];
			}));
 		}
 	}
	
 	canStart() {
 		
 		// game must not be started
 		return this.status != GameStatus.SARTED

 			// need two players
 			&& this.players.size == 2

			// each player needs a hand...
 			&& this.hands.size == 2

 			//...of five cards
 			&& this.hands.values().all(h => h.length == 5);
 	}

	/** 
	 * Assigns the current turn and flags the game for start.
	 * @method start
	 * @argument {Player} [turn] 
	 */
	start(turn = this.players.values().next().value) {
		
		// verify that turn is valid
		// if (turn !== 0 && turn !== 1)
		// 	throw `Invalid player ${turn} provided.`;

		this.turn = turn;
		this.status = GameStatus.STARTED;
		console.log('Game started.');
	}

	/** 
	 * Determines a winner and ends the game.
	 * @method end
	 */
	end() {
		var players = this.players.values(),
			p1 = players.next().value,
			p2 = players.next().value,
			p1Score = this.hands.get(p1).length,
			p2Score = this.hands.get(p2).length;

		for (let card of this.board) {
			if (card.owner == p1) {
				p1Score++;
			} else if (card.owner == p2) {
				p2Score++;
			}
		}

		if (p1Score > p2Score) {
			this.winner = p1;
		} else if (p2Score > p1Score) {
			this.winner = p2;
		}

		this.status = GameStatus.ENDED;
	}

	/** TODO doc
	 * Tests whether a play is valid.
	 */
	canPlay(player, card, position) {

		var hand = this.hands.get(player);

		// must be the player's turn
		return player == this.turn

			// must be a valid card
			&& !!card

			// player must have the card in his hand
			&& hand.includes(card) 

			// position must be empty
			&& !this.board[position];
	}

	/** TODO doc
	 * Applies a play to the game.
	 */
	play(player, card, position) {

		// if invalid play, throw an error
		if (!this.canPlay(player, card, position)) {
			return console.warn('This play is invalid.');
		}

		// remove the card from the player's hand
		var hand = this.hands.get(player),
			cardIndex = hand.indexOf(card);

		// and place it on the board
		this.board.splice(position, 1, hand.splice(cardIndex, 1)[0]);

		// apply game rules to the play
		this.board[position].owner = player;
		Rules.apply(this, player, position);

		this.nextTurn();
	}

	nextTurn() {

		// if the board is full, end the game
		if (this.board.every(s => s)) {
			return this.end();
		}

		// otherwise, swap players
		for (let player of this.players) {
			if (this.turn != player) {
				this.turn = player;
				return;
			}
		}
	}
}

class Rules {

	static ADJACENT = 'adjacent';
	// static DIAGONAL = 'diagonal';
	// static CHAIN = 'chain';
	// static ADD = 'add';
	// static SAME = 'same';
	static apply(game, player, position, won = []) {

		var center = game.board[position];
			// same = true;
			// addVal = null;

		if (game.rules.includes(Rules.ADJACENT)) {

			var above = game.board[position - 3],
				right = game.board[position + 1],
				below = game.board[position + 3],
				left = game.board[position - 1];

			if (above && above.owner != player) {
				if (above.bottom < center.top) {
					won.push(above);
				}

				// same = same && above.bottom == center.top;
			}

			if (right && right.owner != player) {
				if (right.left < center.right) {
					won.push(right);
				}

				// same = same && right.left == center.right;
			}

			if (below && below.owner != player) {
				if (below.top < center.bottom) {
					won.push(below);
				}

				// same = same && below.top == center.bottom;
			}

			if (left && left.owner != player) {
				if (left.right < center.left) {
					won.push(left);
				}

				// same = same && left.right == center.left;
			}
		}

		// if (game.rules.includes(Rules.DIAGONAL)) { 
			
		// 	var upperRight = game.board[position - 2],
		// 		lowerRight = game.board[position + 4],
		// 		lowerLeft = game.board[position + 2],
		// 		upperLeft = game.board[position - 4];

		// 	if (upperRight && upperRight.owner != player) {
			
		// 	}

		// 	if (lowerRight && lowerRight.owner != player) {
				
		// 	}

		// 	if (lowerLeft && lowerLeft.owner != player) {
				
		// 	}

		// 	if (upperLeft && upperLeft.owner != player) {
				
		// 	}
		// }

		// if (game.rules.includes(Rules.SAME)) {

		// }

		// if (game.rules.includes(Rules.ADD)) {

		// }

		for (let card of won) {

			if (game.rules.includes(Rules.CHAIN)) {
				var cardPos = game.board.indexOf(card);
				Rules.apply(game, player, cardPos, won)
			}

			card.owner = player;
		}
	}
}

class GameStatus {
	static NEW = 'new';
	static STARTED = 'started';
	static ENDED = 'ended';
}