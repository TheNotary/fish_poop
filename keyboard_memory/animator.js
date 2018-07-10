// I need to make it so I

function sprite_left() {
  var index_element = document.getElementById('inputa')

  var val = parseInt(index_element.value);

  var new_val = val - 1;
  if (new_val < 0) {
    new_val = enemies_data["frames"].length - 1;
  }

  index_element.value = new_val;
}

function sprite_right() {
  var index_element = document.getElementById('inputa')

  var val = parseInt(index_element.value);

  var new_val = val + 1;
  if (new_val > enemies_data["frames"].length - 1) {
    new_val = 0;
  }

  index_element.value = new_val;
}


var ghost = new Image();
var a = -151;
var b = -150;

function init() {
  ghost.src = 'assets/enemies.png';
  // ghost.src = 'assets/a.png';
  window.requestAnimationFrame(draw);
  // draw();
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  a = parseInt(document.getElementById('inputa').value)
  // b = parseInt(document.getElementById('inputb').value)


  // a = a + 1;

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

  // src offsets   /  dst position    /
  ctx.drawImage(ghost,
    1, 215,   // src position
    sprite_frame_x, sprite_frame_y,   // src bounds (width/ height)
    20, 0,    // dst position
    sprite_frame_x, sprite_frame_y);  // dst bounds


  var data = enemies_data["frames"][a]
  var data = enemies_data["frames"][a]

  var frame = data["frame"]

  ctx.drawImage(ghost,
    frame['x'], frame['y'],   // src position
    frame['w'], frame['h'],   // src bounds (width/ height)
    60, 20,    // dst position
    frame['w'], frame['h']);  // dst bounds

  window.requestAnimationFrame(draw);
}


// init();




function updateGame() {


}



window.KeyboardMemory = function(debugMode) {
  this.debugMode = debugMode;

  // this variable tracks the current UI being displayed...
  // It's useful for the render loop to know what to render...
  // We'll see how that turns out when I have more code down...
  this.currentScreen = "battle_screen";

  // this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
  //     null, '/images/ui/title_screen.png');
  //
  // this.battleScreen = new BattleScreen('battle_screen', 'audBattle', 'battle_menu');
  //
  // this.graphics = new this.Graphics();
  // this.sound = new this.Sound();


  // Calling this method will initiate the game
  this.start = function() {
      // addEventHandlersToDom();

      // queue up the game loop to itereate whenever the browser can
      window.onEachFrame(game.main);
      // // Put the game into motion by begining the titleScreen sequence
      // this.titleScreen.begin();

      if (this.debugMode) debuggingFunctions();
  };
};



// Give KeyboardMemory a game loop pipeline via this mixin pattern
asGameLoop.call(KeyboardMemory.prototype);

debugMode = false;
window.game = new KeyboardMemory(debugMode);

// downloads .png files needed to play
// game.graphics.loadBaseImages();
ghost.src = 'assets/enemies.png';

game.start();
