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
    var level = parseInt( document.getElementById('level').innerHTML )

    var screen = game.getCurrentScreen()

    part++;
    if (part > 3) {
      part = 1
      this.advanceLevel();
    }

    document.getElementById('part').innerHTML = part
    document.getElementById('level').innerHTML = screen.level
  }

  this.advanceLevel = function() {
    var level = parseInt( document.getElementById('level').innerHTML )
    var newLevel = level + 1;
    var screen = game.getCurrentScreen()

    if (newLevel >= game.levels.length) {
      alert("you beat all the levels I've had time to program so far!");
      newLevel = 0
    }

    while (shouldWeSkipLevel(newLevel)) {
      newLevel++
      if ( newLevel >= game.levels.length ) newLevel = 0
    }

    screen.setLevel(newLevel);
    return newLevel;
  }

  function shouldWeSkipLevel(lvl) {
    if ( atLeastOneLevelIsSelected() &&
    thisLevelIsDisabled(lvl))
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

};
