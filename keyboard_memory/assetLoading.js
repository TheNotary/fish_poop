// Define the assets that get loading into your application here...
// The methods defined here are invoked in the 'heart' game file...

// TODO: Make this audio read the actual .json data files the way a real programmer would do things...
window.KeyboardMemory.prototype.Sound = function() {

  // specific to effects
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


  this['audMenuMove'] = new Howl({
    urls: ["assets/audio/misc/menu_move.ogg"],
    volume: 0.05
  });

  this['victory'] = new Howl({
    urls: ["assets/audio/misc/smb_stage_clear.wav"],
    volume: 0.10
  });

  this['win'] = new Howl({
    urls: ["assets/audio/misc/nsmb_power-up.wav"],
    volume: 0.40
  });

  this['booLaugh'] = new Howl({
    urls: ["assets/audio/unit/mk64_boo_laugh.wav"],
    volume: 0.40
  });

};



// This object stores all the Image objects for the whole game (ideally).
// Through this single point we can monitor if we need to keep waiting for the
// game to load.
window.KeyboardMemory.prototype.Graphics = function() {
  var that = this;
  this.imageCache = {};
  this.loadingImages = []; // log what images aren't loaded in yet...


  // graphics#loadImage(imgPath, beginLoadingCallback, loadCompleteCallback)
  //
  // Specify an imgPath to an image to have it loaded and cached in this.imageCache
  // and also returned!
  //   - beginLoadingCallback(graphic)
  //   Use this callback to do something when the caching/ DL process begins.
  //   - loadCompleteCallback(imgPath, graphic)
  //   Use this callback to do something when the DL process is complete.
  this.loadImage = function(imgPath, beginLoadingCallback, loadCompleteCallback) {
    if ( this.imageCache[imgPath] ) return;  // if image has already been cached...
    if (window.game.debugMode) console.log("Loading image: " + imgPath);

    var img = new Image();
    var loadingImages = that.loadingImages;

    loadingImages.push(imgPath);
    if (beginLoadingCallback !== undefined) beginLoadingCallback(that, imgPath);

    img.onload = function() {
      if (window.game.debugMode)  console.log("Completed loading image: " + imgPath);
      var index = loadingImages.indexOf(imgPath);
      if (index !== -1)           loadingImages.splice(index, 1);
      if (loadCompleteCallback !== undefined) loadCompleteCallback(that, imgPath);
    };

    img.src = imgPath;
    this.imageCache[imgPath] = img;
    return img;
  };

};


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  module.exports = {
    Graphics: Graphics,
    Sound: Sound
  };
}
