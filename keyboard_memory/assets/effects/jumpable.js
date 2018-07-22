// Effects can be added to any unit by simply using the
// `asExplodable.call(myUnit)` trick after instantiating the unit...
//
// Thereafter, setting the stance of the unit to, say "exploding" will cause
// the update loop to account for the fact that the effect is taking place!


var asJumpable = function() {
  var that = this;

  this.fx_jump = {
    "direction": "up",
    "jumpPower": 10
  };

  this.effects["jumping"] = {
    "updateLogic": function() {
      var gravity = 1;      // m/s/s   (seconds are 1 tick, btw....)
      var startingJumpPower = 10; // m/s
      var max_jump_height = -100;

      that.fx_jump["jumpPower"] = (that.fx_jump["jumpPower"] - gravity);
      that.animation_y = that.animation_y - that.fx_jump["jumpPower"];

      if (that.fx_jump["direction"] == "up" && that.animation_y < max_jump_height) {
          that.fx_jump["direction"] = "down"
      }

      if (that.animation_y >= 0) {
          that.animation_y = 0;
          that.setStance("standing");
          that.fx_jump["direction"] = "up"  // reset
          that.fx_jump["jumpPower"] = 10;
      }

    }
  };

}
