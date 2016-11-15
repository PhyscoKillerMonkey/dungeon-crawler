var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// World constants
var grid = {
    size: 8,
    width: 20,
    height: 18,
    scale: 4
};
var palette = [
    ex.Color.fromHex("#cecead"),
    ex.Color.fromHex("#a5a58c"),
    ex.Color.fromHex("#6b6b52"),
    ex.Color.fromHex("#292919")];
// Create engine instance
var game = new ex.Engine({
    width: grid.size * grid.width * grid.scale,
    height: grid.size * grid.height * grid.scale
});
var txPlayer = new ex.Texture("/assets/player.png");
var loader = new ex.Loader([txPlayer]);
function keyHeld(key) {
    if (game.input.keyboard.isHeld(ex.Input.Keys[key])) {
        return true;
    }
    else {
        return false;
    }
}
function keyPressed(key) {
    if (game.input.keyboard.wasPressed(ex.Input.Keys[key])) {
        return true;
    }
    else {
        return false;
    }
}
function keyReleased(key) {
    if (game.input.keyboard.wasReleased(ex.Input.Keys[key])) {
        return true;
    }
    else {
        return false;
    }
}
// Start game
game.start(loader).then(function () {
    game.setAntialiasing(false);
    game.backgroundColor = palette[3];
    var playerSprite = new ex.Sprite(txPlayer, 0, 0, 16, 16);
    playerSprite.scale = new ex.Vector(grid.scale, grid.scale);
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this);
            this.speed = 32;
            this.mV = new ex.Vector(0, 0);
        }
        Player.prototype.update = function (engine, delta) {
            _super.prototype.update.call(this, engine, delta);
            if (keyPressed("Up")) {
                this.mV.addEqual(new ex.Vector(0, -1));
            }
            if (keyPressed("Right")) {
                this.mV.addEqual(new ex.Vector(1, 0));
            }
            if (keyPressed("Down")) {
                this.mV.addEqual(new ex.Vector(0, 1));
            }
            if (keyPressed("Left")) {
                this.mV.addEqual(new ex.Vector(-1, 0));
            }
            if (keyReleased("Up")) {
                this.mV.subEqual(new ex.Vector(0, -1));
            }
            if (keyReleased("Right")) {
                this.mV.subEqual(new ex.Vector(1, 0));
            }
            if (keyReleased("Down")) {
                this.mV.subEqual(new ex.Vector(0, 1));
            }
            if (keyReleased("Left")) {
                this.mV.subEqual(new ex.Vector(-1, 0));
            }
            if (this.mV.x != 0 || this.mV.y != 0) {
                this.vel = this.mV.normalize().scale(100);
            }
            else {
                this.vel.setTo(0, 0);
            }
        };
        return Player;
    }(ex.Actor));
    var player = new Player();
    player.addDrawing(playerSprite);
    game.add(player);
});
//# sourceMappingURL=game.js.map