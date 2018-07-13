var animationObjects = [];

var background = new Image();

function init() {
  background.src = 'assets/background.png'
}

var ctx = document.getElementById('canvas').getContext('2d');

function draw() {
  // ctx.clearRect(0, 0, 500, 150); // clear entire canvas...

  // re-draw background
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



// TODO: refactor into jumpable.js
window.jump = {
  "direction": "up",
  "jumpPower": 10
};


function battle_screen_update() {
  // Do ordinary updates
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

  // Handle the ghost Moving
  if (window.myGhost != undefined) {
    window.myGhost.x = window.myGhost.x + 1;
  }

}



debugMode = false;

window.game = new KeyboardMemory(
  debugMode,
  { "screens": [ "title_screen", "battle_screen"] }
);

init();

game.start();

spawnMario();
spawnCoinBox();


spawnCoin();


// spawnMario();

// spawnBlah();
