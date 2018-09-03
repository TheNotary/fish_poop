// This file houses any game mechanics logic involved in the ghost coin
// challenge game, such as the callback soup of presenting "Press Start" perhaps...


function PiffyCoinChallenge(params, window) {
  var config = params;
  var levelSettings = params['level_settings'];
  this.difficulty_settings = params['difficulty_settings'];


  this.get_current_difficulty = function() {
    return this.difficulty_settings[this.get_difficulty_i()]
  };

  this.get_difficulty_i = function() {
    var radios = document.getElementsByName('difficulty')
    for (var i = 0, length = radios.length; i < length; i++)
    if (radios[i].checked) return i;
  };

  this.resetGameLogicCoinChallenge = function(mode) {
    var screen = window.game.switchScreen("coin_ghost_challenge_screen");
    screen.animationObjects = []; // clear animation objects for screen

    this.set_available_letters();
    setTimeout(challenge_player, challengeDelay);

    spawnMario();
    spawnCoinBox(nCoins);
    spawnGhost();
  };

  this.keypress = function(keyCode) {
    if (wasPossibleChallegeLetterPressed(keyCode)) {
      var typedLetter = String.fromCharCode(keyCode).toLowerCase()

      if (typedLetter == currentLetter) {
        this.register_a_hit(currentLetter, keyCode)
        this.clear_challenge()
        if (gameStatus != 'stopped') {
          setTimeout(challenge_player, challengeDelay)
        }
      }
      else {
        this.register_a_miss(currentLetter, keyCode)
      }
    }

    function wasPossibleChallegeLetterPressed(keyCode) {
      return (keyCode >= 32 && keyCode <= 126 && keyCode != 91);
    }
  }

  function challenge_player() {
    var challengeTag = document.getElementById('challenge')

    currentLetter = window.precalculated_challenge_letters.splice(0,1)
    challengeTag.innerHTML = currentLetter
  }

  this.clear_challenge = function() {
    var challengeTag = document.getElementById('challenge')
    challengeTag.innerHTML = "&nbsp;"
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
    if (newHitCount >= window.available_letters.length) {
      var screen = game.getCurrentScreen()
      var part = leveler.advancePart()

      if (part != 1)
      window.game.sound['win'].play()
      else
      game.sound['victory'].play()
      end_game("Great Work!")
      window.myGhost.destroyMe = true
    }
    window.myMario.setStance("jumping");
  }

  this.set_available_letters = function() {
    var screen = game.getCurrentScreen()
    var level = screen.level
    var part = parseInt( document.getElementById('part').innerHTML )
    part = part - 1

    window.available_letters = this.padWithOldLetters(levelSettings[level].parts[part]);

    window.precalculated_challenge_letters = window.available_letters.slice(0);
    console.log(window.precalculated_challenge_letters);
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

}
