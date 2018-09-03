// This file should be the ... 'heart' of the game.... though configuration should happen in index.js...
//
//
if (asGameLoop == undefined)
  var asGameLoop = require("./engine/gameLoop.js");

if (Graphics == undefined) {
  var AL = require("./assetLoading.js");
  var Graphics = AL.Graphics;
  var Sound = AL.Sound;
}

if (WorldMapScreen == undefined)
  var WorldMapScreen = require("./screens/worldMapScreen.js");

if (CoinGhostChallengeScreen == undefined)
  var CoinGhostChallengeScreen = require("./screens/coinGhostChallengeScreen/coinGhostChallengeScreen.js");

if (TrainingScreen == undefined)
  var TrainingScreen = require("./screens/trainingScreen.js");



function KeyboardMemory(params, window) {
  var that = this; // need to store this variable to help out animations which have their own 'this' value which confuses things
  this.debugMode = params.debugMode;
  var document = window.document;
  this.graphics = new Graphics();
  this.sound = new Sound();
  this.currentScreen = "";
  this.getCurrentScreen = function() { return this.screens[this.currentScreen] };
  this.setCurrentScreen = function(screen_name) { this.currentScreen = screen_name };

  this.levels = [
    {
      "background": 'assets/backgrounds/fields.png',
    },
    {
      "background": 'assets/backgrounds/sewers.png',
    },
    {
      "background": 'assets/backgrounds/bean_valley.png',
    }
  ];


  this.training_level = [
    {
      "background": 'assets/backgrounds/dojo.png'
    }
  ];

  this.configs = {
    "screens":
      [
        // {
        //   "name": "title_screen",
        //   "constructor": null
        // },
        {
          "name": "world_map_screen",
          "default": false,
          "constructor": WorldMapScreen,
          "canvasId": "canvas",
          "canvasWidth": 1000,
          "canvasHeight": 700,
          "menuId": 'stats',
          "bgMusicId": 'audBattle'
        },
        {
          "name": "coin_ghost_challenge_screen",
          "default": true,
          "constructor": CoinGhostChallengeScreen,
          "canvasId": "canvas",
          "canvasWidth": 1000,
          "canvasHeight": 700,
          "menuId": 'stats',
          "bgMusicId": 'audBattle',
          "levels": this.levels
        },
        {
          "name": "training_screen",
          "default": false,
          "constructor": TrainingScreen,
          "canvasId": "canvas",
          "canvasWidth": 1000,
          "canvasHeight": 700,
          "menuId": 'stats',
          "bgMusicId": 'audBattle',
          "levels": this.training_level
        }
      ]
  };


  // this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
  //     null, '/images/ui/title_screen.png');
  //

  this.screens = {};




  // Calling this method will initiate the game
  this.start = function() {
      window.addEventHandlersToDom();

      this.initAssets();
      this.initScreens();

      // queue up the game loop to itereate whenever the browser can
      window.onEachFrame(game.main);
      // // Put the game into motion by begining the titleScreen sequence
      // this.titleScreen.begin();

      if (this.debugMode) window.debuggingFunctions();
  };


  // In the future, this method would initiate the AJAX loading of this data
  // but for now it's just the interface to it
  this.initAssets = function() {
    this.animationData = {};

    this.animationData['coinbox'] = coinbox_data;
    this.animationData['coin'] = coins_data;
    this.animationData['enemy'] = enemies_data;
    this.animationData['mario'] = mario_data;
    this.animationData['toad'] = toad_data;

    var p = this.animationData;
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        let spriteSheetName = p[key]['meta']['image'];
        this.graphics.loadImage("assets/" + spriteSheetName, this.signalHtmlLoadingBegun, this.signalHtmlGraphicLoadingComplete);
      }
    }
  };

  this.initScreens = function() {
    var configs = this.configs;
    for (var i = 0; i < configs['screens'].length; i++) {
      var screenData = configs['screens'][i];
      var sName = screenData["name"];
      var sConstructor = screenData["constructor"];
      this.screens[sName] = new sConstructor(screenData);
      this.screens[sName].init(that);

      if (screenData['default']) {
        this.currentScreen = sName;
      }
    }

    this.getCurrentScreen().context.scale(2,2);
    this.getCurrentScreen().context.save();
  }

  this.switchScreen = function(newScreen) {
    this.currentScreen = newScreen;
    return this.getCurrentScreen();
  }

  this.setLevel = function(val) {
    this.screens["coin_ghost_challenge_screen"].setLevel(val);
  };


  //
  // Stuff related to signaling load of graphics (yuck)...
  //

  this.signalHtmlGraphicLoadingComplete = function(graphics, spriteSheetPath) {
    var spriteElementLookup = {
      "assets/enemies.png": "ghost-img",
      "assets/mario.png": "mario-img",
      "assets/coins.png": "coinbox-img",
      "assets/backgrounds/fields.png": "fields-img" };

    that.specifyToHtmlThatAssetsLoaded(spriteElementLookup[spriteSheetPath]);
    that.updateLoadingCountElement(graphics.loadingImages.length);
  };

  this.signalHtmlLoadingBegun = function(graphics, spriteSheetPath) {
    that.updateLoadingCountElement(graphics.loadingImages.length);
  };

  this.updateLoadingCountElement = function(count) {
    var countEl = document.getElementById("loading-count")
    countEl.innerHTML = count;
    if (count == 0) { // Hide the loading HTML element if we're done loading...
      document.getElementById("load-status").style.display = "none";
      this.stopLoadingAnimation();
      var overlay = document.getElementById('overlay-message')
      overlay.innerHTML = "Press Start";
    }
    else {
      document.getElementById("load-status").style.display = "block";
      this.startLoadingAnimation();
    }
  };

  this.specifyToHtmlThatAssetsLoaded = function(elId) {
    if (elId == null)
      if (game.debugMode == true) console.log("Attempted to report completed image load, but no HTML element was specified to indicate it's load status.");
    var el = document.getElementById(elId);
    if (el != null)
      el.innerHTML = "Loaded";
  };

  this.startLoadingAnimation = function() {
    clearInterval(window.dotTimer);

    window.dotTimer = setInterval( _ => {
      var dots = document.getElementById("loading-dots");
      dots.innerHTML += ".";
      if (dots.innerHTML.length > 3)
        dots.innerHTML = ".";
    }, 500);

  };

  this.stopLoadingAnimation = function() {
    clearInterval(window.dotTimer);
    var dots = document.getElementById("loading-dots");
    dots.innerHTML = "";
  };


};

// Give KeyboardMemory a game loop pipeline via this mixin pattern
asGameLoop.call(KeyboardMemory.prototype);

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = KeyboardMemory;
}
