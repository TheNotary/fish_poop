
function init() {
  background.src = 'assets/background.png'
}


function draw() {
  if (window.ctx == undefined)
    window.ctx = document.getElementById('canvas').getContext('2d');

  // re-draw background
  // ctx.clearRect(0, 0, 500, 150); // clear entire canvas...
  ctx.drawImage(background,
    20, 40,   // src position
    500, 150,   // src bounds (width/ height)
    0, 0,    // dst position
    1 * 500, 1 * 150);  // dst bounds

  // Draw all objects
  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];
    obj.draw(ctx);
  }
}


function battle_screen_update() {
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

    // Handle if mario is hit by the ghost
    if (obj.type == "ghost") {
      if (window.myMario.stance != "dieing" && obj.x > 420) {
        obj.setStance("floating");
        // alert("I touched mario");
        window.myMario.setStance("dieing");
      }
    }

    // destroy completed objects
    if (obj.destroyMe) {
      animationObjects.splice(i, 1);
      i--;
    }
  }
}



window.animationObjects = [];
window.background = new Image();

debugMode = false;

window.game = new KeyboardMemory(
  debugMode,
  { "screens": [ "title_screen", "battle_screen"] }
);

init();

game.start();


// spawnCoin([0, 50]);

// spawnBlah();
