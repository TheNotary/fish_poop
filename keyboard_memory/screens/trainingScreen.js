if (CoinGhostChallengeScreen == undefined)
  var CoinGhostChallengeScreen = require("../../engine/coinGhostChallengeScreen.js");  // For tests only, browser ignores this


function TrainingScreen(screenConfig) {
  CoinGhostChallengeScreen.call(this, screenConfig);
}

TrainingScreen.prototype = new CoinGhostChallengeScreen();


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = TrainingScreen
}
