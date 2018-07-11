// new Unit("ghost", 0, "assets/enemies.png", [0, 0], "floating")
function Unit(type, id, spriteSheet, position, stance) {
    if (arguments.length == 0) return;
    this.id = id;
    this.name =  "blah";   // Unit.getUnitName(type, id);
    this.type = type; // ghost, mob, hero, critter
    //this.shadowImages;
    this.position = position; // position on the battle screen...
    this.x = position[0]; // these variables are for hovering/ flying effects and misc. toneberry shananagins
    this.y = position[1];

    this.spriteSheet = "assets/enemies.png";
    this.image = new Image();
    this.spriteSheetData = enemies_data["frames"];

    this.stance = "floating";

    this.spriteCurrentIndex = 4;

    this.sprites = {
        "floating": {
          "spriteIndecies": [4, 5]
        }
    };

}

Unit.prototype.loadGraphics = function() {
  this.image.src = this.spriteSheet;
}


Unit.prototype.update = function() {
    var tickCount = game.tickCount;
    if (tickCount % 10 === 0) {
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
        this.x, this.y,    // dst position
        2*frame['w'], 2*frame['h']);  // dst bounds
};
