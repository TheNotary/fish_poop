var animationObjects = [];

var myGhost = new Unit("ghost", 0, "assets/enemies.png", [70, 70], "floating");
animationObjects << myGhost;


var ghost = new Image();

function init() {
  ghost.src = 'assets/enemies.png';
  myGhost.loadGraphics();
  // window.requestAnimationFrame(draw);
  // draw();
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  var a = parseInt(document.getElementById('inputa').value)
  // b = parseInt(document.getElementById('inputb').value)

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();
  // ctx.translate(0, 0);

  // DRAW a thing
  var time = new Date();
  // ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  // ctx.translate(105, 0);
  // ctx.fillRect(0, -12, 50, 24); // Shadow

  sprite_frame_x = 32;
  sprite_frame_y = 25;


  var data = enemies_data["frames"][a]
  var data = enemies_data["frames"][a]

  var frame = data["frame"]

  ctx.drawImage(ghost,
    frame['x'], frame['y'],   // src position
    frame['w'], frame['h'],   // src bounds (width/ height)
    60, 20,    // dst position
    frame['w'], frame['h']);  // dst bounds




  myGhost.draw(ctx);

  window.requestAnimationFrame(draw);
}



function battle_screen_update() {

}



debugMode = false;

window.game = new KeyboardMemory(
  debugMode,
  { "screens": [ "title_screen", "battle_screen"]

  }
);

init();

game.start();
