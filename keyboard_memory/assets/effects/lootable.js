// lottables are things like questionmark chests that contain treasure
var asLootable = function() {
  var that = this;

  this.fx_loot = {
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
        if ( obj.type == "mario" &&
             areWeStruck(obj) ) {
          // alert('i am struck' + (obj.y + obj.animation_y) );

          // Handle the Looter!
          obj.fx_jump["direction"] = "down";
          obj.fx_jump["jumpPower"] = -2;  // make mario look slightly knocked dowards from the box...

          // Handle the looted object

          // Pull out the loot
          var treasure = that.fx_loot["treasure"].pop();
          // advertise the loot
          spawnCoin([that.x + 2, that.y + 15]);

          // console.log("This many coins left: " + that.fx_loot["treasure"].length)

          // Make the 'struck' animation start...
          that.setStance("struck")
        }

      }
    }
  };

  function areWeStruck(obj) {
    var heightOfChestAsDrawn = 35;
    var bottom_of_thing_being_looted = that.y + heightOfChestAsDrawn;
    var head_of_looter = obj.y + obj.animation_y;
    return head_of_looter <= bottom_of_thing_being_looted;    // if head_of_looter is above bottom_of_thing_being_looted
  }

}
