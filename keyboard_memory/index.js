debugMode = true;


level_settings = [
  { // lvl0
    desc: "Home Row (including G + H)",
    background: "assets/backgrounds/fields.png",
    parts: [
    { // Part 0
      "new_letters": [],
      "n_new_letters": 0,
      "nCoins": 8
    },
    { // Part 1
      "new_letters": ['g', 'h'],
      "n_new_letters": 4,
      "nCoins": 8
    },
    { // Part 2
      "new_letters": ['g', 'h'],
      "n_new_letters": 4,
      "nCoins": 10
    }
  ]},
  { // lvl1
    desc: "I T .",
    background: "assets/backgrounds/fields.png",
    parts: [
    { "new_letters": ['i', 't', '.'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['i', 't', '.'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['i', 't', '.'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]},
  { // lvl2
    desc: "O R N",
    background: "assets/backgrounds/sewers.png",
    parts: [
    { "new_letters": ['o', 'r', 'n'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['o', 'r', 'n'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['o', 'r', 'n'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]},
  { // lvl3
    desc: "Q E P",
    background: "assets/backgrounds/sewers.png",
    parts: [
    { "new_letters": ['q', 'e', 'p'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['q', 'e', 'p'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['q', 'e', 'p'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]},
  { // lvl4
    desc: "W M C",
    background: "assets/backgrounds/sewers.png",
    parts: [
    { "new_letters": ['w', 'm', 'c'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['w', 'm', 'c'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['w', 'm', 'c'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]},
  { // lvl5
    desc: "Z Y Shift",
    background: "assets/backgrounds/bean_valley_top.png",
    parts: [
    { "new_letters": ['z', 'y', '[Shift]'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['z', 'y', '[Shift]'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['z', 'y', '[Shift]'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]},
  { // lvl6
    desc: "U B Escape",
    background: "assets/backgrounds/bean_valley_top.png",
    parts: [
    { "new_letters": ['u', 'b', '[Esc]'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['u', 'b', '[Esc]'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['u', 'b', '[Esc]'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]},
  { // lvl7
    desc: "V X Backspace",
    background: "assets/backgrounds/bean_valley_top.png",
    parts: [
    { "new_letters": ['v', 'x', '[Backspace]'],
      "n_new_letters": 3,
      "nCoins": 6 },
    { "new_letters": ['v', 'x', '[Backspace]'],
      "n_new_letters": 5,
      "nCoins": 8 },
    { "new_letters": ['v', 'x', '[Backspace]'],
      "n_new_letters": 7,
      "nCoins": 10 }
  ]}
];


difficulty_settings = [
  {
    "name": "Starter Kid",
    "ghost_speed": 1,
    "penalty_lunge": 40
  },
  {
    "name": "Proper Kid",
    "ghost_speed": 1.5,
    "penalty_lunge": 60
  },
  {
    "name": "Hacker Elite",
    "ghost_speed": 2.9,
    "penalty_lunge": 80
  }
];



KMConfig = {
  debugMode: debugMode,
  level_settings: level_settings
}

function initGameObject() {
  window.game = new KeyboardMemory(KMConfig, window);
  game.start();

  window.piffyCoinChallenge = new PiffyCoinChallenge({
    difficulty_settings: difficulty_settings,
    level_settings: level_settings
  }, window);
  window.leveler = new Leveler(game.screens['coin_ghost_challenge_screen'], window);
}

initGameObject()

// spawnCoin([0, 50]);
// spawnSprite();
