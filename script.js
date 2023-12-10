// Game variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const boundaryWidth = 40;
const boundaryHeight = 40;
const playerRadius = 15;
const playerVelocity = 3;

// Make canvas fullscreen
canvas.width = innerWidth;
canvas.height = innerHeight;

// Boundary class for walls
class Boundary {
  static width = 40;
  static height = 40;
  constructor({ pos }) {
    this.pos = pos;
    this.width = boundaryWidth;
    this.height = boundaryHeight;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

// Pacman
class Player {
  direction = "";
  constructor({ pos, velocity }) {
    this.pos = pos;
    this.velocity = velocity;
    this.radius = playerRadius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    switch (this.direction) {
      case "up":
        if(isValidMove(this.pos, this.direction)) {
          this.pos.y -= playerVelocity;
        }
        break;
      case "down":
        if(isValidMove(this.pos, this.direction)) {
          this.pos.y += playerVelocity;
        }
        break;
      case "left":
        if(isValidMove(this.pos, this.direction)) {
          this.pos.x -= playerVelocity;
        }
        break;
      case "right":
        if(isValidMove(this.pos, this.direction)) {
          this.pos.x += playerVelocity;
        }
        break;
    }
  }
}

const player = new Player({
  pos: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
});

const map = [
  ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
  ["1", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
  ["1", "0", "1", "1", "1", "0", "1", "1", "0", "1"],
  ["1", "0", "0", "0", "0", "0", "0", "1", "0", "1"],
  ["1", "0", "1", "1", "0", "1", "0", "1", "0", "1"],
  ["1", "0", "1", "0", "0", "1", "0", "1", "0", "1"],
  ["1", "0", "1", "0", "1", "1", "0", "1", "0", "1"],
  ["1", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
  ["1", "0", "1", "1", "0", "1", "1", "1", "0", "1"],
  ["1", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
  ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
];

const boundaries = [];

map.forEach((row, i) => {
  row.forEach((elem, j) => {
    if (elem === "1") {
      boundaries.push(
        new Boundary({
          pos: {
            x: boundaryWidth * j,
            y: boundaryHeight * i,
          },
        })
      );
    }
  });
});

// Update game state
function updateGame() {
  // Update Pacman's position
  player.move();
}

// Draw the game
function drawGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  // Draw Pacman
  player.draw();
}

// Main game loop
function gameLoop() {
  drawGame();
  updateGame();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowUp":
      player.direction = "up";
      break;
    case "ArrowDown":
      player.direction = "down";
      break;
    case "ArrowLeft":
      player.direction = "left";
      break;
    case "ArrowRight":
      player.direction = "right";
      break;
  }
});

// Increase game speed gradually
// setInterval(()=>playerVelocity+=1,3000);
