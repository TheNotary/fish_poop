var BrowserMock = require("../../support/browserMock.js");

var KeyboardMemory = require("../../../keyboardMemory.js");

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
      end_round: _ => {} };

    keyboardMemory = new KeyboardMemory(config, window);
  });

  it("Can be instantiated from the tests", function() {
    expect(keyboardMemory.debugMode).toBe(false);
  });

});
