(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kyuCore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _KyuBoard = require('./board');

Object.defineProperty(exports, 'KyuBoard', {
  enumerable: true,
  get: function get() {
    return _KyuBoard.KyuBoard;
  }
});

var _Card = require('./card');

Object.defineProperty(exports, 'Card', {
  enumerable: true,
  get: function get() {
    return _Card.Card;
  }
});

var _Game = require('./game');

Object.defineProperty(exports, 'Game', {
  enumerable: true,
  get: function get() {
    return _Game.Game;
  }
});

var _player = require('./player');

_defaults(exports, _interopRequireWildcard(_player));

},{"./board":2,"./card":3,"./game":4,"./player":5}],2:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Board = (function (_Array) {
	function Board(height, width) {
		_classCallCheck(this, Board);

		var _this = new _Array(height * width);

		_this.__proto__ = Board.prototype;

		_this.height = height;
		_this.width = width;
		_this.length = height * width;
		_this.fill(null);
		_this.minHand = Math.ceil(_this.length / 2);
		return _this;
	}

	_inherits(Board, _Array);

	_createClass(Board, [{
		key: "empty",
		value: function empty() {
			this.fill(null);
		}
	}]);

	return Board;
})(Array);

exports.Board = Board;

var KyuBoard = (function (_Board) {
	function KyuBoard() {
		_classCallCheck(this, KyuBoard);

		_get(Object.getPrototypeOf(KyuBoard.prototype), "constructor", this).call(this, 3, 3);
	}

	_inherits(KyuBoard, _Board);

	return KyuBoard;
})(Board);

exports.KyuBoard = KyuBoard;

},{}],3:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var Card = (function () {
	function Card(values) {
		_classCallCheck(this, Card);

		this.id = Guid();
		this.top = values.top;
		this.right = values.right;
		this.bottom = values.bottom;
		this.left = values.left;
	}

	_createClass(Card, [{
		key: 'toString',
		value: function toString() {
			return '(' + this.top + ', ' + this.right + ', ' + this.bottom + ', ' + this.left + ')';
		}
	}], [{
		key: 'random',
		value: function random() {
			var c = new Card({
				top: Math.round(Math.random() * 10) + 1,
				right: Math.round(Math.random() * 10) + 1,
				bottom: Math.round(Math.random() * 10) + 1,
				left: Math.round(Math.random() * 10) + 1
			});
			console.log('Random card generated: ' + c + '.');
			return c;
		}
	}]);

	return Card;
})();

exports.Card = Card;

function Guid() {
	return Guid.s4() + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + Guid.s4() + Guid.s4();
}
Guid.s4 = function () {
	return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
};

},{}],4:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Board = require("./board");

var _ComputerPlayer = require("./player");

