// Effects can be added to any unit by simply using the
// `asExplodable.call(myUnit)` trick after instantiating the unit...
//
// Thereafter, setting the stance of the unit to, say "exploding" will cause
// the update loop to account for the fact that the effect is taking place!


var asExplodable = function() {
  var that = this;

  that.fx_exploding = {
    "speed": 6
  }

  this.effects["exploding"] = {
    "updateLogic": function() {
      that.fx_exploding["speed"] -= 0.5;
      that.animation_y -= that.fx_exploding["speed"];
    }
  };

}
