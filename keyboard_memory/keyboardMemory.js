// This file should be the ... 'heart' of the game....
//
//

window.KeyboardMemory = function(debugMode, configs) {
  var that = this;
  this.debugMode = debugMode;
  this.currentScreen = "coin_ghost_challenge_screen";
  this.getCurrentScreen = function() { return that.screens[that.currentScreen]}

  this.screens = {
    "coin_ghost_challenge_screen": new CoinGhostChallengeScreen('canvas', 'audBattle', 'stats')
  };
  // this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
  //     null, '/images/ui/title_screen.png');
  //


  if (this.Graphics != undefined)
    this.graphics = new this.Graphics();

  if (this.Sound != undefined)
    this.sound = new this.Sound();


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
    that.getCurrentScreen().animationObjects = [];

    spawnMario();
    spawnCoinBox(nCoins);
    spawnGhost();
  }
};


// Give KeyboardMemory a game loop pipeline via this mixin pattern
asGameLoop.call(KeyboardMemory.prototype);
