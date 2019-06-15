describe("Piffy Coin Challenge", function() {

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    initGameObject();
  });

  it("It should start fresh on new games initial", function(done) {
    expect(window.leveler.getCurrentPart()).toBe(0);
    done();
  });

  it("Leveler defaults to being level 0 part 0 and increments to part 1", function(done) {
    IntegrationHelpers.sendKey("[space]");
    expect(gameStatus).toBe("started");
    expect(window.leveler.getCurrentLevel()).toBe(0);
    expect(window.leveler.getCurrentPart()).toBe(0);

    var delayBetweenJumps = 300;
    var nJumps = 8;
    var timeToGiveForEachStageToElapse = delayBetweenJumps * (nJumps+2);

    IntegrationHelpers.playThroughStage(delayBetweenJumps);

    // make assertions at end of stage
    setTimeout(function() {
      expect(gameStatus).toBe("stopped");
      expect(myCoinBox.stance).toBe("empty");
      expect(window.leveler.getCurrentPart()).toBe(1);
      done();
    }, timeToGiveForEachStageToElapse );

  });

  it("It should start fresh on new games", function(done) {
    expect(window.leveler.getCurrentPart()).toBe(0);
    done();
  });

  it("It should start fresh on new games", function(done) {
    expect(window.leveler.getCurrentPart()).toBe(0);
    done();
  });

  describe("Long running tests that last over 30 seconds", function() {

    beforeEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
      initGameObject();
    });

    it("It should play through from level 1 to level 2", function(done) {
      let targetLevel = 0;
      window.leveler.setLevel(targetLevel);
      expect(window.leveler.getCurrentLevel()).toBe(targetLevel);

      var nParts = 3;
      var delayBetweenJumps = 300; // ms
      var nJumps = 8;
      var timeToGiveForEachPartToElapse = delayBetweenJumps * (nJumps+2);

      for (let i = 0; i < nParts; i++) {
        setTimeout(function() {
          expect(window.leveler.getCurrentLevel()).toBe(targetLevel);
          expect(window.leveler.getCurrentPart()).toBe(i);

          IntegrationHelpers.sendKey("[space]");
          IntegrationHelpers.playThroughStage(delayBetweenJumps);
        }, timeToGiveForEachPartToElapse * (i) );
      }

      setTimeout(function() {
        expect(gameStatus).toBe("stopped");
        expect(window.leveler.getCurrentLevel()).toBe(targetLevel+1);
        expect(window.leveler.getCurrentPart()).toBe(0);
        done();
      }, (timeToGiveForEachPartToElapse * nParts) + delayBetweenJumps );

    });

    it("It should play through from level 2 to level 3", function(done) {
      let targetLevel = 1;
      window.leveler.setLevel(targetLevel);
      expect(window.leveler.getCurrentLevel()).toBe(targetLevel);

      var nParts = 3;
      var delayBetweenJumps = 300; // ms
      var nJumps = 8;
      var timeToGiveForEachPartToElapse = delayBetweenJumps * (nJumps+2);

      for (let i = 0; i < nParts; i++) {
        setTimeout(function() {
          expect(window.leveler.getCurrentLevel()).toBe(targetLevel);
          expect(window.leveler.getCurrentPart()).toBe(i);

          IntegrationHelpers.sendKey("[space]");
          IntegrationHelpers.playThroughStage(delayBetweenJumps);
        }, timeToGiveForEachPartToElapse * (i) );
      }

      setTimeout(function() {
        expect(gameStatus).toBe("stopped");
        expect(window.leveler.getCurrentLevel()).toBe(targetLevel+1);
        expect(window.leveler.getCurrentPart()).toBe(0);
        done();
      }, (timeToGiveForEachPartToElapse * nParts) + delayBetweenJumps );

    });

    it("It should play through from level 3 to level 4", function(done) {
      let targetLevel = 2;
      window.leveler.setLevel(targetLevel);
      expect(window.leveler.getCurrentLevel()).toBe(targetLevel);

      var nParts = 3;
      var delayBetweenJumps = 300; // ms
      var nJumps = 8;
      var timeToGiveForEachPartToElapse = delayBetweenJumps * (nJumps+2);

      for (let i = 0; i < nParts; i++) {
        setTimeout(function() {
          expect(window.leveler.getCurrentLevel()).toBe(targetLevel);
          expect(window.leveler.getCurrentPart()).toBe(i);

          IntegrationHelpers.sendKey("[space]");
          IntegrationHelpers.playThroughStage(delayBetweenJumps);
        }, timeToGiveForEachPartToElapse * (i) );
      }

      setTimeout(function() {
        expect(gameStatus).toBe("stopped");
        expect(window.leveler.getCurrentLevel()).toBe(targetLevel+1);
        expect(window.leveler.getCurrentPart()).toBe(0);
        done();
      }, (timeToGiveForEachPartToElapse * nParts) + delayBetweenJumps );

    });

    it("It should play through from level 4 to level 5", function(done) {
      let targetLevel = 3;
      window.leveler.setLevel(targetLevel);
      expect(window.leveler.getCurrentLevel()).toBe(targetLevel);

      var nParts = 3;
      var delayBetweenJumps = 300; // ms
      var nJumps = 8;
      var timeToGiveForEachPartToElapse = delayBetweenJumps * (nJumps+2);

      for (let i = 0; i < nParts; i++) {
        setTimeout(function() {
          expect(window.leveler.getCurrentLevel()).toBe(targetLevel);
          expect(window.leveler.getCurrentPart()).toBe(i);

          IntegrationHelpers.sendKey("[space]");
          IntegrationHelpers.playThroughStage(delayBetweenJumps);
        }, timeToGiveForEachPartToElapse * (i) );
      }

      setTimeout(function() {
        expect(gameStatus).toBe("stopped");
        expect(window.leveler.getCurrentLevel()).toBe(targetLevel+1);
        expect(window.leveler.getCurrentPart()).toBe(0);
        done();
      }, (timeToGiveForEachPartToElapse * nParts) + delayBetweenJumps );

    });

  });

});
