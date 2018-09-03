var BrowserMock = require("../support/browserMock.js");

// var window = new BrowserMock.Window();

// var Screen = require("../../engine/screen.js");
var CoinGhostChallengeScreen = require("../../screens/coinGhostChallengeScreen/coinGhostChallengeScreen.js");

var PL = require("../../piffyLeveler.js");
var Leveler = PL.Leveler;
var LevelEnablementChecker = PL.LevelEnablementChecker;


describe("Main test Suite file", function() {
  var document = new BrowserMock.Document({
    "lvl0": { checked: true },
    "lvl1": { checked: true },
    "lvl2": { checked: true },
    "level": { innerHTML: "0" }
  });
  var coinScreen = new CoinGhostChallengeScreen();
  var leveler = new Leveler(coinScreen, document);

  it("assert true is true", function() {
    a = true;

    expect(a).toBe(true);
  });


  it("and so is a spec", function() {
    leveler.setLevel(0);

    expect(leveler.currentLevel).toBe(0);
  });


});
