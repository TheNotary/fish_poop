// TODO: Implement effects so each is defined, mostly in entirety in an
// individual file such that the pipeline can pick up these effects quite easily

// Do the asExplodable.call(myCoin) trick!

var explodingFrames = {
  "exploding": {
    "spriteIndecies": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "animationCycleSlowness": 2
  }
};


var explodingUpdate = function() {

}



var asExplodable = function() {
  var that = this;

  this.effects["exploding"] = {
    "updateLogic": function() {
      
    }
  };

}
