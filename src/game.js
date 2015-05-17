import { Board } from "./board";
import { ComputerPlayer } from "./player";
/** 
 * A game has two players and a Kyu board.
 * @class 
 */
export class Game {
	
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

	/** TODO test doc
	 * Test the outcome of a play.
	 */
	testPlay(player, card, position) {

		// if invalid play, return valueless
		if (!this.canPlay(player, card, position)) {
			return -1;
		}

		// test outcome of the play using game rules
		return Rules.compute(this, player, card, position).length;
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
		this.board[position].owner = player
		for (let won of Rules.compute(this, player, card, position)) {
			won.owner = player;
		}

		this.nextTurn();
	}

	nextTurn() {

		// if the board is full, end the game
		if (this.board.every(s => s)) {
			this.turn = null;
			return this.end();
		}

		// otherwise, swap players
		for (let player of this.players) {
			if (this.turn != player) {
				this.turn = player;
				break;
			}
		}

		if (this.turn instanceof ComputerPlayer) { 
			var best = this.turn.findBestPlay(this);
			this.play(this.turn, best.card, best.pos);
		}
	}
}

// TODO bitmask
class Rules {

	static ADJACENT = 'adjacent';
	// static DIAGONAL = 'diagonal';
	// static CHAIN = 'chain';
	// static ADD = 'add';
	// static SAME = 'same';
	static compute(game, player, card, position, won = []) {

		// var same = true;
		// 	addVal = null;

		if (game.rules.includes(Rules.ADJACENT)) {

			var abovePos = position - 3,
				above = game.board[abovePos],
				rightPos = position % 3 < 2 ? position + 1 : -1,
				right = game.board[rightPos],
				belowPos = position + 3,
				below = game.board[belowPos],
				leftPos = position % 3 > 0 ? position - 1 : -1,
				left = game.board[leftPos];
				
			if (above && above.owner != player && !won.includes(abovePos)) {
				if (above.bottom < card.top) {
					won.push(above);
				}

				// same = same && above.bottom == card.top;
			}

			if (right && right.owner != player && !won.includes(rightPos)) {
				if (right.left < card.right) {
					won.push(right);
				}

				// same = same && right.left == card.right;
			}

			if (below && below.owner != player && !won.includes(belowPos)) {
				if (below.top < card.bottom) {
					won.push(below);
				}

				// same = same && below.top == card.bottom;
			}

			if (left && left.owner != player && !won.includes(rightPos)) {
				if (left.right < card.left) {
					won.push(left);
				}

				// same = same && left.right == card.left;
			}
		}

		// if (game.rules.includes(Rules.DIAGONAL)
		if (game.rules.includes(Rules.CHAIN)) {
			for (let wonCard of won) {
				var cardPos = game.board.indexOf(wonCard);
				Rules.compute(game, player, wonCard, cardPos, won)	
			}
		}

		return won;
	}
}

class GameStatus {
	static NEW = 'new';
	static STARTED = 'started';
	static ENDED = 'ended';
}