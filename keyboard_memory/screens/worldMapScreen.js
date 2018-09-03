if (Screen == undefined)
  var Screen = require("../engine/screen.js");  // For tests only, browser ignores this


function WorldMapScreen(screenConfig) {
  Screen.call(this, screenConfig);
  // this.levels = screenConfig['levels']
  this.animationObjects = [];
}


WorldMapScreen.prototype = new Screen();

WorldMapScreen.prototype.init = function(that) {
  var config = this.screenConfig;


}

WorldMapScreen.prototype.update = function() {
  var animationObjects = this.animationObjects;;

  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];

    // Handle default/ general sprite updates
    if (!obj.isBeingDebugged) {
      obj.update();
    }

    // Handle any special effects/ conditions/ behaviors
    if (obj.effects[obj.stance] != undefined) {
      var activeEffect = obj.effects[obj.stance];
      if (activeEffect != undefined) {
        activeEffect["updateLogic"].call();
      }
    }

    // destroy completed objects
    if (obj.destroyMe) {
      animationObjects.splice(i, 1);
      i--;
    }
  }
}

WorldMapScreen.prototype.render = function() {
  var animationObjects = this.animationObjects;
  // re-draw background
  // ctx.clearRect(0, 0, 500, 150); // clear entire canvas...
  var canvasWidth = this.screenConfig['canvasWidth'] / 2;
  var canvasHeight = this.screenConfig['canvasHeight'] / 2;

  var background = game.screens["coin_ghost_challenge_screen"].levels[0]['bgImage']
  // var lvl = this.level;
  // var background = this.levels[lvl]['bgImage'];


  this.context.drawImage(background,
    20, 40,     // src position
    canvasWidth, canvasHeight,   // src bounds (width/ height)
    0, 0,       // dst position
    canvasWidth, canvasHeight);  // dst bounds

  // Draw all objects
  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];
    obj.draw(this.context);
  }
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = WorldMapScreen
}