var Game = (function () {
	function Game() {
		var rules = arguments[0] === undefined ? [Rules.ADJACENT] : arguments[0];

		_classCallCheck(this, Game);

		this.players = new Set();
		this.hands = new Map();
		this.board = new _Board.Board(3, 3);
		this.rules = rules;
		this.status = GameStatus.NEW;
		this.turn = null;
		this.winner = null;
	}

	_createClass(Game, [{
		key: "initialize",
		value: function initialize() {
			this.players.clear();
			this.hands.clear();
			this.board.empty();
			this.status = GameStatus.NEW;
			this.turn = null;
			this.winner = null;
		}
	}, {
		key: "add",
		value: function add(player, hand) {
			hand = hand.slice();
			if (player.canJoin(this) && player.canUse(hand)) {

				this.players.add(player);
				this.hands.set(player, hand.map(function (card) {
					var cardIndex = player.cards.indexOf(card);
					return player.cards.splice(cardIndex, 1)[0];
				}));
			}
		}
	}, {
		key: "canStart",
		value: function canStart() {
			return this.status != GameStatus.SARTED && this.players.size == 2 && this.hands.size == 2 && this.hands.values().all(function (h) {
				return h.length == 5;
			});
		}
	}, {
		key: "start",
		value: function start() {
			var turn = arguments[0] === undefined ? this.players.values().next().value : arguments[0];

			this.turn = turn;
			this.status = GameStatus.STARTED;
			console.log("Game started.");
		}
	}, {
		key: "end",
		value: function end() {
			var players = this.players.values(),
			    p1 = players.next().value,
			    p2 = players.next().value,
			    p1Score = this.hands.get(p1).length,
			    p2Score = this.hands.get(p2).length;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.board[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var card = _step.value;

					if (card.owner == p1) {
						p1Score++;
					} else if (card.owner == p2) {
						p2Score++;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (p1Score > p2Score) {
				this.winner = p1;
			} else if (p2Score > p1Score) {
				this.winner = p2;
			}

			this.status = GameStatus.ENDED;
		}
	}, {
		key: "canPlay",
		value: function canPlay(player, card, position) {

			var hand = this.hands.get(player);

			return player == this.turn && !!card && hand.includes(card) && !this.board[position];
		}
	}, {
		key: "testPlay",
		value: function testPlay(player, card, position) {
			if (!this.canPlay(player, card, position)) {
				return -1;
			}

			return Rules.compute(this, player, card, position).length;
		}
	}, {
		key: "play",
		value: function play(player, card, position) {
			if (!this.canPlay(player, card, position)) {
				return console.warn("This play is invalid.");
			}

			var hand = this.hands.get(player),
			    cardIndex = hand.indexOf(card);

			this.board.splice(position, 1, hand.splice(cardIndex, 1)[0]);

			this.board[position].owner = player;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Rules.compute(this, player, card, position)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var won = _step2.value;

					won.owner = player;
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
						_iterator2["return"]();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.nextTurn();
		}
	}, {
		key: "nextTurn",
		value: function nextTurn() {
			var _this = this;

			if (this.board.every(function (s) {
				return s;
			})) {
				this.turn = null;
				return this.end();
			}

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.players[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var player = _step3.value;

					if (this.turn != player) {
						this.turn = player;
						break;
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
						_iterator3["return"]();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			if (this.turn instanceof _ComputerPlayer.ComputerPlayer) {
				setTimeout(function () {
					var best = _this.turn.findBestPlay(_this);
					_this.play(_this.turn, best.card, best.pos);
				}, 2000);
			}
		}
	}], [{
		key: "new",
		value: function _new() {
			var game = new Game();

			return game;
		}
	}]);

	return Game;
})();

exports.Game = Game;

var Rules = (function () {
	function Rules() {
		_classCallCheck(this, Rules);
	}

	_createClass(Rules, null, [{
		key: "ADJACENT",
		value: "adjacent",
		enumerable: true
	}, {
		key: "compute",
		value: function compute(game, player, card, position) {
			var won = arguments[4] === undefined ? [] : arguments[4];

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
				}

				if (right && right.owner != player && !won.includes(rightPos)) {
					if (right.left < card.right) {
						won.push(right);
					}
				}

				if (below && below.owner != player && !won.includes(belowPos)) {
					if (below.top < card.bottom) {
						won.push(below);
					}
				}

				if (left && left.owner != player && !won.includes(rightPos)) {
					if (left.right < card.left) {
						won.push(left);
					}
				}
			}

			if (game.rules.includes(Rules.CHAIN)) {
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = won[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var wonCard = _step4.value;

						var cardPos = game.board.indexOf(wonCard);
						Rules.compute(game, player, wonCard, cardPos, won);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
							_iterator4["return"]();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
			}

			return won;
		}
	}]);

	return Rules;
})();

var GameStatus = (function () {
	function GameStatus() {
		_classCallCheck(this, GameStatus);
	}

	_createClass(GameStatus, null, [{
		key: "NEW",
		value: "new",
		enumerable: true
	}, {
		key: "STARTED",
		value: "started",
		enumerable: true
	}, {
		key: "ENDED",
		value: "ended",
		enumerable: true
	}]);

	return GameStatus;
})();

},{"./board":2,"./player":5}],5:[function(require,module,exports){
'use strict';

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Card = require('./card');

var Player = (function () {
  function Player() {
    var player = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Player);

    this.name = player.name;
    this.cards = (player.cards || []).map(function (c) {
      return c instanceof _Card.Card ? c : new _Card.Card(c);
    });
  }

  _createClass(Player, [{
    key: 'toString',
    value: function toString() {
      return this.name || 'Anonymous player';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.cards.splice(0, Number.MAX_VALUE);
      this.name = null;
    }
  }, {
    key: 'canJoin',
    value: function canJoin(game) {
      return this.cards.length >= game.board.minHand;
    }
  }, {
    key: 'canUse',
    value: function canUse(cardOrHand) {
      var _this = this;

      if (cardOrHand.length) {
        var hand = cardOrHand;
        return hand.length == 5 && hand.every(function (card) {
          return _this.canUse(card);
        });
      }
      var card = cardOrHand;

      return this.cards.some(function (c) {
        return c == card;
      });
    }
  }], [{
    key: 'new',
    value: function _new() {
      var name = arguments[0] === undefined ? '' : arguments[0];

      var player = new Player();
      player.name = name;

      return player;
    }
  }]);

  return Player;
})();

exports.Player = Player;

var ComputerPlayer = (function (_Player) {
  function ComputerPlayer() {
    var _cards;

    _classCallCheck(this, ComputerPlayer);

    _get(Object.getPrototypeOf(ComputerPlayer.prototype), 'constructor', this).call(this, { name: 'Computer player' });

    (_cards = this.cards).splice.apply(_cards, [0, 0].concat(_toConsumableArray([0, 1, 2, 3, 4].map(function (i) {
      return _Card.Card.random();
    }))));
    this.level = AILevel.NORMAL;
  }

  _inherits(ComputerPlayer, _Player);

  _createClass(ComputerPlayer, [{
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _cards2;

      (_cards2 = this.cards).splice.apply(_cards2, [0, Number.MAX_VALUE].concat(_toConsumableArray([0, 1, 2, 3, 4].map(function (i) {
        return _Card.Card.random();
      }))));
      this.level = AILevel.NORMAL;
    }
  }, {
    key: 'chooseHand',
    value: function chooseHand() {
      return this.cards.slice(0, 5);
    }
  }, {
    key: 'findBestPlay',
    value: function findBestPlay(game) {
      var hand = game.hands.get(this),
          board = game.board.reduce(function (arr, pos, idx) {
        if (!game.board[idx]) {
          arr.push(idx);
        }
        return arr;
      }, []),
          bestPlay = { card: null, pos: null, val: -Infinity };

      for (var n = 10; n > 0; n--) {

        var rand = Math.floor(Math.random() * 100),
            card = hand[rand % hand.length],
            pos = board[rand % board.length],
            val = game.testPlay(this, card, pos);

        if (val > bestPlay.val) {
          bestPlay.card = card;
          bestPlay.pos = pos;
          bestPlay.val = val;
        }
      }

      return bestPlay;
    }
  }], [{
    key: 'new',
    value: function _new() {
      var level = arguments[0] === undefined ? AILevel.NORMAL : arguments[0];

      var player = new ComputerPlayer();
      player.level = level;
      return player;
    }
  }]);

  return ComputerPlayer;
})(Player);

exports.ComputerPlayer = ComputerPlayer;

var AILevel = (function () {
  function AILevel() {
    _classCallCheck(this, AILevel);
  }

  _createClass(AILevel, null, [{
    key: 'NORMAL',
    value: 'normal',
    enumerable: true
  }]);

  return AILevel;
})();

},{"./card":3}]},{},[1])(1)
});