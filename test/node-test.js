var { Card, Game, Player } = require('../dist/kyu-core');

// create a new game 
var game = new Game();

// create players
var p1 = new Player(),
	p2 = new Player();

// generate cards
for (var i = 0; i < 5; i++) {
	p1.cards.push(Card.random());
	p2.cards.push(Card.random());
}

console.log('Player 1\'s Cards: ' + p1.cards + '.');
console.log('Player 2\'s Cards: ' + p2.cards + '.');

// select hands
var p1Hand = p1.cards.slice(0,5),
	p2Hand = p2.cards.slice(0,5);

// add players to the game
p1.join(game).with(p1Hand);
p2.join(game);
p2.use(p2Hand).in(game);

// start the game
game.start();
promptForNextPlay();

function promptForNextPlay() {
	
	// prompt for a play
	var player = game.turn+1;
		prompt('Player ' + player + '\s turn. Please play a card.')
		.then(function(card, location) {

			// check if the user can make the play
			if (!player.canPlay(card))
				console.log('Invalid play.')

			// check if the play can be made on the board
			else if (!board.canPlay(card, location))
				console.log('Invalid play.');

			// make the play
			else {
				player.play(card).to(board, location);
				console.log('Player ' + player + ' has played ' + card + ' to ' + location + '.')
			}
				
			// if the game has ended
			if (game.ended) {

				// output the results
				if (game.winner)
					console.log('Player ' + game.winner + ' has won.');
				else 
					console.log('Draw.');
			}

			else 
				promptForNextPlay();
		});
}

var i = 0, j = 0;
function prompt(message) {
	// return new Promise(resolve => {
	// 	console.log(message);
	// 	setTimeout(() => {
	// 		var hand = game.turn ? p1Hand : p2Hand,
	// 			card = hand.pop(),
	// 			location = [i,j];
	// 		j = (j + 1) % 3;
	// 		if (j == 0)
	// 			i += 1;
	// 		resolve([card, location]);
	// 	}, 1000);
	// });
}