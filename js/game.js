var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game () {
  this.board = document.querySelectorAll("#board > div");
  this.furry = new Furry();
  this.coin = new Coin ();
  this.score = 0;

  this.index = function(x,y) {
    return x + (y * 10);
  };

  this.showFurry = function () {
    if (this.board[this.index (this.furry.x, this.furry.y)] !== undefined) {
      this.board[this.index (this.furry.x, this.furry.y)].classList.add('furry');
    }
  };

  this.hideVisibleFurry = function () {
    var visibleFurry = document.querySelector(".furry");
    if (visibleFurry !== null) {
      visibleFurry.classList.remove("furry");
    };
  };

  this.showCoin = function () {
    this.board[this.index (this.coin.x, this.coin.y)].classList.add('coin');
  };

  this.moveFurry = function () {
    this.hideVisibleFurry();
    if (this.furry.direction === "right") {
      this.furry.x = this.furry.x + 1;
    } else if (this.furry.direction === "left") {
      this.furry.x = this.furry.x -1;
    } else if (this.furry.direction === "up") {
      this.furry.y = this.furry.y -1;
    } else if (this.furry.direction === "down") {
      this.furry.y = this.furry.y +1;
    };
    this.gameOver();
    this.checkCoinCollision();
    this.showFurry();
  };

  this.turnFurry = function(event) {
    switch (event.which) {
      case 37:
        this.furry.direction = 'left';
        break;
      case 38:
        this.furry.direction = 'up';
        break;
      case 39:
        this.furry.direction = 'right';
        break;
      case 40:
        this.furry.direction = 'down';
        break;
    };
  };

  this.checkCoinCollision = function () {
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
      var audio = new Audio('sounds/coin.wav');
      audio.play();
      this.board[this.index (this.coin.x, this.coin.y)].classList.remove('coin');
      this.score = this.score + 1;
      document.querySelector("#score strong").innerText = this.score;
      this.coin = new Coin ();
      this.showCoin ();
    };
  };

  this.gameOver = function () {
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
      var audio = new Audio('sounds/gameover.wav');
      audio.play();
    // nadaję stałe wartości x i y furry'emu przy game over, żeby nie przeskakiwał do następnej / poprzedniej linijki przy game over przy dotknięciu ściany left / right, tak jak dzieje się to w zaprezentowanym przykładzie
      this.furry.x = -1;
      this.furry.y = -1;
      clearInterval(this.idSetInterval);
      this.hideVisibleFurry();
      document.querySelector(".game-over p span").innerText = this.score;
      var self = this;
      var gameOverScreenTimeout = setTimeout(function () {
        document.querySelector("#over").classList.remove("invisible");
        self.board[self.index (self.coin.x, self.coin.y)].classList.remove('coin');
      }, 750);


    };
  };

  this.startGame = function () {
    var self = this;
    this.idSetInterval = setInterval(function () {
      self.moveFurry();
    }, 250);
  };

};

module.exports = Game;
