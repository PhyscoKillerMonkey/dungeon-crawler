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



// Create the loader and load textures
let loader = new ex.Loader();
let resources = {
  txPlayer: new ex.Texture("/assets/player.png")
}
for (let r in resources) { loader.addResource(resources[r]); }



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

  class Player extends ex.Actor {
    private speed = 32;
    private facing = "up";
    private facingStack: string[] = [];
    private mV = new ex.Vector(0, 0);

    constructor() { 
      super(); 
    }

    public onInitialize(engine: ex.Engine) {
      let idleSpeed = 500;
      let runSpeed = 200;

      let spriteSheet = new ex.SpriteSheet(resources.txPlayer, 4, 5, 16, 16);

      let idleAnimU = spriteSheet.getAnimationBetween(engine, 8, 10, idleSpeed);idleAnimU.loop = true;
      let idleAnimR = spriteSheet.getAnimationBetween(engine, 2, 4, idleSpeed);idleAnimR.loop = true;
      let idleAnimD = spriteSheet.getAnimationBetween(engine, 0, 2, idleSpeed);idleAnimD.loop = true;
      let idleAnimL = spriteSheet.getAnimationBetween(engine, 10, 12, idleSpeed);idleAnimL.loop = true;

      let walkAnimU = spriteSheet.getAnimationByIndices(engine, [12, 8, 13, 8], runSpeed);walkAnimU.loop = true;
      let walkAnimR = spriteSheet.getAnimationByIndices(engine, [6, 2, 7, 2], runSpeed);walkAnimR.loop = true;
      let walkAnimD = spriteSheet.getAnimationByIndices(engine, [4, 0, 5, 0], runSpeed);walkAnimD.loop = true;
      let walkAnimL = spriteSheet.getAnimationByIndices(engine, [14, 10, 15, 10], runSpeed);walkAnimL.loop = true;

      this.addDrawing("idleU", idleAnimU);
      this.addDrawing("idleR", idleAnimR);
      this.addDrawing("idleD", idleAnimD);
      this.addDrawing("idleL", idleAnimL);

      this.addDrawing("walkU", walkAnimU);
      this.addDrawing("walkR", walkAnimR);
      this.addDrawing("walkD", walkAnimD);
      this.addDrawing("walkL", walkAnimL);

      this.scale = new ex.Vector(grid.scale, grid.scale);
    }

    public update(engine: ex.Engine, delta) {
      super.update(engine, delta);
      
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

      if (this.facingStack[this.facingStack.length-1] != null) {
        this.facing = this.facingStack[this.facingStack.length-1];
      }

      if (this.mV.x != 0 || this.mV.y != 0) {
        this.vel = this.mV.normalize().scale(100);
        switch (this.facing) {
          case "up": this.setDrawing("walkU"); break;
          case "right": this.setDrawing("walkR"); break;
          case "down": this.setDrawing("walkD"); break;
          case "left": this.setDrawing("walkL"); break;
        }

      } else {
        this.vel.setTo(0, 0);
        switch (this.facing) {
          case "up": this.setDrawing("idleU"); break;
          case "right": this.setDrawing("idleR"); break;
          case "down": this.setDrawing("idleD"); break;
          case "left": this.setDrawing("idleL"); break;
        }
      }
    }
  }

  let player = new Player();
  player.x = game.getWidth() / 2;
  player.y = game.getHeight() / 2;
  game.add(player);
}); 