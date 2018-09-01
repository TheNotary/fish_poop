
function resetGameLogicTraining(mode) {
  window.game.switchScreen("training_screen");
  var screen = window.game.getCurrentScreen();
  screen.animationObjects = []; // clear animation objects for screen

  window.game.setLevel();
  var sprite = spawnToad();
  sprite.setStance("walking");

  // setDebugTarget(sprite);
  sprite.goTowards([250, 95]);

  // TODO:  Display a message
}
