var BrowserMock = require("../support/browserMock.js");

// var window = new BrowserMock.Window();

// var Screen = require("../../engine/screen.js");
var CoinGhostChallengeScreen = require("../../screens/coinGhostChallengeScreen/coinGhostChallengeScreen.js");

var PL = require("../../piffyLeveler.js");
var Leveler = PL.Leveler;
var LevelEnablementChecker = PL.LevelEnablementChecker;


describe("Leveler", function() {
  var leveler;
  var document;

  beforeEach(function() {
    document = new BrowserMock.Document({
      "lvl0":  { checked: true  },
      "lvl1":  { checked: true  },
      "lvl2":  { checked: true  },
      "level": { innerHTML: "0" },
      "part":  { innerHTML: "1" }
    });
    var window = {
      document: document,
      end_game: _ => {} };

    var coinScreen = new CoinGhostChallengeScreen();
    coinScreen.levels = [0,1,2]
    leveler = new Leveler(coinScreen, window);
  });


  it("Leveler defaults to being level 0", function() {
    expect(leveler.currentLevel).toBe(0);
  });

  it("Leveler can set levels", function() {
    leveler.setLevel(1);

    expect(leveler.currentLevel).toBe(1);
  });

  it("changes to lvl1 when advance part is called 3 times", function() {
    leveler.advancePart()
    leveler.advancePart()
    leveler.advancePart()

    expect(leveler.currentLevel).toBe(1);
  });

  it("changes to lvl1 when advance level is called", function() {
    leveler.advanceLevel()

    expect(leveler.currentLevel).toBe(1);
  });

  it("changes to lvl0 when on lvl1 once lvl1 is invalidated", function() {
    leveler.setLevel(1)

    document.getElementById("lvl1").checked = false;
    leveler.resetToFirstValidLevelIfLevelInvalidated()
    expect(leveler.currentLevel).toBe(0);
  });

});


var KeyboardMemory = require("../../keyboardMemory.js");

describe("KeyboardMemory", function() {

  var keyboardMemory;

  beforeEach(function() {
    var config = { debugMode: false }
    document = new BrowserMock.Document({
      "lvl0":  { checked: true  },
      "lvl1":  { checked: true  },
      "lvl2":  { checked: true  },
      "level": { innerHTML: "0" },
      "part":  { innerHTML: "1" }
    });
    var window = {
      document: document,
      end_game: _ => {} };

    keyboardMemory = new KeyboardMemory(config, window);
  });

  it("Can be instantiated from the tests", function() {
    expect(keyboardMemory.debugMode).toBe(false);
  });


});
