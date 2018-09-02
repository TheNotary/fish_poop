////////////////////////////////
//          Leveler           //
////////////////////////////////
//
// This class/ file houses the logic involved with progressing to the next level.
// Since it contains a lot of logic, and requires the DOM, I kept this code
// out of the ghost screen class.
//
function Leveler() {
  var checker = new LevelEnablementChecker(this);

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
    return part
  }

  this.advanceLevel = function() {
    var screen = game.getCurrentScreen()
    var level = screen.level;
    var newLevel = level + 1;

    if (checker.onFinalLevel(level)) {
      alert("you beat all the levels I've had time to program so far!");
      newLevel = checker.getFirstEnabledLevel()
    }

    while (checker.shouldWeSkipLevel(newLevel)) {
      newLevel++
      if ( newLevel >= game.levels.length ) newLevel = 0
    }

    screen.setLevel(newLevel);
    document.getElementById('level').innerHTML = newLevel
    return newLevel;
  }

  this.resetToFirstValidLevelIfLevelInvalidated = function() {
    checker.resetToFirstValidLevelIfLevelInvalidated();
  }

  this.resetToFirstValidLevel = function() {
    checker.resetToFirstValidLevel()
  };

};



////////////////////////////////
//  Level Enablement Checker  //
////////////////////////////////
//
// This class helps ensure that when a level is set, it is valid and enabled
//
function LevelEnablementChecker(leveler) {
  // If current level is no-longer enabled, set current level to first available level
  // and reset the game...
  this.resetToFirstValidLevelIfLevelInvalidated = function() {
    var level = game.getCurrentScreen().level;

    if ( this.shouldWeSkipLevel(level) ) {
      this.resetToFirstValidLevel()
    }
  };

  this.resetToFirstValidLevel = function() {
    leveler.setLevel( this.getFirstEnabledLevel() )
  };

  this.shouldWeSkipLevel = function(lvl) {
    if ( atLeastOneLevelIsSelected() &&
         thisLevelIsDisabled(lvl) )
      return true
    return false;
  };

  this.onFinalLevel = function(currentLvl) {
    if (currentLvl >= this.getLastEnabledLevel() ) {
      return true
    }
    return false
  }

  this.getLastEnabledLevel = function() {
    var max = 0;

    for (var i = 0; i < game.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        max = i
    }

    return max
  }

  this.getFirstEnabledLevel = function() {
    for (var i = 0; i < game.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        return i
    }

    return -1
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
