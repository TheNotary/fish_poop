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




window.jump = {
  "direction": "up",
  "jumpPower": 10
}


function battle_screen_update() {
  // Do ordinary updates
  for (var i = 0; i < animationObjects.length; i++) {
    var obj = animationObjects[i];
    obj.update();
  }

  // Move the ghost
  if (window.myGhost  != undefined) {
    window.myGhost.x = window.myGhost.x + 1;
  }

  // Handle Jumping....
  if (window.myMario  != undefined) {
    if (window.myMario.stance == "jumping") {
        var gravity = 1;      // m/s/s   (seconds are 1 tick, btw....)
        var startingJumpPower = 10; // m/s
        var max_jump_height = -100;

        if (window.jump["direction"] == "up") {
            jump_amount = -5;

            // window.jump["jumpPower"] = -1 * (window.jump["jumpPower"] - gravity);
        }
        else
            jump_amount = 5;


        window.myMario.animation_y = window.myMario.animation_y + jump_amount;

        if (window.jump["direction"] == "up" && window.myMario.animation_y < max_jump_height) {
            window.jump["direction"] = "down"
        }

        if (window.myMario.animation_y >= 0) {
            window.myMario.animation_y = 0;
            window.myMario.stance = "standing";
            window.jump["direction"] = "up"  // reset
        }
    }
  }
}



debugMode = false;

window.game = new KeyboardMemory(
  debugMode,
  { "screens": [ "title_screen", "battle_screen"] }
);

init();

game.start();
