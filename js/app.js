document.addEventListener('DOMContentLoaded', () => {
  require('../sass/style.scss');

  const handleHighScores = require("./high-scores.js");


// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDKXBdhLY9BlVawqs8fqA74wfilfrVfPKU",
    authDomain: "hamborgir-scores.firebaseapp.com",
    databaseURL: "https://hamborgir-scores.firebaseio.com",
    projectId: "hamborgir-scores",
    storageBucket: "hamborgir-scores.appspot.com",
    messagingSenderId: "919591862688"
  };
  const Firebase = firebase.initializeApp(config);

// dom elements
  const gameModes = document.querySelectorAll('.game-mode li');
  const runMode = document.querySelector('#run-mode');
  const dogeMode = document.querySelector('#doge-mode');
  const scoring = document.querySelector('#scoring');
  const board = document.querySelector('#board');
  const highScoresList = document.querySelector('#scores');
  const addScoreBtn = document.querySelector('#add-score-btn');
  const nameInput = document.querySelector('#name-input');
  const addScore = document.querySelector('#add-score');
  const endScreen = document.querySelector('#end-screen');
  const highScores = document.querySelector('#highscores');
  const endScore = document.querySelector('#over .over span');

// game elements
  let hamborgirIndex = 0;
  let dogeIndex = 0;
  let catIndex = 0;
  let doges  = [];
  let gameSpeed = 250;
  let gameOn = true;
  let selectMenu = true;

//scores, elements etc
  let sortedScores;
  let scoreLi;
  let name;
  let lowestHighscore;
  let finalScore;

//sounds
  const startAudio = new Audio('sounds/start.wav');
  const dogeAudio = new Audio('sounds/bark.wav');
  const hamborgirAudio = new Audio('sounds/coin.wav');
  const gameoverAudio = new Audio('sounds/gameover.wav');
  const selectAudio = new Audio('sounds/select.wav');


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

      if (this.cat.x < 0 || this.cat.x > 9 || this.cat.y < 0 || this.cat.y > 9 || this.dogeIndexes.includes(catIndex)) {
        this.gameOver();
      }

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

        if (dogeMode.classList.contains('selected') && this.score % 3 === 0) {
          this.showDoge();
        }

        this.showHamborgir();

        if (runMode.classList.contains('selected') && this.score > 0 && this.score % 3 === 0) {
          gameSpeed -= 10;
        }
      }
    }

    gameOverAudio() {
      if (this.dogeIndexes.includes(catIndex)) {
        dogeAudio.play();
        setTimeout(function () {
          dogeAudio.play();
        }, 600);
      } else {
        gameoverAudio.play();
      }
    }

    gameOverSetStuff() {
      finalScore = this.score;
      this.cat.x = -1;
      this.cat.y = -1;
      document.querySelector('.hamborgir').classList.remove('hamborgir');
      doges = document.querySelectorAll('.doge');
      doges.forEach((e) => e.classList.remove('doge'));
      gameOn = false;
      endScore.innerText = this.score;
      board.classList.add("invisible");
      scoring.classList.add('invisible');
      endScreen.classList.remove('invisible');
    }

    gameOverFirebase() {
      Firebase.database().ref("/").once("value")
        .then((snap) => (snap.val().sort((a, b) => b.score - a.score)))
        .then((sortedScores) => sortedScores.slice(0, 10))
        .then((topScores) => topScores[topScores.length-1].score)
        .then((lowestHighScore) => {
          if (finalScore >= lowestHighScore) {
            addScore.classList.remove('invisible');
            this.addHighScore();
          } else {
            this.displayHighScores();
          }
        })
    }

    gameOver() {
      console.log("wchodzi gameOver");
      clearInterval(this.startIntervalId);
      this.gameOverAudio();
      this.gameOverSetStuff();
      this.gameOverFirebase();
    }

    addHighScore() {
      const currentScore = this.score;
      addScoreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("submit event");
        addScore.classList.add('invisible');
        name = nameInput.value;

        Firebase.database().ref('/').once('value') // to wchodzi dwa razy
          .then((snap) => snap.val().length)
          .then((dbLength) => {
            Firebase.database().ref("/" + dbLength).set({
              name: name,
              score: currentScore
  	         });
          })
          .then(() => this.displayHighScores());
      });
    }

    displayHighScores() {
      console.log("wchodzi displayHighScores");

      Firebase.database().ref("/").once("value")
        //.then((snap) => console.log(snap.val()))
        .then((snap) => snap.val().sort((a, b) => b.score - a.score))
        .then((sortedScores) => sortedScores.slice(0, 10))
        .then((topTen) => topTen.map((e) => {
          scoreLi = document.createElement("li");
          scoreLi.innerText = `${e.name} : ${e.score}`;
          highScoresList.appendChild(scoreLi);
        }));
      highScores.classList.remove('invisible');
    }

    startGame() {
      const that = this;

      const catTimeout = function() {
        that.hideVisibleCat();
        that.moveCat();
        if (gameOn === true) {
          setTimeout(catTimeout, gameSpeed);
        }
      }
      setTimeout(catTimeout, gameSpeed);

    }
  }


  document.addEventListener('keydown', (e) => {
    if ((e.which === 38 || e.which === 40) && selectMenu === true) {
      selectAudio.play();
      runMode.classList.toggle('selected');
      dogeMode.classList.toggle('selected');
    } else if (e.which === 13) {
      selectMenu = false;
      document.querySelector('#start-game').classList.add('invisible');
      startAudio.play();
      const newGame = new Game();
      newGame.showCat();
      newGame.showHamborgir();
      newGame.startGame();
      document.addEventListener('keydown', (event) => {
        newGame.turnCat(event);
      });
    }
  });

  document.querySelector('#replay').addEventListener('click', (e) => {
    e.preventDefault();
    gameOn = true;
    gameSpeed = 250;

    endScreen.classList.add('invisible');
    highScores.classList.add('invisible');
    scoring.classList.remove('invisible');
    board.classList.remove("invisible");

//emptying scoring list
    while (highScoresList.firstChild) {
      highScoresList.removeChild(highScoresList.firstChild);
    };


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


// document.querySelector('#start').addEventListener('click', (e) => {
//   e.preventDefault();
//   selectMenu = false;
//   document.querySelector('#start-game').classList.add('invisible');
//   startAudio.play();
//   const newGame = new Game();
//   newGame.showCat();
//   newGame.showHamborgir();
//   newGame.startGame();
//   document.addEventListener('keydown', (event) => {
//     newGame.turnCat(event);
//   });
// })




// Firebase.database().ref('/').on('value', (snap) => {
//   return snap.val().length;
// });

//   const postScore = new Promise((resolve, reject) => {
//     resolve(console.log(this.score));
//     Firebase.database().ref("/5").push({
//       name: "bbb",
//       score: 78
//     });
//   });
//
//   postScore.then(console.log("yyyy"))
//            .then(this.displayHighScores());
// })


      // , (snap) => {
      //   sortedScores = snap.val().sort((a, b) => {
      //     return b.score - a.score;
      //   });
      //
      //   sortedScores = sortedScores.slice(0, 10);
      //
      //   sortedScores.map((e) => {
      //     scoreLi = document.createElement("li");
      //     scoreLi.innerText = `${e.name} : ${e.score}`;
      //     highScoresList.appendChild(scoreLi);
      //   });
      //   highScores.classList.remove('invisible');
      // });




            // this.startIntervalId = setInterval(() => {
            //   that.hideVisibleCat();
            //   that.moveCat();
            // }, 250);



              // function start() {
              //   startAudio.play();
              //   const newGame = new Game();
              //   newGame.showCat();
              //   newGame.showHamborgir();
              //   newGame.startGame();
              //   document.addEventListener('keydown', (event) => {
              //     newGame.turnCat(event);
              //   });
              // }
