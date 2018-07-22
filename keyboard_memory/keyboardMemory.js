// This file should be the ... 'heart' of the game....
//
//

window.KeyboardMemory = function(debugMode) {
  var that = this; // need to store this variable to help out animations which have their own 'this' value which confuses things
  this.debugMode = debugMode;
  this.getCurrentScreen = function() { return this.screens[this.currentScreen] };

  var levels = [
    {
      "background": 'assets/backgrounds/fields.png',
    },
    {
      "background": 'assets/backgrounds/sewers.png',
    }
  ];


  this.configs = {
    "debugMode": false,
    "screens":
      [
        // {
        //   "name": "title_screen",
        //   "constructor": null
        // },
        {
          "name": "coin_ghost_challenge_screen",
          "default": true,
          "constructor": CoinGhostChallengeScreen,
          "canvasId": "canvas",
          "canvasWidth": 1000,
          "canvasHeight": 700,
          "menuId": 'stats',
          "bgMusicId": 'audBattle',
          "levels": levels
        }
      ]
  };


  // this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
  //     null, '/images/ui/title_screen.png');
  //

  this.screens = {};

  if (this.Graphics != undefined)
    this.graphics = new this.Graphics();

  if (this.Sound != undefined)
    this.sound = new this.Sound();


  // Calling this method will initiate the game
  this.start = function() {
      window.addEventHandlersToDom();

      this.initScreens();

      // queue up the game loop to itereate whenever the browser can
      window.onEachFrame(game.main);
      // // Put the game into motion by begining the titleScreen sequence
      // this.titleScreen.begin();

      if (this.debugMode) window.debuggingFunctions();
  };

  this.resetChallenge = function(nCoins) {
    this.getCurrentScreen().animationObjects = [];

    spawnMario();
    spawnCoinBox(nCoins);
    spawnGhost();
  }

  this.initScreens = function() {
    var configs = this.configs;
    for (var i = 0; i < configs['screens'].length; i++) {
      var screenData = configs['screens'][i];
      var sName = screenData["name"];
      var sConstructor = screenData["constructor"];
      this.screens[sName] = new sConstructor(screenData);
      this.screens[sName].init();

      if (screenData['default']) {
        this.currentScreen = sName;
      }
    }

    this.getCurrentScreen().context.scale(2,2);
    this.getCurrentScreen().context.save();
  }

  this.setLevel = function(val) {
    this.screens["coin_ghost_challenge_screen"]
  };

};


// Give KeyboardMemory a game loop pipeline via this mixin pattern
asGameLoop.call(KeyboardMemory.prototype);
