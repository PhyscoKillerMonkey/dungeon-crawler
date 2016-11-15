// Create an instance of the engine
let game = new ex.Engine({
  width: 800,
  height: 600
});



let paddle = new ex.Actor(150, game.getHeight() - 40, 200, 20);
paddle.color = ex.Color.Chartreuse;
paddle.collisionType = ex.CollisionType.Fixed;

game.input.pointers.primary.on("move", function(evt: PointerEvent) {
  paddle.x = evt.x;
});

game.add(paddle);



let ball = new ex.Actor(100, 300, 20, 20);
ball.color = ex.Color.Red;
let ballV = 300;
ball.vel.setTo(ballV, ballV);
ball.collisionType = ex.CollisionType.Elastic;

// Wall-physics for the ball against the walls
ball.on("update", function() {
  if (ball.pos.x < (ball.getWidth() / 2) || 
     ball.pos.x + (ball.getWidth() / 2) > game.getWidth()) {
    ball.vel.x *= -1;
  }

  if (ball.pos.y < 0) {
    ball.vel.y *= -1;
  }  
});

// Custom draw code for the ball
ball.draw = function (ctx, delta) {
  ctx.fillStyle = ball.color.toString();
  ctx.beginPath();
  ctx.arc(ball.pos.x, ball.pos.y, 10, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

game.add(ball);



// Build bricks
// Padding between the bricks
let padding = 20;
let xoffset = 30;
let yoffset = 20;
let colums = 10;
let rows = 3;

let brickColors = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];

let brickWidth = game.getWidth() / colums - padding - padding / colums;
let brickHeight = 30;
let bricks: ex.Actor[] = [];
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < colums; x++) {
    bricks.push(new ex.Actor(
      xoffset + x * (brickWidth + padding) + padding,
      yoffset + y * (brickHeight + padding) + padding,
      brickWidth,
      brickHeight,
      brickColors[y % brickColors.length]));
  }
}

// Remove the brick if the ball collides with it
ball.on("collision", function(e: ex.CollisionEvent) {
  if (bricks.indexOf(e.other) > -1) {
    e.other.kill();
  }
})

// Make sure all the bricks collide and are added to the game
bricks.forEach(function(brick) {
  brick.collisionType = ex.CollisionType.Active;
  game.add(brick);
});

// Start the engine to begin the game
game.start();