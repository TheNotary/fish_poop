// Define the assets that get loading into your application here...
// The methods defined here are invoked in the 'heart' game file...

// TODO: Make this audio read the actual .json data files the way a real programmer would do things...
window.KeyboardMemory.prototype.Sound = function() {
  this['audMenuMove'] = new Howl({
    urls: ["assets/audio/misc/menu_move.ogg"],
    volume: 0.05
  });

  this['smallJump'] = new Howl({
    urls: ["assets/audio/unit/smb_jump-small.wav"],
    volume: 0.10
  });

  this['coin'] = new Howl({
    urls: ["assets/audio/unit/smb_coin.wav"],
    volume: 0.10
  });

  this['marioDeath'] = new Howl({
    urls: ["assets/audio/unit/smb_mariodie.wav"],
    volume: 0.10
  });

  this['victory'] = new Howl({
    urls: ["assets/audio/misc/smb_stage_clear.wav"],
    volume: 0.10
  });

};
