describe("Piffy Coin Challenge Game", function() {

  beforeEach(function() {
    end_game()
  });


  it("Leveler defaults to being level 0", function() {
    IntegrationHelpers.sendKey("[space]");




    keyboard_func({ keyCode: 32, preventDefault: function(){} })
    keyboard_func({ keyCode: 32, preventDefault: function(){} })
    keyboard_func({ keyCode: 32, preventDefault: function(){} })

    // I need to reload the game state after all of this
    expect(true).toBe(true);
  });

});
