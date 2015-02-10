(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.KyuBoard = require("./board").KyuBoard;
exports.Card = require("./card").Card;
exports.Game = require("./game").Game;
exports.Player = require("./player").Player;
exports.__esModule = true;

},{"./board":2,"./card":3,"./game":4,"./player":5}],2:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/** 
 * A board has m x n spaces on which cards can be played.
 * @class 
 * @extends Array
 */
var Board = exports.Board = (function (Array) {
  function Board(height, width) {
    _classCallCheck(this, Board);

    _get(Object.getPrototypeOf(Board.prototype), "constructor", this).call(this, height * width);
    this.minHand = Math.ceil(this.length / 2);
  }

  _inherits(Board, Array);

  return Board;
})(Array);


/** 
 * A KyuBoard is a 3 x 3 Board.
 * @class
 * @extends Board
 */
var KyuBoard = exports.KyuBoard = (function (Board) {
  function KyuBoard() {
    _classCallCheck(this, KyuBoard);

    _get(Object.getPrototypeOf(KyuBoard.prototype), "constructor", this).call(this, 3, 3);
  }

  _inherits(KyuBoard, Board);

  return KyuBoard;
})(Board);
exports.__esModule = true;

},{}],3:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/** 
 * Cards have four values and an optional type.
 * @class
 */
var Card = exports.Card = (function () {
	function Card(values) {
		_classCallCheck(this, Card);

		this.top = values.top;
		this.right = values.right;
		this.bottom = values.bottom;
		this.left = values.left;
	}

	_prototypeProperties(Card, {
		random: {
			value: function random() {
				var c = new Card({
					top: Math.round(Math.random() * 10) + 1,
					right: Math.round(Math.random() * 10) + 1,
					bottom: Math.round(Math.random() * 10) + 1,
					left: Math.round(Math.random() * 10) + 1
				});
				console.log("Random card generated: " + c + ".");
				return c;
			},
			writable: true,
			configurable: true
		}
	}, {
		toString: {
			value: function toString() {
				return "(" + this.top + ", " + this.right + ", " + this.bottom + ", " + this.left + ")";
			},
			writable: true,
			configurable: true
		}
	});

	return Card;
})();
exports.__esModule = true;

},{}],4:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var KyuBoard = require("./board").KyuBoard;


/** 
 * A game has two players and a Kyu board.
 * @class 
 */
var Game = exports.Game = (function () {
	function Game(player1, player2) {
		_classCallCheck(this, Game);

		this.players = new Set();
		this.hands = new Map();
		this.board = new KyuBoard();
		this.isStarted = false;
		this.turn = null;
	}

	_prototypeProperties(Game, null, {
		start: {

			/** 
    * Assigns the current turn and flags the game for start.
    * @method start
    * @argument {Number} [turn] - The first player's turn, either 0 or 1. If
    * 	no value provided, picks at random. 
    */
			value: function start() {
				var turn = arguments[0] === undefined ? Date.now() % 2 : arguments[0];


				// verify that turn is valid
				if (turn !== 0 && turn !== 1) throw "Invalid turn " + turn + " provided.";

				this.turn = turn;
				this.isStarted = true;
			},
			writable: true,
			configurable: true
		}
	});

	return Game;
})();
exports.__esModule = true;

},{"./board":2}],5:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// A player should be able to join more than one game at a time. However,
// a player should NOT be able to "double play" any card.

/** 
 * A general player has cards and can join games.
 * @class
 */
