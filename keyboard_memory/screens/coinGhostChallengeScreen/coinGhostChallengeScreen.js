function CoinGhostChallengeScreen(screenConfig) {
  Screen.call(this, screenConfig);
  this.levels = screenConfig['levels']
  this.animationObjects = [];
  this.introFinished = false;

  this.level = window.currentLevel;


  this._heroQueue = []; // int IDs... first on last off

  this.__defineGetter__("heroQueue", function() {
    return this._heroQueue;
  });
  this.__defineSetter__("heroQueue", function(val) {
    alert('pop');
    this._heroQueue = val;
  });
}

CoinGhostChallengeScreen.prototype = new Screen();


CoinGhostChallengeScreen.prototype.update = function() {
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

    if (obj.type == "ghost") {
      // Handle if mario is touched by the ghost
      if (window.myMario.stance != "dieing" && obj.x > 420) {
        obj.setStance("floating");
        // alert("I touched mario");
        window.myMario.setStance("dieing");
        end_game();
      }

      // Handle if mario has gotten all the coins
      if (window.myCoinBox.fx_loot['treasure'].length <= 0) {
        obj.destroyMe = true;
        end_game();
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
  var lvl = window.currentLevel;
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
  var index_element = document.getElementById('debug-int');
  var spriteIndex = parseInt(index_element.innerHTML);

  switch (evt.keyCode) {
    case 39: // right arrow
      var val = (spriteIndex + 1) % (window.debugTarget.getProperFrames().length);
      setSpriteIndex(val);
      window.debugTarget.spriteIndex_i = val;
      break;
    case 37: // left arrow
      var val = (spriteIndex - 1) % (window.debugTarget.getProperFrames().length);
      if (val < 0)
        val = window.debugTarget.getProperFrames().length - 1;
      setSpriteIndex(val);
      window.debugTarget.spriteIndex_i = val;
      break;
  }
};


CoinGhostChallengeScreen.prototype.setLevel = function(val) {
  this.level = val;
}

CoinGhostChallengeScreen.prototype.init = function() {
  var config = this.screenConfig;

  for (var i = 0; i < this.levels.length; i++) {
    var lvl = this.levels[i];

    // load up the graphics for this level
    lvl['bgImage'] = new Image();
    lvl['bgImage'].src = lvl['background'];
  }

}
