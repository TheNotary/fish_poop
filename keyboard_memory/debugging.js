
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
  // load_sprite_data("assets/enemies.json")

  var stances = {
      "floating": {
        "spriteIndecies": [4, 5],
        "animationCycleSlowness": 10
      }
  };

  window.myGhost = new Unit("ghost", 0, "assets/enemies.png", enemies_data,
    [0, 75], stances, "floating");
  window.animationObjects.push(myGhost);
  myGhost.loadGraphics();
}


function spawnMario() {
    // load_sprite_data("assets/mario.json")

    var stances = {
        "standing": {
            "spriteIndecies": [4],
            "animationCycleSlowness": 0
        },
        "jumping": {
            "spriteIndecies": [0, 1, 2, 3, 3],
            "animationCycleSlowness": 5
        }
    };

    window.myMario = new Unit("mario", 0, "assets/mario.png", mario_data, [450, 85], stances, "standing");
    window.animationObjects.push(myMario);
    myMario.loadGraphics();
}


function interaction() {
    // jump mario
    window.myMario.stance = "jumping";
}





function useArrowKeysToMoveCanvasSprite() {
    myProc = document.onkeydown;
    document.onkeydown = function(evt) {
        myProc.call(this, evt); // do the thing that onkeydown is meant to do in production mode too...

        if (game.currentScreen == "battle_screen") {
            switch (evt.keyCode) {
                case 39: // right arrow
                    alert(game.battleScreen.mobs[0].position);
                    break;
                case 37: // left arrow
                    game.battleScreen.mobs[0].setY(game.battleScreen.mobs[0].y + 1);
                    break;
            }

        }
    }
}



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
    game.titleScreen.audio.volume = 0.1;

    // make it so there is no delay on titlescreen
    game.removeTitleScreenDelay = true;

    // auto skip title screen
    game.titleScreen.ExitScreen("intro-on_air_ship");

    useArrowKeysToMoveCanvasSprite();
}
