
function init() {
  window.levels = {};

  // FIXME: the below implimentation would be better
  // window.levels['0'] = {
  //   "background": 'assets/backgrounds/fields.png',
  // }
  //
  // window.levels['1'] = {
  //   "background": 'assets/backgrounds/fields.png',
  // }

  window.levels['0'] = {};
  window.levels['0']['background'] = new Image();
  window.levels['0']['background'].src = 'assets/backgrounds/fields.png';

  window.levels['1'] = {};
  window.levels['1']['background'] = new Image();
  window.levels['1']['background'].src = 'assets/backgrounds/sewers.png';
}



debugMode = false;

init();


window.game = new KeyboardMemory(debugMode);



game.start();




// spawnCoin([0, 50]);

// spawnBlah();
