document.addEventListener("DOMContentLoaded", function(){
  var Game = require("./game.js");




  document.querySelector("button#start").addEventListener("click", function () {

    document.querySelector("#start-game").classList.add("invisible");
    var game = new Game ();
    game.showFurry();
    game.showCoin();
    game.startGame();
    document.addEventListener('keydown', function(event){
      game.turnFurry(event);
    });
  });

  document.querySelector("button.play-again").addEventListener("click", function () {
    game = new Game ();
    game.showFurry();
    game.showCoin();
    game.startGame();
    this.score = 0;
    document.addEventListener('keydown', function(event){
      game.turnFurry(event);
    });
    document.querySelector("#score strong").innerText = this.score;
    document.querySelector("#over").classList.add("invisible");

  })

});
