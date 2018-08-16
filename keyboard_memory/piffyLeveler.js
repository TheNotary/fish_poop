// This file houses the logic involved with progressing to the next level.
// Since it contains a lot of logic, and requires the DOM, I kept this code
// out of the ghost screen class.


function Leveler() {
  this.setLevel = function(val) {
    window.currentLevel = val
    // set background image
    window.game.setLevel(val)
    var tag = document.getElementById("level")
    tag.innerHTML = val

    end_game("Press Space");
  }

  this.changeLevelUp = function() {
    var lvl = parseInt(document.getElementById("level").innerHTML)
    if (lvl >= game.getCurrentScreen().levels.length - 1) return
    this.setLevel(lvl + 1)
  }

  this.changeLevelDown = function() {
    var lvl = parseInt(document.getElementById("level").innerHTML)
    if (lvl <= 0) return
    this.setLevel(lvl - 1)
  }

  this.advancePart = function() {
    var part = parseInt( document.getElementById('part').innerHTML )

    part++;
    if (part > 3) {
      part = 1
      this.advanceLevel();
    }

    document.getElementById('part').innerHTML = part
  }

  this.advanceLevel = function() {
    var level = parseInt( document.getElementById('level').innerHTML )
    var newLevel = level + 1;
    var screen = game.getCurrentScreen()

    if (onFinalLevel(level)) {
      alert("you beat all the levels I've had time to program so far!");
      newLevel = getFirstEnabledLevel()
    }

    while (shouldWeSkipLevel(newLevel)) {
      newLevel++
      if ( newLevel >= game.levels.length ) newLevel = 0
    }

    screen.setLevel(newLevel);
    document.getElementById('level').innerHTML = newLevel
    return newLevel;
  }

  // If current level is no-longer enabled, set current level to first available level
  // and reset the game...
  this.resetToFirstValidLevelIfLevelInvalidated = function() {
    var level = parseInt( document.getElementById('level').innerHTML )

    if ( shouldWeSkipLevel(window.currentLevel) ) {
      this.setLevel( getFirstEnabledLevel() )
    }
  }

  function shouldWeSkipLevel(lvl) {
    if ( atLeastOneLevelIsSelected() &&
         thisLevelIsDisabled(lvl) )
      return true
    return false;
  }

  function atLeastOneLevelIsSelected() {
    for (var i = 0; i < game.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        return true
    }

    return false;
  }

  function thisLevelIsDisabled(lvl) {
    var el = document.getElementById("lvl" + lvl)

    if (!el.checked)
      return true
    return false
  }

  function onFinalLevel(currentLvl) {
    if (currentLvl >= getLastEnabledLevel() ) {
      return true
    }
    return false
  }

  function getLastEnabledLevel() {
    var max = 0;

    for (var i = 0; i < game.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        max = i
    }

    return max
  }

  function getFirstEnabledLevel() {
    for (var i = 0; i < game.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        return i
    }

    return -1
  }

};
