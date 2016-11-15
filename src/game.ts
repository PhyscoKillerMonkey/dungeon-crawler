/// <reference path="player.ts" />
import Player = PlayerClass.Player;

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

  let player = new Player(resources.txPlayer, grid.scale);
  player.x = game.getWidth() / 2;
  player.y = game.getHeight() / 2;
  game.add(player);
}); 