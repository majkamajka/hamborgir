document.addEventListener('DOMContentLoaded', () => {
  require('../sass/style.scss');

  class Cat {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.direction = 'right';
    }
  }

  class Hamborgir {
    constructor() {
      this.x = Math.floor(Math.random() * 10);
      this.y = Math.floor(Math.random() * 10);
    }
  }

  class Doge {
    constructor() {
      this.x = Math.floor(Math.random() * 10);
      this.y = Math.floor(Math.random() * 10);
    }
  }

  class Game {
    constructor() {
      this.board = document.querySelectorAll('#board div');
      this.cat = new Cat();
      this.hamborgir = new Hamborgir();
      this.score = 0;
      this.interval = 1000;
      this.dogeIndexes = [];
    }

    getIndex(x, y) {
      return x + (y * 10);
    }

    showCat() {
      if (this.board[this.getIndex(this.cat.x, this.cat.y)]) {
        this.board[this.getIndex(this.cat.x, this.cat.y)].classList.add('cat');
      }
    }

    showHamborgir() {
      console.log(this.dogeIndexes);
      this.board[this.getIndex(this.hamborgir.x, this.hamborgir.y)].classList.add('hamborgir');
    }

    generateNewDoge(indexes) {
      this.doge = new Doge();
      let dogeIndex = this.getIndex(this.doge.x, this.doge.y);
    }

    showDoge() {
      this.doge = new Doge();
      let dogeIndex = this.getIndex(this.doge.x, this.doge.y);
      let catIndex = this.getIndex(this.cat.x, this.cat.y);
      let hamborgirIndex = this.getIndex(this.hamborgir.x, this.hamborgir.y);
      if (this.dogeIndexes.includes(dogeIndex) || dogeIndex === catIndex || dogeIndex === hamborgirIndex) {
        this.showDoge();
        console.log("duplicate");
      } else {
        this.dogeIndexes.push(dogeIndex);
        this.board[dogeIndex].classList.add('doge');
      }
    }

    moveCat() {
      if (this.cat.direction === 'right') {
        this.cat.x = this.cat.x + 1;
      } else if (this.cat.direction === 'left') {
        this.cat.x = this.cat.x - 1;
      } else if (this.cat.direction === 'up') {
        this.cat.y = this.cat.y - 1;
      } else if (this.cat.direction === 'down') {
        this.cat.y = this.cat.y + 1;
      }
      this.gameOver();
      this.checkHamborgirCollision();
      this.showCat();
    }

    hideVisibleCat() {
      const visibleCat = document.querySelector('.cat');
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
      }
    }

    checkHamborgirCollision() {
      if (this.cat.x === this.hamborgir.x && this.cat.y === this.hamborgir.y) {
        this.board[this.getIndex(this.hamborgir.x, this.hamborgir.y)].classList.remove('hamborgir');
        this.score += 1;
        document.querySelector('#score').innerText = this.score;
        this.hamborgir = new Hamborgir();
        this.showHamborgir();
        this.showDoge();
      }
    }

    gameOver() {
      if (this.cat.x < 0 || this.cat.x > 9 || this.cat.y < 0 || this.cat.y > 9) {
        clearInterval(this.startIntervalId);
        this.cat.x = -1;
        this.cat.y = -1;
        console.log('game over');
      }
    }

    startGame() {
      const that = this;
      this.startIntervalId = setInterval(() => {
        that.hideVisibleCat();
        that.moveCat();
      }, 250);
    }
  }

  const newGame = new Game();
  newGame.showCat();
  newGame.showHamborgir();
  newGame.startGame();
  document.addEventListener('keydown', (event) => {
    newGame.turnCat(event);
  });
});
