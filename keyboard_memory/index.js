debugMode = false;

window.game = new KeyboardMemory(debugMode);
game.start();


window.piffyCoinChallenge = new PiffyCoinChallenge();
window.leveler = new Leveler(game.screens['coin_ghost_challenge_screen'], window);



// spawnCoin([0, 50]);
// spawnSprite();
