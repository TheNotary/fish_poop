
function addEventHandlersToDom() {
  // $('canvas').each(function() {
  //     this.addEventListener("mousedown", relMouseCoords, false);
  // });

  //Events when keyboard keys are pressed
  document.onkeydown = function(evt) {
    game.getCurrentScreen().handleKeys(evt);
  };
}

// place within the onclick event of a canvas to see it work
function relMouseCoords(event) {
  if (game.currentScreen == "title_screen") {
    // TODO: refactor game.titleScreen into a more nested pattern...
    game.titleScreen.handleMouse(event);
    return;
  }

  // else handleMouse for coinGhostChallengeScreen... TODO: Refactor into coinGhostChallengeScreen.handleMouse if possible

  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  }
  while (currentElement = currentElement.offsetParent)

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;


  unit = reportWhatUnitWasClicked(canvasX, canvasY);

  if (game.debugMode == true) {
    console.debug("x: " + canvasX + "  y: " + canvasY);
    console.debug('Unit Name: ' + unit.name);
  }

  return {
    x: canvasX,
    y: canvasY
  }
}



function reportWhatUnitWasClicked(clickX, clickY) {
  var bs = game.getCurrentScreen();
  var unit;
  // check if it was a mob that was clicked
  unit = whatUnitWasClicked(clickX, clickY, bs.animationObjects);
  if (unit != false) {
    return unit;
  }
  return unit;
}

function whatUnitWasClicked(clickX, clickY, units) {
  // check if it was a mob
  for (var i = 0; i < units.length; i++) {
    var unit = units[i];

    var x1 = unit.x;
    var x2 = unit.x + unit.width;
    var y1 = unit.y - unit.height;
    var y2 = unit.y;
    if (unit.stance == "flying" && unit.type == unitType.unit) {
      y1 = unit.y - unit.height - 50;
      y2 = unit.y - 50;
    }

    if (clickX >= x1 && clickX <= x2 &&
      clickY >= y1 && clickY <= y2) {
      if (!unit.dead || unit.type == unitType.hero)
        return unit;
    }
  }
  return false;
}
