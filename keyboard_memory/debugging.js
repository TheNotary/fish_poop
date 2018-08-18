
// This method let's you debug sprite objects...
// left and right buttons will set the sprite index, and the normal update
// phase of the spriteObj will be skipped...
function setDebugTarget(spriteObj) {
  window.debugTarget = spriteObj;
  debugTarget.isBeingDebugged = true;
  var startingSpriteIndex = ( debugTarget.stances[ debugTarget["stance"] ]["spriteIndecies"].length - 1 );
  // startingSpriteIndex = 10; // force starting sprite to be something other than last
  // document.getElementById('debug-int').innerHTML = startingSpriteIndex;
  window.debugTarget.spriteIndex_i = startingSpriteIndex;
}

function setSpriteIndex(val) {
  var index_element = document.getElementById('debug-int');
  index_element.innerHTML = val;
}

function moveDebugTargetX(amount) {
  console.log("X: " + debugTarget.x);
  debugTarget.x = debugTarget.x - amount;
  console.log("X: " + debugTarget.x);
}

function moveDebugTargetY(amount) {
  debugTarget.y = debugTarget.y - amount;
}


function sprite_left() {
  myGhost.x = myGhost.x - 1;

  var index_element = document.getElementById('inputa')

  var val = parseInt(index_element.value);

  var new_val = val - 1;
  if (new_val < 0) {
    new_val = enemies_data["frames"].length - 1;
  }

  index_element.value = new_val;
}


function sprite_right() {
  myGhost.x = myGhost.x + 1;

  var index_element = document.getElementById('inputa')

  var val = parseInt(index_element.value);

  var new_val = val + 1;
  if (new_val > enemies_data["frames"].length - 1) {
    new_val = 0;
  }

  index_element.value = new_val;
}


function spawnGhost() {
  var animationObjects = game.getCurrentScreen().animationObjects;
  window.myGhost = new Unit("ghost", 0, "assets/enemies.png", enemies_data, [0, 85], "floating", { "sizeMultiplier": 1.5});
  asMovable.call(myGhost);
  animationObjects.push(myGhost);
  window.myGhost.setStance("moving");

  configureGhostSpeed();
}

function configureGhostSpeed() {
  window.myGhost.fx_move = {
    "x": get_current_difficulty()["ghost_speed"],
    "y": 0
  };
}


function spawnMario() {
  var animationObjects = game.getCurrentScreen().animationObjects;
  var myMario = new Unit("mario", 0, "assets/mario.png", mario_data, [450, 95], "standing", { "sizeMultiplier": 1.5});
  asJumpable.call(myMario);
  animationObjects.push(myMario);
  window.myMario = myMario;
  return myMario;
}

function spawnToad() {
  var animationObjects = game.getCurrentScreen().animationObjects;
  var myToad = new Unit("toad", 0, "assets/npcs.png", toad_data, [450, 95], "standing", { "sizeMultiplier": 1.5});
  asJumpable.call(myToad);
  animationObjects.push(myToad);
  window.myToad = myToad;
  return myToad;
}

// pos = [0, 50]
function spawnCoin(pos) {
  var animationObjects = game.getCurrentScreen().animationObjects;
  window.myCoin = new Unit("coin", 0, "assets/coins.png", coins_data, pos, "exploding", { "sizeMultiplier": 1});
  asExplodable.call(window.myCoin);
  // setDebugTarget(myCoin);
  animationObjects.push(window.myCoin);
  return myCoin;
}

function spawnCoinBox(nCoins) {
  var animationObjects = game.getCurrentScreen().animationObjects;

  window.myCoinBox = new Unit("coinbox", 0, "assets/coins.png", coinbox_data, [448, 18], "lootable", { "sizeMultiplier": 1 });
  asLootable.call(window.myCoinBox);

  myCoinBox.fx_loot['treasure'] = [];
  for (var i = 0; i < nCoins; i++) {
    myCoinBox.fx_loot['treasure'].push("coin");
  }

  animationObjects.push(myCoinBox);
  return myCoinBox;
}


