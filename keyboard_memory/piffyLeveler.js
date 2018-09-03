////////////////////////////////
//          Leveler           //
////////////////////////////////
//
// This class/ file houses the logic involved with progressing to the next level.
// Since it contains a lot of logic, and requires the DOM, I kept this code
// out of the ghost screen class.
//
function Leveler(associatedScreen, window) {
  var checker = new LevelEnablementChecker(this, window);
  var document = window.document
  var screen = associatedScreen;
  this.currentLevel = 0;
  this.levels = screen.levels;

  this.setLevel = function(val) {
    // set background image
    screen.setLevel(val)
    document.getElementById("level").innerHTML = val
    this.currentLevel = val

    window.end_game("Press Space");
    return val;
  }

  this.changeLevelUp = function() {
    var lvl = this.currentLevel;
    if (lvl >= screen.levels.length - 1) return
    this.setLevel(lvl + 1)
  }

  this.changeLevelDown = function() {
    var lvl = this.currentLevel;
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
    var level = this.currentLevel;
    var newLevel = level + 1;


    if (checker.onFinalLevel(level)) {
      window.alert("you beat all the levels I've had time to program so far!");
      newLevel = checker.getFirstEnabledLevel()
    }

    while (checker.shouldWeSkipLevel(newLevel)) {
      newLevel++
      if ( newLevel >= screen.levels.length ) newLevel = 0
    }

    return this.setLevel(newLevel);
  }

  // If current level is no-longer enabled, set current level to first available level
  // and reset the game...
  this.resetToFirstValidLevelIfLevelInvalidated = function() {
    if ( checker.shouldWeSkipLevel(screen.level) ) {
      this.resetToFirstValidLevel()
    }
  };

  this.resetToFirstValidLevel = function() {
    this.setLevel( checker.getFirstEnabledLevel() )
  };

};



////////////////////////////////
//  Level Enablement Checker  //
////////////////////////////////
//
// This class helps ensure that when a level is set, it is valid and enabled
//
function LevelEnablementChecker(leveler, window) {
  var document = window.document;

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
    for (var i = 0; i < leveler.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        max = i
    }

    return max
  }

  this.getFirstEnabledLevel = function() {
    for (var i = 0; i < leveler.levels.length; i++) {
      var el = document.getElementById("lvl" + i)
      if (el.checked)
        return i
    }

    return -1
  }

  function atLeastOneLevelIsSelected() {
    for (var i = 0; i < leveler.levels.length; i++) {
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


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = {
    Leveler: Leveler,
    LevelEnablementChecker: LevelEnablementChecker
  }
}
