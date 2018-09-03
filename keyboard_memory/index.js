debugMode = false;

level_settings = [
  { // lvl0
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
    background: "assets/backgrounds/sewers.png",
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
    background: "assets/backgrounds/bean_valley.png",
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



gameConfig = {
  debugMode: debugMode,
  level_settings: level_settings
}

window.game = new KeyboardMemory(gameConfig);
game.start();



window.piffyCoinChallenge = new PiffyCoinChallenge({
    difficulty_settings: difficulty_settings,
    level_settings: level_settings
  }, window);
window.leveler = new Leveler(game.screens['coin_ghost_challenge_screen'], window);



// spawnCoin([0, 50]);
// spawnSprite();
