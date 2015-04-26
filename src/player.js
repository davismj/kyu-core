// A player should be able to join more than one game at a time. However,
// a player should NOT be able to "double play" any card.

/** 
 * A general player has cards and can join games.
 * @class
 */
export class Player {
	
	static new(name = '') {
		// var player = players.find(player => !player.playing);
		// if (player) {
		// 	player.initialize();
		// } else {
		var player = new Player();
		player.name = name;
		// 	Player.players.push(player);
		// }
		return player;
	}

	// static players = [];

	constructor(player = {}) {
		this.name = player.name;
		this.cards = player.cards || [];
	}

	toString() { 
		return this.name || "Anonymous player";
	}

	initialize() {
		this.cards.splice(0, Number.MAX_VALUE);
		this.name = null;
	}
	
	canJoin(game) {
		return this.cards.length >= game.board.minHand;
	}

	canUse(cardOrHand) {
		if (cardOrHand.length) {
			var hand = cardOrHand;
			return hand.length == 5 
				&& hand.every(card => this.canUse(card));
		}
		var card = cardOrHand;
		// TODO needs to handle duplicates
		return this.cards.some(c => c == card);
	}
}