// Define the assets that get loading into your application here...
// The methods defined here are invoked in the 'heart' game file...


window.InitialFantasy.prototype.Sound = function() {
    this.audMenuMove = new Howl({
        urls: ["/audio/misc/menu_move.ogg"],
        volume: 0.05
    });
};
