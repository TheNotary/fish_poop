var IntegrationHelpers = {
  sendKey: function(keyChar) {
    var keyCode;

    switch(keyChar) {
      case "[space]":
        keyCode = 32;
        break;
      default:
        keyCode = keyChar.charCodeAt(0);
        break;
    }
    keyboard_func({ keyCode: keyCode, preventDefault: function(){} });
  },
  playThroughStage: function(delayBetweenJumps) {
    var nJumps = piffyCoinChallenge.get_available_letters().length
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
  }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = IntegrationHelpers
}
