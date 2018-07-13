// Effects can be added to any unit by simply using the
// `asExplodable.call(myUnit)` trick after instantiating the unit...
//
// Thereafter, setting the stance of the unit to, say "exploding" will cause
// the update loop to account for the fact that the effect is taking place!


// movables are any things that move all on their own, plainly in some direction...
var asMovable = function() {
  var that = this;

  // how far to move per update
  that.fx_move = {
    "x": 1,
    "y": 0
  };

  this.effects["moving"] = {
    "updateLogic": function() {
      that.x = that.x + that.fx_move["x"];
      that.y = that.y + that.fx_move["y"];
    }
  };

}
