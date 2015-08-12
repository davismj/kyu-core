import { Card } from './card';

/** 
 * A general player has cards and can join games.
 * @class
 */
export class Player {
  
  static new(name = '') {
    // var player = players.find(player => !player.playing);
    // if (player) {
    //  player.initialize();
    // } else {
    var player = new Player();
    player.name = name;
    //  Player.players.push(player);
    // }
    return player;
  }

  // static players = [];

  constructor(player = {}) {
    this.name = player.name;
    this.cards = (player.cards || [])
      .map(c => c instanceof Card ? c : new Card(c));
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

export class ComputerPlayer extends Player {

  static new(level = AILevel.NORMAL) {
    var player = new ComputerPlayer();
    player.level = level;
    return player;
  }

  constructor() {
    super({ name: 'Computer player'});
    // this.cards.splice(0, 0, ...[for (i of [0,1,2,3,4]) Card.random()]);
    this.cards.splice(0, 0, ...[0,1,2,3,4].map(i => Card.random()))
    this.level = AILevel.NORMAL;
  }

  toString() { 
    return this.name;
  }

  initialize() {
    // this.cards.splice(0, Number.MAX_VALUE, ...[for (i of [0,1,2,3,4]) Card.random()]);
    this.cards.splice(0, Number.MAX_VALUE, ...[0,1,2,3,4].map(i => Card.random()));
    this.level = AILevel.NORMAL;
  }

  // TODO improve
  chooseHand() {
    return this.cards.slice(0,5);
  }

  findBestPlay(game) {

    // get the necessary variables
    var hand = game.hands.get(this),
      board = game.board.reduce((arr, pos, idx) => { 
        if (!game.board[idx]) {
          arr.push(idx);
        }
        return arr;
      }, []),
      bestPlay = { card: null, pos: null, val: -Infinity };

    // for x random plays
    for (let n = 10; n > 0; n--) {
      
      var rand = Math.floor(Math.random() * 100),

      // pick a random card in the hand
        card = hand[rand % hand.length],

      // pick a random location
        pos = board[rand % board.length],

      // measure the outcome
        val = game.testPlay(this, card, pos);

      // if play better than last play, save this play
      if (val > bestPlay.val) {
        bestPlay.card = card;
        bestPlay.pos = pos;
        bestPlay.val = val;
      }
    }

    return bestPlay;
  }
}

// TODO add find best play function
class AILevel {
  static NORMAL = 'normal';
}