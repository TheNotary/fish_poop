var BrowserMock = require("../support/browserMock.js");

var document = new BrowserMock.Document();
// var window = new BrowserMock.Window();

var PL = require("../../piffyLeveler.js");
var Leveler = PL.Leveler;
var LevelEnablementChecker = PL.LevelEnablementChecker;


describe("Main test Suite file", function() {
  
  var leveler = new Leveler();

  it("assert true is true", function() {
    a = true;

    expect(a).toBe(true);
  });


  it("and so is a spec", function() {
    leveler.setLevel(0);

    expect(leveler.currentLevel).toBe(0);
  });


});
