document.addEventListener("DOMContentLoaded", function(){
require('../sass/style.scss');

class Cat {
  constructor(x, y, direction) {
    this.x = 0,
    this.y = 0,
    this.direction = "right"
  }
};

class Hamborgir {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * 10),
    this.y = Math.floor(Math.random() * 10)
  }
}

let newCat = new Hamborgir(5, 6);
console.log(newCat);

class Game {
  constructor() {
    this.board = document.querySelectorAll('#board div'),
    this.cat = new Cat(),
    this.hamborgir = new Hamborgir(),
    this.score = 0
  }

  getIndex(x, y) {
    return x + (y * 10);
  }

  showCat() {
    this.board[this.getIndex(this.cat.x, this.cat.y)].classList.add('cat');
  }

  showHamborgir() {
    this.board[this.getIndex(this.hamborgir.x, this.hamborgir.y)].classList.add('hamborgir');
  }

  startGame() {
    const startIntervalId = setInterval(function () {
      console.log("aaa");
    }, 1000);

  }

}

let newGame = new Game();

newGame.showCat();
newGame.showHamborgir();
newGame.startGame();
});
