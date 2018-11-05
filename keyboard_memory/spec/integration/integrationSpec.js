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

    var delayBetweenJumps = 300;
    var nJumps = 8
    // console.log(piffyCoinChallenge.get_available_letters())

    // for each letter in the available letters array
    for (var i = 0; i < nJumps; i++) {
      let z = i
      setTimeout(function() {
        var l = piffyCoinChallenge.get_available_letters()[z]

        // Send what should be the corresponding level to the current challenge
        IntegrationHelpers.sendKey(l)
        // console.log("Jumping for the " + (z+1) + " time to clear " + l)
        // console.log("There are " + myCoinBox.fx_loot.treasure.length + " coins in the box at the point of this jump.")
      }, delayBetweenJumps * (i+1));
    }


    setTimeout(function() {
      expect(gameStatus).toBe("stopped");
      expect(myCoinBox.stance).toBe("empty");
      expect(window.leveler.getCurrentPart()).toBe(1);
      done();
    }, delayBetweenJumps * (nJumps+2) );

  });

});
