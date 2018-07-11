var animationObjects = [];


var ghost = new Image();  // deleteme

function init() {
  ghost.src = 'assets/enemies.png';
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();

  var a = parseInt(document.getElementById('inputa').value)
  // b = parseInt(document.getElementById('inputb').value)

  // Draw all objects
  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];
    obj.draw(ctx);
  }

  window.requestAnimationFrame(draw);
}



function battle_screen_update() {
  // Do ordinary updates
  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];
    obj.update();
  }

  // Move the ghost
  if (window.myGhost  != undefined){
    window.myGhost.x = window.myGhost.x + 1;
  }
}



debugMode = false;

window.game = new KeyboardMemory(
  debugMode,
  { "screens": [ "title_screen", "battle_screen"]
  }
);

init();

game.start();
