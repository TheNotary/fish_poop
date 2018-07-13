// This file should be the ... 'heart' of the game....
//
//

window.KeyboardMemory = function(debugMode, configs) {
  this.debugMode = debugMode;
  this.currentScreen = "battle_screen";

  // this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
  //     null, '/images/ui/title_screen.png');
  //
  // this.battleScreen = new BattleScreen('battle_screen', 'audBattle', 'battle_menu');
  //
  // this.graphics = new this.Graphics();
  // this.sound = new this.Sound();


  // Calling this method will initiate the game
  this.start = function() {
      window.addEventHandlersToDom();

      // queue up the game loop to itereate whenever the browser can
      window.onEachFrame(game.main);
      // // Put the game into motion by begining the titleScreen sequence
      // this.titleScreen.begin();

      if (this.debugMode) window.debuggingFunctions();
  };

  this.resetChallenge = function(nCoins) {
    window.animationObjects = [];

    spawnMario();
    spawnCoinBox(nCoins);
    spawnGhost();
  }
};


// Give KeyboardMemory a game loop pipeline via this mixin pattern
asGameLoop.call(KeyboardMemory.prototype);