function switch_to_world_map() {
    game.setCurrentScreen("world_map_screen");
    // alert('hi')
}


function spawnSprite() {
    var sprite = spawnMario();
    // var sprite = spawnToad();
    sprite.setStance("walking");

    setDebugTarget(sprite);
    sprite.goTowards([0,0]);
}

function interaction() {
    // jump mario
    window.myMario.setStance("jumping");

    // window.myCoinBox.setStance("struck");
    // window.myGhost.setStance("moving");
}


// function useArrowKeysToMoveCanvasSprite() {
//     myProc = document.onkeydown;
//     document.onkeydown = function(evt) {
//         myProc.call(this, evt); // do the thing that onkeydown is meant to do in production mode too...
//
//         if (game.currentScreen == "coin_ghost_challenge_screen") {
//             var index_element = document.getElementById('debug-int');
//             var spriteIndex = parseInt(index_element.innerHTML);
//
//             switch (evt.keyCode) {
//                 case 39: // right arrow
//                     var val = spriteIndex + 1;
//                     setSpriteIndex(val);
//                     break;
//                 case 37: // left arrow
//                     var val = spriteIndex - 1;
//                     setSpriteIndex(val);
//                     break;
//             }
//
//         }
//     }
// }
// useArrowKeysToMoveCanvasSprite();


function printBoundingBox(mob) {
    var x
}


var avgFps = 0;
var framesGoneBy = 0;
var mozPaintOld = 0;
var mozPaintNew = 0;
var mozFps = 0;
var bankScore = "none yet";
var updatesRun = 0;
var drawsRun = 0;


function drawGraphicsDebugInfo(screen) {
    screen.context.fillStyle = "black";
    screen.context.fillRect(0, 0, 200, 50);
    screen.context.fillStyle = "white";


    //processTimeDebugInfo(screen);
    //return;

    screen.context.fillText("game time: " + game.time(), 10, 10); // Game Time
    screen.context.fillText("fps: " + game.fps(), 10, 20); // fps

    framesGoneBy = framesGoneBy + 1;
    avgFps = framesGoneBy / game.time();

    screen.context.fillText("framesGoneBy: " + framesGoneBy, 10, 30); //

    screen.context.fillText("avgFps: " + avgFps, 10, 40); //
    screen.context.fillText("bankScore: " + bankScore, 10, 50); // a sort of short benchmark, just so I can eyeball the effects of code changes

    //screen.context.fillText("updatesRun: " + updatesRun, 10, 40);
    //screen.context.fillText("DrawsRun: " + drawsRun, 10, 50);

    //screen.context.fillText("avg moz-fps: " + mozPaintCount/game.time(), 10, 50);    // fps
}


var thisSpotWasRun = 0;
var totTimeSpent = 0;
var timeSpentThisRun = 0;
var longestRun = 0;
var avgTimeSpent = 0;
var goldenScore = "";
var lastDrawTime = 0;
var timeBetweenCallingMain = 0;

function processTimeDebugInfo(screen) {
    if (timeSpentThisRun > longestRun) {
        longestRun = timeSpentThisRun;
    }

    screen.context.fillText("Function Hits: " + thisSpotWasRun, 10, 10);
    screen.context.fillText("Total Time Spent: " + totTimeSpent, 10, 20);
    screen.context.fillText("Time Spent This Hit: " + timeSpentThisRun, 10, 30);
    //screen.context.fillText("Longest Run: " + longestRun, 10, 40);
    screen.context.fillText("Time Spent OutSide Main: " + timeBetweenCallingMain, 10, 40);
    //screen.context.fillText("Average Time Spent: " + avgTimeSpent, 10, 50);
    screen.context.fillText("Golden Score: " + goldenScore, 10, 50);
}


function debuggingFunctions() {
    // make it so there is no sound on title screen
    // game.titleScreen.audio.volume = 0.1;

    // make it so there is no delay on titlescreen
    // game.removeTitleScreenDelay = true;

    // auto skip title screen
    // game.titleScreen.ExitScreen("intro-on_air_ship");

    useArrowKeysToMoveCanvasSprite();
}
