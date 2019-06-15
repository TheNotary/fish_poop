var BrowserMock = require("../../support/browserMock.js");

var PiffyCoinChallenge = require("../../../piffyCoinChallengeMechanics.js");

describe("PiffyCoinChallenge", function() {

  var piffyCoinChallenge;

  beforeEach(function() {
    var config = { level_settings: false,
                   difficulty_settings: false };

    document = new BrowserMock.Document({
      "hits":  { innerHTML: 10  },
      "misses":  { innerHTML: 10 }
    });
    var window = {
      document: document,
      end_round: _ => {} };

    piffyCoinChallenge = new PiffyCoinChallenge(config, window);
  });

  it("it can clear it's stats", function() {
    let missCount = document.getElementById("hits").innerHTML
    let hitCount = document.getElementById("misses").innerHTML
    expect(missCount).toBe(10);
    expect(hitCount).toBe(10);

    piffyCoinChallenge.clear_stats()

    missCount = document.getElementById("hits").innerHTML
    hitCount = document.getElementById("misses").innerHTML
    expect(missCount).toBe(0);
    expect(hitCount).toBe(0);
  });

});
