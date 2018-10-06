jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("Piffy Coin Challenge", function() {

  beforeEach(function() {
    end_game()
  });


  it("Leveler defaults to being level 0 part 0 and increments to part 1", function(done) {
    IntegrationHelpers.sendKey("[space]");
    expect(gameStatus).toBe("started");
    expect(window.leveler.getCurrentLevel()).toBe(0);
    expect(window.leveler.getCurrentPart()).toBe(0);

    var delayBetweenJumps = 600;
    var iJumps = 7

    // for each letter in the available letters array
    for (var i = 0; i < iJumps; i++) {
      let z = i
      setTimeout(function() {
        var l = piffyCoinChallenge.get_available_letters()[z]

        // Send what should be the corresponding level to the current challenge
        IntegrationHelpers.sendKey(l)
      }, delayBetweenJumps * (i+1));
    }


    setTimeout(function() {
      expect(gameStatus).toBe("stopped");
      expect(myCoinBox.stance).toBe("empty");
      done();
    }, delayBetweenJumps * (iJumps+2) );

  });

});
