


function addEventHandlersToDom() {
    // $('canvas').each(function() {
    //     this.addEventListener("mousedown", relMouseCoords, false);
    // });

    //Events when keyboard keys are pressed
    document.onkeydown = function(evt) {
        evt = evt || window.event;

        switch (game.currentScreen) {
            case "title_screen":
                // TODO: refactor game.titleScreen into a more nested pattern...
                game.titleScreen.handleKeys(evt);
                break;
            case "battle_screen":
                // TODO: refactor game.titleScreen into a more nested pattern...
                // game.battleScreen.handleKeys(evt);

                var index_element = document.getElementById('debug-int');
                var spriteIndex = parseInt(index_element.innerHTML);

                switch (evt.keyCode) {
                    case 39: // right arrow
                        var val = (spriteIndex + 1) % (window.debugTarget.getProperFrames().length);
                        setSpriteIndex(val);
                        window.debugTarget.spriteIndex_i = val;
                        break;
                    case 37: // left arrow
                        var val = (spriteIndex - 1) % (window.debugTarget.getProperFrames().length);
                        if (val < 0)
                          val = window.debugTarget.getProperFrames().length - 1;
                        setSpriteIndex(val);
                        window.debugTarget.spriteIndex_i = val;
                        break;
                }

                break;
        }
    };
}

// place within the onclick event of a canvas to see it work
function relMouseCoords(event) {
    if (game.currentScreen == "title_screen") {
        // TODO: refactor game.titleScreen into a more nested pattern...
        game.titleScreen.handleMouse(event);
        return;
    }

    // else handleMouse for battleScreen... TODO: Refactor into battleScreen.handleMouse if possible

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

    if (game.battleScreen.actionMenu.pickingTarget && unit != false) {
        game.battleScreen.actionMenu.targetSelected(unit);
    }

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
    var bs = game.battleScreen;
    var unit;
    // check if it was a mob that was clicked
    unit = whatUnitWasClicked(clickX, clickY, bs.mobs);
    if (unit != false) {
        return unit;
    }
    // check if it was a hero
    unit = whatUnitWasClicked(clickX, clickY, bs.heroes);
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
