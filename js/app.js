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
    this.checkHamborgirCollision();
    this.gameOver();
  }

  hideVisibleCat() {
    let visibleCat = document.querySelector('.cat');
    visibleCat.classList.remove('cat');
  }


  turnCat(event) {
    switch (event.which) {
      case 37:
        this.cat.direction = 'left';
        break;
      case 38:
        this.cat.direction = 'up';
        break;
      case 39:
        this.cat.direction = 'right';
        break;
      case 40:
        this.cat.direction = 'down';
        break;
    };
  }

  checkHamborgirCollision() {
    if (this.cat.x === this.hamborgir.x && this.cat.y === this.hamborgir.y) {
      console.log(this.board[this.getIndex(this.hamborgir.x, this.hamborgir.y)]);
      this.board[this.getIndex(this.hamborgir.x, this.hamborgir.y)].classList.remove('hamborgir');
      this.score += 1;
      this.hamborgir = new Hamborgir();
      this.showHamborgir();
    }
  }

  gameOver() {
    if (this.cat.x < 0 || this.cat.x > 9 || this.cat.y < 0 || this.cat.y > 9) {
      clearInterval(this.startIntervalId);
    }
  }



  startGame() {
    const that = this;
    this.startIntervalId = setInterval(function () {
      that.hideVisibleCat();
      that.moveCat();
    }, 1000);
  }




}

let newGame = new Game();



newGame.showCat();
newGame.showHamborgir();
newGame.startGame();
document.addEventListener('keydown', function(event){
  newGame.turnCat(event);
});

});
