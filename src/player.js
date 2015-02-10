// A player should be able to join more than one game at a time. However,
// a player should NOT be able to "double play" any card.

/** 
 * A general player has cards and can join games.
 * @class
 */
export class Player {
	constructor() {
		this.cards = [];
	}
	join(game) {
		if (!this.canJoin(game))
			return console.log('Player cannot join game.');
		game.players.add(this);
		return { with: hand => this.use(hand).in(game) };
	}
	use(hand) {
		return { in: game => { game.hands.set(this, hand) } };
	}
	
	canJoin(game) {
		return this.cards.length >= game.board.minHand;
	}
	canUse(cardOrHand) {
		if (cardOrHand.length) {
			let hand = cardOrHand;
			return hand.every(card => this.canUse(card));
		}
		let card = cardOrHand;
		return this.cards.some(c => c == card);
	}
}