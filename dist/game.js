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
// Create the loader and load textures
var loader = new ex.Loader();
var resources = {
    txPlayer: new ex.Texture("/assets/player.png")
};
for (var r in resources) {
    loader.addResource(resources[r]);
}
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
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this);
            this.speed = 32;
            this.facing = "up";
            this.facingStack = [];
            this.mV = new ex.Vector(0, 0);
        }
        Player.prototype.onInitialize = function (engine) {
            var idleSpeed = 500;
            var runSpeed = 200;
            var spriteSheet = new ex.SpriteSheet(resources.txPlayer, 4, 5, 16, 16);
            var idleAnimU = spriteSheet.getAnimationBetween(engine, 8, 10, idleSpeed);
            idleAnimU.loop = true;
            var idleAnimR = spriteSheet.getAnimationBetween(engine, 2, 4, idleSpeed);
            idleAnimR.loop = true;
            var idleAnimD = spriteSheet.getAnimationBetween(engine, 0, 2, idleSpeed);
            idleAnimD.loop = true;
            var idleAnimL = spriteSheet.getAnimationBetween(engine, 10, 12, idleSpeed);
            idleAnimL.loop = true;
            var walkAnimU = spriteSheet.getAnimationByIndices(engine, [12, 8, 13, 8], runSpeed);
            walkAnimU.loop = true;
            var walkAnimR = spriteSheet.getAnimationByIndices(engine, [6, 2, 7, 2], runSpeed);
            walkAnimR.loop = true;
            var walkAnimD = spriteSheet.getAnimationByIndices(engine, [4, 0, 5, 0], runSpeed);
            walkAnimD.loop = true;
            var walkAnimL = spriteSheet.getAnimationByIndices(engine, [14, 10, 15, 10], runSpeed);
            walkAnimL.loop = true;
            this.addDrawing("idleU", idleAnimU);
            this.addDrawing("idleR", idleAnimR);
            this.addDrawing("idleD", idleAnimD);
            this.addDrawing("idleL", idleAnimL);
            this.addDrawing("walkU", walkAnimU);
            this.addDrawing("walkR", walkAnimR);
            this.addDrawing("walkD", walkAnimD);
            this.addDrawing("walkL", walkAnimL);
            this.scale = new ex.Vector(grid.scale, grid.scale);
        };
        Player.prototype.update = function (engine, delta) {
            _super.prototype.update.call(this, engine, delta);
            if (keyPressed("Up")) {
                this.mV.addEqual(new ex.Vector(0, -1));
                this.facingStack.push("up");
            }
            if (keyPressed("Right")) {
                this.mV.addEqual(new ex.Vector(1, 0));
                this.facingStack.push("right");
            }
            if (keyPressed("Down")) {
                this.mV.addEqual(new ex.Vector(0, 1));
                this.facingStack.push("down");
            }
            if (keyPressed("Left")) {
                this.mV.addEqual(new ex.Vector(-1, 0));
                this.facingStack.push("left");
            }
            if (keyReleased("Up")) {
                this.mV.subEqual(new ex.Vector(0, -1));
                this.facingStack.splice(this.facingStack.indexOf("up"), 1);
            }
            if (keyReleased("Right")) {
                this.mV.subEqual(new ex.Vector(1, 0));
                this.facingStack.splice(this.facingStack.indexOf("right"), 1);
            }
            if (keyReleased("Down")) {
                this.mV.subEqual(new ex.Vector(0, 1));
                this.facingStack.splice(this.facingStack.indexOf("down"), 1);
            }
            if (keyReleased("Left")) {
                this.mV.subEqual(new ex.Vector(-1, 0));
                this.facingStack.splice(this.facingStack.indexOf("left"), 1);
            }
            if (this.facingStack[this.facingStack.length - 1] != null) {
                this.facing = this.facingStack[this.facingStack.length - 1];
            }
            if (this.mV.x != 0 || this.mV.y != 0) {
                this.vel = this.mV.normalize().scale(100);
                switch (this.facing) {
                    case "up":
                        this.setDrawing("walkU");
                        break;
                    case "right":
                        this.setDrawing("walkR");
                        break;
                    case "down":
                        this.setDrawing("walkD");
                        break;
                    case "left":
                        this.setDrawing("walkL");
                        break;
                }
            }
            else {
                this.vel.setTo(0, 0);
                switch (this.facing) {
                    case "up":
                        this.setDrawing("idleU");
                        break;
                    case "right":
                        this.setDrawing("idleR");
                        break;
                    case "down":
                        this.setDrawing("idleD");
                        break;
                    case "left":
                        this.setDrawing("idleL");
                        break;
                }
            }
        };
        return Player;
    }(ex.Actor));
    var player = new Player();
    player.x = game.getWidth() / 2;
    player.y = game.getHeight() / 2;
    game.add(player);
});
//# sourceMappingURL=game.js.map