// new Unit("ghost", 0, "assets/enemies.png", [0, 0], "floating")
function Unit(type, id, spriteSheet, spriteData, position, stance, config) {
    if (arguments.length == 0) return;
    this.id = id;
    this.name =  "blah";   // Unit.getUnitName(type, id);
    this.type = type; // ghost, mob, hero, critter
    //this.shadowImages;
    this.position = position; // position on the battle screen...
    this.x = position[0]; // these variables are for hovering/ flying effects and misc. toneberry shananagins
    this.y = position[1];

    this.effects = {};
    this.animation_x = 0;
    this.animation_y = 0;

    this.animationPhase = 0;
    this.animationPhaseEnd = 0;

    this.sizeMultiplier = config["sizeMultiplier"];
    this.spriteSheet = spriteSheet;
    this.spriteData = spriteData;
    this.animationCycleSlowness = 10;
    this.image = new Image();
    this.spriteSheetData = spriteData["frames"];

    this.stances = spriteData["animations"];

    if (stance == undefined)
      this.setStance(Object.keys(stances)[0]); // this.stance = Object.keys(stances)[0]
    else
      this.setStance(stance);

    this.spriteIndex_i = 0;
}


Unit.prototype.getStanceHash = function() {
    return (this.stances[this.stance]);
}

Unit.prototype.getProperFrames = function() {
  return this.stances[this.stance]["spriteIndecies"];
}

Unit.prototype.animationIsConcluded = function() {
  if (this.spriteIndex_i > this.stances[this.stance]["spriteIndecies"].length - 1 )
    return true;
  else
    return false;
}

Unit.prototype.update = function() {
  var stanceHash = this.getStanceHash();
  if (stanceHash["animationCycleSlowness"] == undefined)
    return;

  if (this.isBeingDebugged) {
    document.getElementById("animationFrameIndex").innerHTML = this.spriteIndex_i;
    document.getElementById("animationFrameInJsonFile").innerHTML = this.stances[this.stance]["spriteIndecies"][this.spriteIndex_i];
    return;
  }

  if (game.tickCount % stanceHash["animationCycleSlowness"] === 0) {
    var properFrames = this.getProperFrames();

    var stanceData = this.stances[this.stance];
    if (stanceData["loop"] && properFrames.length != 1) {  // if we're looping, and have more than one frame to loop over...
      this.spriteIndex_i = (1 + this.spriteIndex_i) % (properFrames.length);
    }
    else if (!stanceData["loop"]) {
      this.spriteIndex_i = (1 + this.spriteIndex_i);

      // if you're over-indexed... switch stance to "followedBy"
      if ( this.animationIsConcluded() ) {
        if (stanceData["followedBy"] != undefined) {
          this.setStance(stanceData["followedBy"]);
        }
        else { // destroy the object if it doesn't loop, nor does it want to
          this.spriteIndex_i = properFrames.length - 1;  // move back to the final frame....
          this.destroyMe = true;
        }
      }
    }







    // console.log("UPDATE PHASE:")
    // console.log("(1 + " + this.spriteIndex_i + ") % (" + properFrames.length + ")");
    // console.log("spriteIndex_i: " + this.spriteIndex_i)
    // console.log("properFrames:" + properFrames)
    // console.log("")
  }
}


Unit.prototype.aiMovementPositionUpdate = function() {

  if (this.aiMoving) {
    if (game.tickCount % this.aiMovementSlowness === 0) {

      if (this.destinationPoint[0] < this.x) { // if we need to go left
        this.x = this.x-this.aiMovementAmount;

        if (this.destinationPoint[0] > this.x) // if we overshot our destination
          this.x = this.destinationPoint[0];
      }
      else if (this.destinationPoint[0] > this.x) { // if we need to go right
        this.x = this.x+this.aiMovementAmount;
        if (this.destinationPoint[0] < this.x) // if we overshot our destination
          this.x = this.destinationPoint[0];
      }
      else if (this.destinationPoint[1] < this.y) { // if we need to go down
        this.y = this.y - this.aiMovementAmount
        if (this.destinationPoint[1] > this.y) // if we overshot our destination
          this.y = this.destinationPoint[1];
      }
      else if (this.destinationPoint[1] > this.y) { // if we need to go up
        this.y = this.y + this.aiMovementAmount
        if (this.destinationPoint[1] < this.y) // if we overshot our destination
          this.y = this.destinationPoint[1];
      }

      if (this.x == this.destinationPoint[0] && this.y == this.destinationPoint[1]) {
        this.aiMoving = false;
        this.setStance("standing");
      }

    }
  }
}


Unit.prototype.setStance = function(stance) {
  this.stance = stance;

  this.playAssociatedAudio(stance);

  var properFrames = this.getProperFrames();
  this.spriteIndex_i = 0;
}

Unit.prototype.playAssociatedAudio = function(stance) {
  var stanceHash = this.getStanceHash()

  if (stanceHash["audoKeys"] != undefined) {
    var soundName = stanceHash["audoKeys"][0]["name"]
    game.sound[soundName].play();
  }
}

Unit.prototype.goTowards = function(point) {
  this.aiMoving = true;
  this.destinationPoint = point;
  this.aiMovementAmount = 1;
  this.aiMovementSlowness = 1;
}


Unit.prototype.draw = function(ctx) {
  this.aiMovementPositionUpdate();

  var properFrames = this.getProperFrames();
  if (properFrames[this.spriteIndex_i] == undefined) {
    console.log("this.spriteIndex_i: " + this.spriteIndex_i);
  }
  var frame = this.spriteSheetData[properFrames[this.spriteIndex_i]]["frame"];
  var image = game.graphics.imageCache[this.spriteSheet];

  ctx.drawImage(image,
      frame['x'], frame['y'],   // src position
      frame['w'], frame['h'],   // src bounds (width/ height)
      this.x + this.animation_x, this.y + this.animation_y,    // dst position
      this.sizeMultiplier * frame['w'], this.sizeMultiplier * frame['h']);  // dst bounds
};
