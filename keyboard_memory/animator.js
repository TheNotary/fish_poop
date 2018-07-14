
function init() {
  background.src = 'assets/background.png'
}





window.background = new Image();

debugMode = false;

window.game = new KeyboardMemory(
  debugMode,
  { "screens": [ "title_screen", "coin_ghost_challenge_screen"] }
);

init();

game.start();


// spawnCoin([0, 50]);

// spawnBlah();
