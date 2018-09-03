if (Screen == undefined)
  var Screen = require("../../engine/screen.js");  // For tests only, browser ignores this

// console.log("HIHIHIH: " + Screen)


function CoinGhostChallengeScreen(screenConfig) {
  if (screenConfig === undefined) return;
  Screen.call(this, screenConfig);
  this.levels = screenConfig['levels'];
  this.animationObjects = [];
  this.introFinished = false;

  this.level = 0;
  this.part = 1; // deprecated
}


CoinGhostChallengeScreen.prototype = new Screen();

CoinGhostChallengeScreen.prototype.init = function(that) {
  var config = this.screenConfig;

  for (var i = 0; i < this.levels.length; i++) {
    var lvl = this.levels[i];

    // load up the graphics for this level
    lvl['bgImage'] = that.graphics.loadImage(lvl['background'], that.signalHtmlLoadingBegun, that.signalHtmlGraphicLoadingComplete);
  }
}

CoinGhostChallengeScreen.prototype.update = function() {
  var animationObjects = this.animationObjects;;

  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];

    // Handle default/ general sprite updates
    obj.update();

    // Handle any special effects/ conditions/ behaviors
    if (obj.effects[obj.stance] != undefined) {
      var activeEffect = obj.effects[obj.stance];
      if (activeEffect != undefined) {
        activeEffect["updateLogic"].call();
      }
    }

    if (obj.type == "ghost") {
      // Handle if mario is touched by the ghost
      if (window.myMario.stance != "dieing" && obj.x > 420) {
        obj.setStance("floating");
        // alert("I touched mario");
        window.myMario.setStance("dieing");
        end_game("Game Over");
      }

      // Handle if mario has gotten all the coins
      if (window.myCoinBox.fx_loot['treasure'].length <= 0) {
        obj.destroyMe = true;
        end_game("Great Work!");
      }
    }

    // destroy completed objects
    if (obj.destroyMe) {
      animationObjects.splice(i, 1);
      i--;
    }
  }
}

CoinGhostChallengeScreen.prototype.render = function() {
  var animationObjects = this.animationObjects;
  // re-draw background
  // ctx.clearRect(0, 0, 500, 150); // clear entire canvas...
  var canvasWidth = this.screenConfig['canvasWidth'] / 2;
  var canvasHeight = this.screenConfig['canvasHeight'] / 2;
  var lvl = this.level;
  var background = this.levels[lvl]['bgImage'];

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


CoinGhostChallengeScreen.prototype.handleKeys = function(evt) {
  if (window.debugTarget == undefined) return;
  var spriteIndex = window.debugTarget.spriteIndex_i;
  var debugTarget = window.debugTarget;

  switch (evt.keyCode) {
    case 38:  // Up arrow
      var val = (spriteIndex + 1) % (debugTarget.getProperFrames().length);
      debugTarget.spriteIndex_i = val;
      moveDebugTargetY(1);
      break;
    case 40:  // Down arrow
      var val = (spriteIndex + 1) % (debugTarget.getProperFrames().length);
      debugTarget.spriteIndex_i = val;
      moveDebugTargetY(-1);
      break;
    case 39: // right arrow
      var val = (spriteIndex + 1) % (debugTarget.getProperFrames().length);
      debugTarget.spriteIndex_i = val;
      moveDebugTargetX(-1);
      break;
    case 37: // left arrow
      var val = (spriteIndex - 1) % (debugTarget.getProperFrames().length);
      if (val < 0)
        val = debugTarget.getProperFrames().length - 1;
      debugTarget.spriteIndex_i = val;
      console.log(debugTarget.spriteIndex_i)
      moveDebugTargetX(1);
      break;
  }
};


CoinGhostChallengeScreen.prototype.setLevel = function(newLevel) {
  this.level = newLevel;

  // reset the animation objects
  this.animationObjects = [];
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = CoinGhostChallengeScreen
}
