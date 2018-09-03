// This file houses any game mechanics logic involved in the ghost coin
// challenge game, such as the callback soup of presenting "Press Start" perhaps...


function PiffyCoinChallenge(params) {
  var config = params
}





function resetGameLogicCoinChallenge(mode) {
  var screen = window.game.switchScreen("coin_ghost_challenge_screen");
  screen.animationObjects = []; // clear animation objects for screen

  set_available_letters();
  setTimeout(challenge_player, challengeDelay);

  spawnMario();
  spawnCoinBox(nCoins);
  spawnGhost();
}


function keypressHook(keyCode) {

  if (wasPossibleChallegeLetterPressed(keyCode)) {
    var typedLetter = String.fromCharCode(keyCode).toLowerCase()

    if (typedLetter == currentLetter) {
      register_a_hit(currentLetter, keyCode)
      clear_challenge()
      if (gameStatus != 'stopped') {
        setTimeout(challenge_player, challengeDelay)
      }
    }
    else {
      register_a_miss(currentLetter, keyCode)
    }
  }

}


function wasPossibleChallegeLetterPressed(keyCode) {
  return (keyCode >= 32 && keyCode <= 126 && keyCode != 91);
}




function challenge_player() {
  var challengeTag = document.getElementById('challenge')

  currentLetter = window.precalculated_challenge_letters.splice(0,1)
  challengeTag.innerHTML = currentLetter
}

function clear_challenge() {
  var challengeTag = document.getElementById('challenge')
  challengeTag.innerHTML = "&nbsp;"
}

function clear_stats() {
  document.getElementById("hits").innerHTML = 0
  document.getElementById("misses").innerHTML = 0
}



function register_a_miss(currentLetter, keyCode) {
  var tag = document.getElementById("misses")
  var missesCount =  parseInt(tag.innerHTML)
  tag.innerHTML = missesCount + 1

  game.sound.booLaugh.play();
  window.myGhost.x += get_current_difficulty()["penalty_lunge"];
}

function register_a_hit(currentLetter, keyCode) {
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


function set_available_letters() {
  var level_letters = [
    ['g', 'h'],
    ['i', 't', '.'],
    ['o', 'r', 'n']
  ]

  var screen = game.getCurrentScreen()
  var part = parseInt( document.getElementById('part').innerHTML )
  if (screen.level == 0) {
    switch (part) {
      case 1:
        window.available_letters = padWithOldLetters({
          "new_letters": [],
          "n_new_letters": 0,
          "nCoins": 8 })
        break;
      case 2:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[0],
          "n_new_letters": 4,
          "nCoins": 8 })
        break;
      case 3:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[0],
          "n_new_letters": 4,
          "nCoins": 10 })
        break;
    }
  }

  // I'd like these to have the prior worked on letters,
  // but for half of the challenges to be of the new set!
  else if (screen.level == 1) {
    switch (part) {
      case 1:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[1],
          "n_new_letters": 3,
          "nCoins": 6 })
        break;
      case 2:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[1],
          "n_new_letters": 5,
          "nCoins": 8 })
        break;
      case 3:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[1],
          "n_new_letters": 7,
          "nCoins": 10 })
        break;
    }
  }
  else if (screen.level == 2) {
    switch (part) {
      case 1:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[2],
          "n_new_letters": 3,
          "nCoins": 6 })
        break;
      case 2:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[2],
          "n_new_letters": 5,
          "nCoins": 8 })
        break;
      case 3:
        window.available_letters = padWithOldLetters({
          "new_letters": level_letters[2],
          "n_new_letters": 7,
          "nCoins": 10 })
        break;
    }
  }

  window.precalculated_challenge_letters = window.available_letters.slice(0);
  console.log(window.precalculated_challenge_letters);
}


function padWithOldLetters(config) {
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


function selectRandomElement(array) {
  return shuffle(array)[0];
}
