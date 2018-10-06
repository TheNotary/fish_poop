// Variables

var gameStatus = 'stopped'
var gameMode = 'progression'


function keyboard_func(e) {
  var keyCode = e.keyCode

  handleEscape(keyCode)
  // fix safaris/ chrome macbook pro semicolon keyCode error
  if (keyCode == 186)
    keyCode = 59
  if (keyCode == 190)
    keyCode = 46

  if ( gameStatus == 'started' && gameMode == 'progression' ) {
    piffyCoinChallenge.keypress(keyCode)
  }

  if (keyCode == 32) {  // Space bar
    e.preventDefault(); // don't let space scroll the screen down
    if (gameStatus == 'stopped' && gameMode == 'progression') {
      start_round('progression')
    }
  }
}


function handleEscape(keyCode) {
  if (keyCode == 27)
    ui.clearMenus()
}


window.start_round = function(mode) {
  gameStatus = 'started'
  gameMode = mode

  ui.clearMenus()
  ui.handleOverlayGameStart()
  piffyCoinChallenge.clear_challenge()
  piffyCoinChallenge.clear_stats()

  reset_game_logic(mode)
}

window.end_round = function(msg) {
  gameStatus = 'stopped'

  ui.handleOverlayGameEnd(msg)
  piffyCoinChallenge.clear_challenge()
};


window.end_game = function(msg) {
  window.end_round(msg)
  reset_game_logic(gameMode)

  leveler.resetToFirstValidLevel()
}



function reset_game_logic(mode) {
  if (mode == "progression") {
    piffyCoinChallenge.resetGameLogicCoinChallenge(mode)
  }
  else if (mode == "training") {
    resetGameLogicTraining(mode)
  }
};





// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
  var a = array.slice(0);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


window.ui = {
  clearMenus: function() {
    if ( document.getElementById("settings-menu").style.display == "block")
      this.toggleSettings()
    if ( document.getElementById("dialog-menu").style.display == "block" )
      this.toggleDialog()
  },
  toggle_about_text: function() {
    var txt = document.getElementById("about-text").innerHTML

    var dm = document.getElementById("dialog-menu")
    dm.innerHTML = txt

    if (dm.style.display == "") {
      this.clearMenus()
      dm.style.display = "block"
    }
    else {
      dm.style.display = ""
    }
  },
  toggleSettings: function() {
    var el = document.getElementById("settings-menu")

    if (el.style.display == "") {
      this.clearMenus()
      el.style.display = "block"
    }
    else {
      el.style.display = ""
      leveler.resetToFirstValidLevelIfLevelInvalidated()
      if (window.myGhost != undefined) configureGhostSpeed()
    }
  },
  toggleDialog: function() {
    var el = document.getElementById("dialog-menu");

    if (el.style.display == "") {
      this.clearMenus()
      el.style.display = "block";
    }
    else {
      el.style.display = "";
    }
  },
  handleOverlayGameEnd: function(msg) {
    var overlay = document.getElementById('overlay-message')

    overlay.innerHTML = msg
    setTimeout(function() {
      overlay.innerHTML = "Press Space"
    }, 5000)
    overlay.style.display = "block"
  },
  handleOverlayGameStart: function() {
    var overlay = document.getElementById('overlay-message')
    overlay.style.display = "none"
    overlay.innerHTML = ""
  },
  restartFromBeginningClicked: function() {
    leveler.resetToFirstValidLevel();
    ui.toggleSettings();
    // start_round('progression');
  }

};

window.require = function(path) {
  console.log("ERROR:  An object wasn't loaded from the js library path: " + path);
  console.log("This is likely a problem where a dependency wasn't properly loaded into the browser via <script> tags in the main html file.");
};
