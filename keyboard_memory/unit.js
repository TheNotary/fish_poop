// new Unit("ghost", 0, "assets/enemies.png", [0, 0], "floating")
function Unit(type, id, spriteSheet, spriteData, position, stances, stance, config) {
    if (arguments.length == 0) return;
    this.id = id;
    this.name =  "blah";   // Unit.getUnitName(type, id);
    this.type = type; // ghost, mob, hero, critter
    //this.shadowImages;
    this.position = position; // position on the battle screen...
    this.x = position[0]; // these variables are for hovering/ flying effects and misc. toneberry shananagins
    this.y = position[1];
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


    this.stances = stances;

    if (stance == undefined)
      this.stance = Object.keys(stances)[0]
    else
      this.stance = stance

    // this.stance = stance;
    // this.stance = (stance == undefined ? stances[0] : stances[stance]);

    this.spriteCurrentIndex = 4;

    this.sprites = stances;
}


Unit.prototype.loadGraphics = function() {
  this.image.src = this.spriteSheet;
}

Unit.prototype.getStanceHash = function() {
    return (this.stances[this.stance]);
}


Unit.prototype.update = function() {
    var tickCount = game.tickCount;
    if (tickCount % this.getStanceHash()["animationCycleSlowness"] === 0) {
        var properFrames = this.sprites[this.stance]["spriteIndecies"];
        // if spriteCurrentIndex isn't within the properFrames possible, set it to the first of one
        if ( !properFrames.includes(this.spriteCurrentIndex) ) {
            this.spriteCurrentIndex = properFrames[0];
        }
        else {
            // oscilate between sprites in animation
            this.spriteCurrentIndex = properFrames[ properFrames.indexOf(this.spriteCurrentIndex) + 1 % properFrames.length ];
        }
    }
}


Unit.prototype.draw = function(ctx) {
    var properFrames = this.sprites[this.stance]["spriteIndecies"];
    // if spriteCurrentIndex isn't within the properFrames possible, set it to the first of one
    if ( !properFrames.includes(this.spriteCurrentIndex) ) {
        this.spriteCurrentIndex = properFrames[0];
    }
    var frame = this.spriteSheetData[this.spriteCurrentIndex]['frame'];

    ctx.drawImage(this.image,
        frame['x'], frame['y'],   // src position
        frame['w'], frame['h'],   // src bounds (width/ height)
        this.x + this.animation_x, this.y + this.animation_y,    // dst position
        this.sizeMultiplier * frame['w'], this.sizeMultiplier * frame['h']);  // dst bounds
};