var Player = exports.Player = (function () {
	function Player() {
		_classCallCheck(this, Player);

		this.cards = [];
	}

	_prototypeProperties(Player, null, {
		join: {
			value: function join(game) {
				var _this = this;
				if (!this.canJoin(game)) return console.log("Player cannot join game.");
				game.players.add(this);
				return { "with": function (hand) {
						return _this.use(hand)["in"](game);
					} };
			},
			writable: true,
			configurable: true
		},
		use: {
			value: function use(hand) {
				var _this = this;
				return { "in": function (game) {
						game.hands.set(_this, hand);
					} };
			},
			writable: true,
			configurable: true
		},
		canJoin: {
			value: function canJoin(game) {
				return this.cards.length >= game.board.minHand;
			},
			writable: true,
			configurable: true
		},
		canUse: {
			value: function canUse(cardOrHand) {
				var _this = this;
				if (cardOrHand.length) {
					var hand = cardOrHand;
					return hand.every(function (card) {
						return _this.canUse(card);
					});
				}
				var card = cardOrHand;
				return this.cards.some(function (c) {
					return c == card;
				});
			},
			writable: true,
			configurable: true
		}
	});

	return Player;
})();
exports.__esModule = true;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiRDovRHJvcGJveC9Qcm9qZWN0cy9reXUvY29yZS9zcmMvbWFpbi5qcyIsIkQ6L0Ryb3Bib3gvUHJvamVjdHMva3l1L2NvcmUvc3JjL2JvYXJkLmpzIiwiRDovRHJvcGJveC9Qcm9qZWN0cy9reXUvY29yZS9zcmMvY2FyZC5qcyIsIkQ6L0Ryb3Bib3gvUHJvamVjdHMva3l1L2NvcmUvc3JjL2dhbWUuanMiLCJEOi9Ecm9wYm94L1Byb2plY3RzL2t5dS9jb3JlL3NyYy9wbGF5ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztRQ0FTLG1CQUFnQixXQUFoQjtRQUNBLGVBQVksVUFBWjtRQUNBLGVBQVksVUFBWjtRQUNBLGlCQUFjLFlBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRUksZ0JBQUEsbUJBQWM7QUFDZixXQURDLE1BQ0EsUUFBUTswQkFEUjs7QUFFWCwrQkFGVyxrREFFTCxTQUFTO0FBQ2YsU0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLFNBQU87OztZQUgxQixPQUFjOztTQUFkO0dBQWM7Ozs7Ozs7O0lBWWQsbUJBQUEsc0JBQWlCO0FBQ2xCLFdBREM7MEJBQUE7O0FBRVgsK0JBRlcscURBRUwsR0FBRTs7O1lBRkcsVUFBaUI7O1NBQWpCO0dBQWlCOzs7Ozs7Ozs7Ozs7OztJQ2JqQixlQUFBO0FBQ0QsVUFEQyxLQUNBO3dCQURBOztBQUVYLE9BQUssTUFBTSxPQUFPO0FBQ2xCLE9BQUssUUFBUSxPQUFPO0FBQ3BCLE9BQUssU0FBUyxPQUFPO0FBQ3JCLE9BQUssT0FBTyxPQUFPOzs7c0JBTFI7QUFVTDtVQUFNLGtCQUFHO0FBQ2YsUUFBSSxJQUFJLElBQUksS0FBSztBQUNoQixVQUFLLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTTtBQUN0QyxZQUFPLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTTtBQUN4QyxhQUFRLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTTtBQUN6QyxXQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTTs7QUFFeEMsWUFBUSxnQ0FBOEI7QUFDdEMsV0FBTzs7Ozs7O0FBWFI7VUFBUSxvQkFBRztBQUNWLGlCQUFXLEtBQUssYUFBUSxLQUFLLGVBQVUsS0FBSyxnQkFBVyxLQUFLOzs7Ozs7O1FBUmpEOzs7Ozs7Ozs7OztJQ0pKLG1CQUFnQixXQUFoQjs7Ozs7OztJQU1JLGVBQUE7QUFDRCxVQURDLEtBQ0EsU0FBUzt3QkFEVDs7QUFFWCxPQUFLLFVBQVUsSUFBSTtBQUNuQixPQUFLLFFBQVEsSUFBSTtBQUNqQixPQUFLLFFBQVEsSUFBSTtBQUNqQixPQUFLLFlBQVk7QUFDakIsT0FBSyxPQUFPOzs7c0JBTkQ7QUFlWjs7Ozs7Ozs7VUFBSyxpQkFBd0I7UUFBdkIsb0NBQU8sS0FBSyxRQUFROzs7O0FBR3pCLFFBQUksU0FBUyxLQUFLLFNBQVMsR0FDMUIsd0JBQXNCOztBQUV2QixTQUFLLE9BQU87QUFDWixTQUFLLFlBQVk7Ozs7Ozs7UUF0Qk47Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0NBLGlCQUFBO0FBQ0QsVUFEQzt3QkFBQTs7QUFFWCxPQUFLLFFBQVE7OztzQkFGRjtBQUlaO1VBQUksY0FBQyxNQUFNOztBQUNWLFFBQUksQ0FBQyxLQUFLLFFBQVEsT0FDakIsT0FBTyxRQUFRLElBQUk7QUFDcEIsU0FBSyxRQUFRLElBQUk7QUFDakIsV0FBTyxFQUFFLFFBQU0sVUFBQTthQUFRLE1BQUssSUFBSSxZQUFTOzs7Ozs7QUFFMUM7VUFBRyxhQUFDLE1BQU07O0FBQ1QsV0FBTyxFQUFFLE1BQUksVUFBQSxNQUFRO0FBQUUsV0FBSyxNQUFNLFdBQVU7Ozs7OztBQUc3QztVQUFPLGlCQUFDLE1BQU07QUFDYixXQUFPLEtBQUssTUFBTSxVQUFVLEtBQUssTUFBTTs7Ozs7QUFFeEM7VUFBTSxnQkFBQyxZQUFZOztBQUNsQixRQUFJLFdBQVcsUUFBUTtBQUN0QixTQUFJLE9BQU87QUFDWCxZQUFPLEtBQUssTUFBTSxVQUFBO2FBQVEsTUFBSyxPQUFPOzs7QUFFdkMsUUFBSSxPQUFPO0FBQ1gsV0FBTyxLQUFLLE1BQU0sS0FBSyxVQUFBO1lBQUssS0FBSzs7Ozs7Ozs7UUF2QnRCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCB7IEt5dUJvYXJkIH0gZnJvbSAnLi9ib2FyZCc7XHJcbmV4cG9ydCB7IENhcmQgfSBmcm9tICcuL2NhcmQnO1xyXG5leHBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lJztcclxuZXhwb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInOyIsIi8qKiBcclxuICogQSBib2FyZCBoYXMgbSB4IG4gc3BhY2VzIG9uIHdoaWNoIGNhcmRzIGNhbiBiZSBwbGF5ZWQuXHJcbiAqIEBjbGFzcyBcclxuICogQGV4dGVuZHMgQXJyYXlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCBleHRlbmRzIEFycmF5IHtcclxuXHRjb25zdHJ1Y3RvcihoZWlnaHQsIHdpZHRoKSB7XHJcblx0XHRzdXBlcihoZWlnaHQgKiB3aWR0aCk7XHJcblx0XHR0aGlzLm1pbkhhbmQgPSBNYXRoLmNlaWwodGhpcy5sZW5ndGgvMik7XHJcblx0fVxyXG59XHJcblxyXG4vKiogXHJcbiAqIEEgS3l1Qm9hcmQgaXMgYSAzIHggMyBCb2FyZC5cclxuICogQGNsYXNzXHJcbiAqIEBleHRlbmRzIEJvYXJkXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgS3l1Qm9hcmQgZXh0ZW5kcyBCb2FyZCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigzLDMpO1xyXG5cdH1cclxufSIsIi8qKiBcclxuICogQ2FyZHMgaGF2ZSBmb3VyIHZhbHVlcyBhbmQgYW4gb3B0aW9uYWwgdHlwZS5cclxuICogQGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2FyZCB7XHJcblx0Y29uc3RydWN0b3IodmFsdWVzKSB7XHJcblx0XHR0aGlzLnRvcCA9IHZhbHVlcy50b3A7XHJcblx0XHR0aGlzLnJpZ2h0ID0gdmFsdWVzLnJpZ2h0O1xyXG5cdFx0dGhpcy5ib3R0b20gPSB2YWx1ZXMuYm90dG9tO1xyXG5cdFx0dGhpcy5sZWZ0ID0gdmFsdWVzLmxlZnQ7XHJcblx0fVxyXG5cdHRvU3RyaW5nKCkge1xyXG5cdFx0cmV0dXJuIGAoJHt0aGlzLnRvcH0sICR7dGhpcy5yaWdodH0sICR7dGhpcy5ib3R0b219LCAke3RoaXMubGVmdH0pYDtcclxuXHR9XHJcblx0c3RhdGljIHJhbmRvbSgpIHtcclxuXHRcdGxldCBjID0gbmV3IENhcmQoe1xyXG5cdFx0XHR0b3A6IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEsXHJcblx0XHRcdHJpZ2h0OiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxLFxyXG5cdFx0XHRib3R0b206IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEsXHJcblx0XHRcdGxlZnQ6IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcclxuXHRcdH0pO1xyXG5cdFx0Y29uc29sZS5sb2coYFJhbmRvbSBjYXJkIGdlbmVyYXRlZDogJHtjfS5gKTtcclxuXHRcdHJldHVybiBjO1xyXG5cdH1cclxufSIsImltcG9ydCB7IEt5dUJvYXJkIH0gZnJvbSBcIi4vYm9hcmRcIjtcclxuXHJcbi8qKiBcclxuICogQSBnYW1lIGhhcyB0d28gcGxheWVycyBhbmQgYSBLeXUgYm9hcmQuXHJcbiAqIEBjbGFzcyBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHRjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKSB7XHJcblx0XHR0aGlzLnBsYXllcnMgPSBuZXcgU2V0KCk7XHJcblx0XHR0aGlzLmhhbmRzID0gbmV3IE1hcCgpO1xyXG5cdFx0dGhpcy5ib2FyZCA9IG5ldyBLeXVCb2FyZCgpO1xyXG5cdFx0dGhpcy5pc1N0YXJ0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMudHVybiA9IG51bGw7XHJcblx0fVxyXG5cdFxyXG5cdC8qKiBcclxuXHQgKiBBc3NpZ25zIHRoZSBjdXJyZW50IHR1cm4gYW5kIGZsYWdzIHRoZSBnYW1lIGZvciBzdGFydC5cclxuXHQgKiBAbWV0aG9kIHN0YXJ0XHJcblx0ICogQGFyZ3VtZW50IHtOdW1iZXJ9IFt0dXJuXSAtIFRoZSBmaXJzdCBwbGF5ZXIncyB0dXJuLCBlaXRoZXIgMCBvciAxLiBJZlxyXG5cdCAqIFx0bm8gdmFsdWUgcHJvdmlkZWQsIHBpY2tzIGF0IHJhbmRvbS4gXHJcblx0ICovXHJcblx0c3RhcnQodHVybiA9IERhdGUubm93KCkgJSAyKSB7XHJcblx0XHRcclxuXHRcdC8vIHZlcmlmeSB0aGF0IHR1cm4gaXMgdmFsaWRcclxuXHRcdGlmICh0dXJuICE9PSAwICYmIHR1cm4gIT09IDEpXHJcblx0XHRcdHRocm93IGBJbnZhbGlkIHR1cm4gJHt0dXJufSBwcm92aWRlZC5gO1xyXG5cclxuXHRcdHRoaXMudHVybiA9IHR1cm47XHJcblx0XHR0aGlzLmlzU3RhcnRlZCA9IHRydWU7XHJcblx0fVxyXG59IiwiLy8gQSBwbGF5ZXIgc2hvdWxkIGJlIGFibGUgdG8gam9pbiBtb3JlIHRoYW4gb25lIGdhbWUgYXQgYSB0aW1lLiBIb3dldmVyLFxyXG4vLyBhIHBsYXllciBzaG91bGQgTk9UIGJlIGFibGUgdG8gXCJkb3VibGUgcGxheVwiIGFueSBjYXJkLlxyXG5cclxuLyoqIFxyXG4gKiBBIGdlbmVyYWwgcGxheWVyIGhhcyBjYXJkcyBhbmQgY2FuIGpvaW4gZ2FtZXMuXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBsYXllciB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmNhcmRzID0gW107XHJcblx0fVxyXG5cdGpvaW4oZ2FtZSkge1xyXG5cdFx0aWYgKCF0aGlzLmNhbkpvaW4oZ2FtZSkpXHJcblx0XHRcdHJldHVybiBjb25zb2xlLmxvZygnUGxheWVyIGNhbm5vdCBqb2luIGdhbWUuJyk7XHJcblx0XHRnYW1lLnBsYXllcnMuYWRkKHRoaXMpO1xyXG5cdFx0cmV0dXJuIHsgd2l0aDogaGFuZCA9PiB0aGlzLnVzZShoYW5kKS5pbihnYW1lKSB9O1xyXG5cdH1cclxuXHR1c2UoaGFuZCkge1xyXG5cdFx0cmV0dXJuIHsgaW46IGdhbWUgPT4geyBnYW1lLmhhbmRzLnNldCh0aGlzLCBoYW5kKSB9IH07XHJcblx0fVxyXG5cdFxyXG5cdGNhbkpvaW4oZ2FtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2FyZHMubGVuZ3RoID49IGdhbWUuYm9hcmQubWluSGFuZDtcclxuXHR9XHJcblx0Y2FuVXNlKGNhcmRPckhhbmQpIHtcclxuXHRcdGlmIChjYXJkT3JIYW5kLmxlbmd0aCkge1xyXG5cdFx0XHRsZXQgaGFuZCA9IGNhcmRPckhhbmQ7XHJcblx0XHRcdHJldHVybiBoYW5kLmV2ZXJ5KGNhcmQgPT4gdGhpcy5jYW5Vc2UoY2FyZCkpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNhcmQgPSBjYXJkT3JIYW5kO1xyXG5cdFx0cmV0dXJuIHRoaXMuY2FyZHMuc29tZShjID0+IGMgPT0gY2FyZCk7XHJcblx0fVxyXG59Il19
