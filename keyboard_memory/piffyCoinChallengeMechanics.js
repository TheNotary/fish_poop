// This file houses any game mechanics logic involved in the ghost coin
// challenge game, such as the callback soup of presenting "Press Start" perhaps...

var home_row = [ 'a', 's', 'd', 'f', 'j', 'k', 'l', ';' ]

var nonSymbolicletterHash = {
  "16": "[Shift]",
  "8": "[Backspace]",
  "27": "[Esc]"
}

function PiffyCoinChallenge(params, window) {
  var document = window.document;
  var config = params;
  var levelSettings = params['level_settings'];
  var challengeTimoutObj;
  var challengeDelay = 0;
  this.difficulty_settings = params['difficulty_settings'];

  var available_letters;
  var currentLetter = "";
  var precalculated_challenge_letters;


  this.get_available_letters = function() {
    return available_letters;
  };

  this.get_current_letter = function() {
    return currentLetter[0];
  };

  this.get_current_difficulty = function() {
    return this.difficulty_settings[this.get_difficulty_i()];
  };

  this.get_difficulty_i = function() {
    var radios = document.getElementsByName('difficulty');
    for (var i = 0, length = radios.length; i < length; i++)
      if (radios[i].checked) return i;
  };

  // When a round is over, we need to reset all the sprites, deleting them, and
  // replacing them in their starting places.  The challenge letters must also
  // be recalculated.
  this.resetGameLogicCoinChallenge = function(mode) {
    var screen = window.game.switchScreen("coin_ghost_challenge_screen");
    screen.animationObjects = []; // clear animation objects for screen

    this.set_available_letters();

    spawnMario();
    spawnCoinBox(precalculated_challenge_letters.length);
    spawnGhost();

    challengeTimoutObj = this.queueNextChallengeLetter();
  };

  this.queueNextChallengeLetter = function() {
    if (challengeDelay == 0) {
      challenge_player();
      return 0;
    }
    else
      return setTimeout(challenge_player, challengeDelay);
  };

  function challenge_player() {
    var challengeTag = document.getElementById('challenge')

    currentLetter = precalculated_challenge_letters.splice(0,1)
    challengeTag.innerHTML = currentLetter
  }

  this.clear_challenge = function() {
    var challengeTag = document.getElementById('challenge');
    challengeTag.innerHTML = "&nbsp;";
    clearTimeout(challengeTimoutObj);
  }

  this.clear_stats = function() {
    document.getElementById("hits").innerHTML = 0
    document.getElementById("misses").innerHTML = 0
  }

  this.register_a_miss = function(currentLetter, keyCode) {
    var tag = document.getElementById("misses")
    var missesCount =  parseInt(tag.innerHTML)
    tag.innerHTML = missesCount + 1

    game.sound.booLaugh.play();
    window.myGhost.x += piffyCoinChallenge.get_current_difficulty()["penalty_lunge"];
  }

  this.register_a_hit = function(currentLetter, keyCode) {
    var hits_register = document.getElementById("hits")
    var newHitCount =  parseInt(hits_register.innerHTML) + 1
    hits_register.innerHTML = newHitCount
    if (newHitCount >= available_letters.length) {
      // console.log("The game-winning hit has been struck.")
      var screen = game.getCurrentScreen()
      var part = leveler.advancePart()

      if (part != 0)
        window.game.sound['win'].play()
      else
        game.sound['victory'].play()
      end_round("Great Work!")
      window.myGhost.destroyMe = true
    }
    if (window.myMario.stance == "jumping") {
      window.game.debug("Mario was already jumping so the glitch is encountered and we shall manually empty the coinbox by one.");
      myCoinBox.fx_loot["treasure"].pop();
      spawnCoin([myCoinBox.x + 2, myCoinBox.y + 15]);
    }
    window.myMario.setStance("jumping");
  }

  this.set_available_letters = function() {
    var screen = game.getCurrentScreen()
    var level = screen.level
    var part = parseInt( document.getElementById('part').innerHTML )
    part = part - 1

    available_letters = this.padWithOldLetters(levelSettings[level].parts[part]);

    precalculated_challenge_letters = available_letters.slice(0);
    console.log(precalculated_challenge_letters);
  };

  this.padWithOldLetters = function(config) {
    var new_letters = config['new_letters']
    var nCoins = config['nCoins']
    var n_new_letters = config['n_new_letters']

    if (nCoins < n_new_letters)
      alert("Failing, impossible condition:  nCoins < n_new_letters... can't fit all the new letters into the array")

    var n_old_letters = nCoins - n_new_letters

    var new_letter_clip = []
    var old_letter_clip = []

    var new_letter_stock = []
    var old_letter_stock = []

    while (new_letter_clip.length < n_new_letters) {  // g, h
      if (new_letter_stock.length <= 0) new_letter_stock = shuffle( new_letters.slice(0) )
      new_letter_clip.push( new_letter_stock.shift() )
    }

    while (old_letter_clip.length < n_old_letters) {  // a, s, d, f, j, k, l, ;
      if (old_letter_stock.length <= 0) old_letter_stock = shuffle( home_row.slice(0) )
      old_letter_clip.push( old_letter_stock.shift() )
    }

    return shuffle(new_letter_clip.concat(old_letter_clip))
  }

  /////////////////////////////////////
  //  piffyCoinChallengeKeyboard.js  //
  /////////////////////////////////////

  this.keypress = function(keyCode) {
    if (wasPossibleChallegeLetterPressed(keyCode)) {
      var typedLetter
      if (wasKeyWithCharCode(keyCode)) {
        typedLetter = String.fromCharCode(keyCode).toLowerCase();
      }
      else { // e.g. 16 is shift and can't convert to lowercase CharCode... it must be set to [Shift]
        typedLetter = this.getNonCharacterKeyLettering(keyCode)
      }
      window.console.log("CurrentLetter: " + currentLetter + "  keyCode: " + keyCode + "  typedLetter: " + typedLetter)

      if (typedLetter == currentLetter) {
        this.register_a_hit(currentLetter, keyCode)
        this.clear_challenge()
        if (gameStatus != 'stopped') {
          challengeTimoutObj = this.queueNextChallengeLetter();
        }
      }
      else {
        this.register_a_miss(currentLetter, keyCode)
      }
    }
  }

  function wasPossibleChallegeLetterPressed(keyCode) {
    return ((keyCode >= 32 &&
            keyCode <= 126 &&
            keyCode != 91) || // Windows meta key
            nonSymbolicletterHash[keyCode]); // shift, backspace, escape, etc.
  }

  function wasKeyWithCharCode(keyCode) {
    return nonSymbolicletterHash[keyCode] == null
  }

  this.getNonCharacterKeyLettering = function(keyCode) {
    var letter = nonSymbolicletterHash[keyCode.toString()]
    return letter
  }

}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = PiffyCoinChallenge;
}
