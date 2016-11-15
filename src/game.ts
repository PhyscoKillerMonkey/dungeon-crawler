// World constants
let grid = {
  size: 8,
  width: 20,
  height: 18,
  scale: 4
} 

let palette = [
  ex.Color.fromHex("#cecead"), 
  ex.Color.fromHex("#a5a58c"), 
  ex.Color.fromHex("#6b6b52"),
  ex.Color.fromHex("#292919")];

// Create engine instance
let game = new ex.Engine({
  width: grid.size * grid.width * grid.scale,
  height: grid.size * grid.height * grid.scale
});

let txPlayer = new ex.Texture("/assets/player.png");
let loader = new ex.Loader([txPlayer]);

function keyHeld(key: string): boolean {
  if (game.input.keyboard.isHeld(ex.Input.Keys[key])) {
    return true;
  } else {
    return false;
  }
}

function keyPressed(key: string): boolean {
  if (game.input.keyboard.wasPressed(ex.Input.Keys[key])) {
    return true;
  } else {
    return false;
  }
}

function keyReleased(key: string): boolean {
  if (game.input.keyboard.wasReleased(ex.Input.Keys[key])) {
    return true;
  } else {
    return false;
  }
}

// Start game
game.start(loader).then(function() {
  game.setAntialiasing(false);

  game.backgroundColor = palette[3];

  let playerSprite = new ex.Sprite(txPlayer, 0, 0, 16, 16);
  playerSprite.scale = new ex.Vector(grid.scale, grid.scale);

  class Player extends ex.Actor {
    private speed = 32;
    private mV = new ex.Vector(0, 0);

    constructor() {
      super();
    }

    public update(engine: ex.Engine, delta) {
      super.update(engine, delta);
      
      if (keyPressed("Up")) { this.mV.addEqual(new ex.Vector(0, -1)); }
      if (keyPressed("Right")) { this.mV.addEqual(new ex.Vector(1, 0)); }
      if (keyPressed("Down")) { this.mV.addEqual(new ex.Vector(0, 1)); }
      if (keyPressed("Left")) { this.mV.addEqual(new ex.Vector(-1, 0)); }
      
      if (keyReleased("Up")) { this.mV.subEqual(new ex.Vector(0, -1)); }
      if (keyReleased("Right")) { this.mV.subEqual(new ex.Vector(1, 0)); }
      if (keyReleased("Down")) { this.mV.subEqual(new ex.Vector(0, 1)); }
      if (keyReleased("Left")) { this.mV.subEqual(new ex.Vector(-1, 0)); }

      if (this.mV.x != 0 || this.mV.y != 0) {
        this.vel = this.mV.normalize().scale(100);
      } else {
        this.vel.setTo(0, 0);
      }
    }
  }

  let player = new Player();
  player.addDrawing(playerSprite);
  game.add(player);
}); 