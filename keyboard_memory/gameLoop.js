
// This mixin is applied to InitialFantasy to give it a game loop pipeline
// pattern from within initialize_game.js
var asGameLoop = function() {
    this.tickCount = 0;
    var lastMainEndedAt = 0;
    var gameTime = 0.0;
    var gameFps = 0.0;
    var then = Date.now();
    var lastTick = 0; // the last time the game logic ticked was at...


    this.time = function() {
        return gameTime;
    };

    this.fps = function() {
        return gameFps;
    };

    this.main = function() {
        if (this.gameTime === undefined)
            this.gameTime = 0.0;

        if (this.lastDrawTime === undefined)
            this.lastDrawTime = 0.0;

        // TODO:  make this a var explicitly, prolly won't hurt anything...
        timeBetweenCallingMain = Date.now() - lastMainEndedAt;

        var now = Date.now();
        var delta = now - then;

        // This is so wierd!  We need to refer to game time as it's global space...
        // so it's global name is game... thus game.gameTime... wow...
        // this is because main is a callback from requestAnimationFrame...
        gameTime = gameTime + delta / 1000;

        var skipTicks = 1000 / 30; // 30 fps
        var loops = 0;
        var maxFrameSkip = 3; // skip the draw phase up to 3 times in a row if CPU is lagging
        var nextGameTick = (new Date).getTime() + 1000;

        var tickInterval = 30; // 50ms

        while (itsTimeToDoAnotherTick(lastTick, tickInterval) && // UPDATE DATA ONLY WHEN IT'S APPROPRIATE
            weHaventBeenNeglectingTheDrawFunctionTooLong(loops, maxFrameSkip)
        ) {
            lastTick = Date.now();

            update(delta / 1000); // passes in a decimal representing the number of seconds since last hit method...

            loops++;
            if (loops > 1) {
                console.debug('CPU SLACK!    update() calls are taking too long to complete');
            }
        }

        render(); // DRAW AS OFTEN AS YOU CAN

        gameFps = 1000 / delta;
        then = now;

        if (bankScore == "none yet" && game.time() > 10) {
            bankScore = avgFps;
            goldenScore = thisSpotWasRun;
        }
        lastMainEndedAt = Date.now();
    };

    // This function determines how frequently we perform the update() method in
    // the game loop.
    function itsTimeToDoAnotherTick(lastTick, tickInterval) {
        delta = Date.now() - lastTick;
        if (delta >= tickInterval * 4) {
            console.debug("we're an entire tick behind!  We probably aren't finishing drawing fast enough  " + delta + " / " + tickInterval + '   last draw t: ' + lastDrawTime);
            thisSpotWasRun++;
        }
        return delta >= tickInterval;
    }

    function weHaventBeenNeglectingTheDrawFunctionTooLong(loops, maxFrameSkip) {
        return loops < maxFrameSkip;
    }

    function render() {
        switch (game.currentScreen) {
            case "title_screen": // never use render loop for title screen... unless I make it more interesting...
                break;
            case "battle_screen":
                // game.battleScreen.render();
                window.draw();
                break;
            case "town_screen":
                break;
            case "world_screen":
                break;
        }
    }

    function update(secondsPassed) {
        eval(game.currentScreen + "_update()"); // call the update for the specific screen we're running
        game.tickCount++;
    }

    // This is how browsers loop quickly,
    // these animation frames are given a callback to perform the game loop...
    // This appears to be a shim...
    var setupGameTimer = function() {
        var onEachFrame;
        if (window.requestAnimationFrame) {
            onEachFrame = function(cb) {
                var _cb = function() {
                    cb();
                    requestAnimationFrame(_cb);
                };
                _cb();
            };
        } else {
            onEachFrame = function(cb) {
                setInterval(cb, 1000 / 60);
            };
        }

        window.onEachFrame = onEachFrame; // this global can now be called and it will do the appropriate thing across browser
    };
    setupGameTimer();

    return this;
};
