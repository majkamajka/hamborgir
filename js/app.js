document.addEventListener('DOMContentLoaded', () => {
  require('../sass/style.scss');

  let hamborgirIndex = 0;
  let dogeIndex = 0;
  let catIndex = 0;
  const startAudio = new Audio('sounds/start.wav');
  const dogeAudio = new Audio('sounds/bark.wav');
  const hamborgirAudio = new Audio('sounds/coin.wav');
  let doges  = [];

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
      console.log(this);
    }

    getIndex(x, y) {
      return x + (y * 10);
    }

    showCat() {
      catIndex = this.getIndex(this.cat.x, this.cat.y);
      if (this.board[catIndex]) {
        this.board[catIndex].classList.add('cat');
      }
    }

    showHamborgir() {
      hamborgirIndex = this.getIndex(this.hamborgir.x, this.hamborgir.y);
      if (this.dogeIndexes.includes(hamborgirIndex)) {
        this.hamborgir = new Hamborgir();
        this.showHamborgir();
      } else {
        this.board[hamborgirIndex].classList.add('hamborgir');
      }
    }

    showDoge() {
      this.doge = new Doge();
      dogeIndex = this.getIndex(this.doge.x, this.doge.y);
      catIndex = this.getIndex(this.cat.x, this.cat.y);
      hamborgirIndex = this.getIndex(this.hamborgir.x, this.hamborgir.y);

      if (this.dogeIndexes.includes(dogeIndex) || dogeIndex === catIndex || dogeIndex === hamborgirIndex) {
        this.showDoge();
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
      hamborgirIndex = this.getIndex(this.hamborgir.x, this.hamborgir.y);
      catIndex = this.getIndex(this.cat.x, this.cat.y);

      if (catIndex === hamborgirIndex) {
        hamborgirAudio.play();
        this.board[hamborgirIndex].classList.remove('hamborgir');
        this.score += 1;
        document.querySelector('#score').innerText = this.score;
        this.hamborgir = new Hamborgir();
        if (this.score % 3 === 0) {
          this.showDoge();
        }
        this.showHamborgir();

      }
    }

    gameOver() {
      if (this.cat.x < 0 || this.cat.x > 9 || this.cat.y < 0 || this.cat.y > 9 || this.dogeIndexes.includes(catIndex)) {
        clearInterval(this.startIntervalId);
        if (this.dogeIndexes.includes(catIndex)) {
          dogeAudio.play();
          setTimeout(function () {
            dogeAudio.play();
          }, 600);
        }
        this.cat.x = -1;
        this.cat.y = -1;
        document.querySelector('#over').classList.remove('invisible');
        document.querySelector('#over .over span').innerText = this.score;
        document.querySelector('.hamborgir').classList.remove('hamborgir');
        doges = document.querySelectorAll('.doge');
        console.log(doges);
        doges.forEach((e) => e.classList.remove('doge'));

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

  function start() {
    startAudio.play();
    const newGame = new Game();
    newGame.showCat();
    newGame.showHamborgir();
    newGame.startGame();
    document.addEventListener('keydown', (event) => {
      newGame.turnCat(event);
    });
  }

  document.querySelector('#start').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#start-game').classList.add('invisible');
    startAudio.play();
    const newGame = new Game();
    newGame.showCat();
    newGame.showHamborgir();
    newGame.startGame();
    document.addEventListener('keydown', (event) => {
      newGame.turnCat(event);
    });
  })

  document.querySelector('#replay').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#over').classList.add('invisible');
    document.querySelector('#score').innerText = 0;
    startAudio.play();
    const newGame = new Game();
    newGame.showCat();
    newGame.showHamborgir();
    newGame.startGame();
    document.addEventListener('keydown', (event) => {
      newGame.turnCat(event);
    });
  })



});
