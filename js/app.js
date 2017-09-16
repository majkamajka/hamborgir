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
    console.log("funkcja showCat");
  }

  showHamborgir() {
    this.board[this.getIndex(this.hamborgir.x, this.hamborgir.y)].classList.add('hamborgir');
  }

  moveCat() {
    if (this.cat.direction === "right") {
      this.cat.x = this.cat.x + 1;
    } else if (this.cat.direction === "left") {
      this.cat.x = this.cat.x -1;
    } else if (this.cat.direction === "up") {
      this.cat.y = this.cat.y -1;
    } else if (this.cat.direction === "down") {
      this.cat.y = this.cat.y +1;
    }
    this.showCat();
  }

  hideVisibleCat() {
    let visibleCat = document.querySelector('.cat');
    visibleCat.classList.remove('cat');
  }



  startGame() {
    const that = this;
    const startIntervalId = setInterval(function () {
      that.hideVisibleCat();
      that.moveCat();
    }, 1000);
  }




}

let newGame = new Game();

newGame.showCat();
newGame.showHamborgir();
newGame.startGame();
});
