// lottables are things like questionmark chests that contain treasure
var asLootable = function() {
  var that = this;

  that.fx_loot = {
    "treasure": [ "coin", "coin" ],
    "a": 1
  };

  this.effects["lootable"] = {
    "updateLogic": function() {
      if (that.fx_loot['treasure'].length <= 0) { // if fully looted...
        that.setStance("empty");
      }

      var animationObjects = game.getCurrentScreen().animationObjects;
      for (var i = 0; i < animationObjects.length; i++) {
        var obj = animationObjects[i];
        if (obj.type == "mario" &&
            (obj.y + obj.animation_y) <= (that.y + 50) ) {
          // alert('i am struck' + (obj.y + obj.animation_y) );

          // Handle the Looter!
          obj.fx_jump["direction"] = "down";
          obj.fx_jump["jumpPower"] = -2;  // make mario look slightly knocked dowards from the box...

          // Handle the looted object

          // Pull out the loot
          var treasure = that.fx_loot["treasure"].pop();
          // advertise the loot
          spawnCoin([that.x + 2, that.y + 15]);

          // Make the 'struck' animation start...
          that.setStance("struck")
        }

      }
      // that.x = that.x + that.fx_move["x"];
      // that.y = that.y + that.fx_move["y"];
    }
  };

}
