// PLAYER ANIMATION
let playerStopped = new Image();
playerStopped.src = "/docs/assets/imgs/player_stopped.png";
let playerWalking1 = new Image();
playerWalking1.src = "/docs/assets/imgs/player_walking1.png";
let playerWalking2 = new Image();
playerWalking2.src = "/docs/assets/imgs/player_walking2.png";
let playerPunch = new Image();
playerPunch.src = "/docs/assets/imgs/player_punch.png";
let playerDown = new Image();
playerDown.srrc = "/docs/assets/imgs/player_down.png";
let playerImage = new Image();
playerImage.src = playerStopped.src;

function playerWalking() {
  if (gameEngine.frames % 10 === 0) {
    playerImage.src = playerWalking1.src;
  } else if (gameEngine.frames % 15 === 1) {
    playerImage.src = playerWalking2.src;
  }
}

/* function playerHit() {
  if (gameEngine.frames % 10 === 1) {
    player.width = 80;
    playerImage.src = playerDown.src;
  } else if (gameEngine.frames % 15 === 0) {
    player.width = 80;
    playerImage.src = playerDown.src;
  }
} */

// ENEMY ANIMATION
let enemyStopped = new Image();
enemyStopped.src = "/docs/assets/imgs/player_stopped.png";
let enemyWalking1 = new Image();
enemyWalking1.src = "/docs/assets/imgs/enemy_walking1.png";
let enemyWalking2 = new Image();
enemyWalking2.src = "/docs/assets/imgs/enemy_walking2.png";
let enemyImage = new Image();
enemyImage.src = enemyStopped.src;

function enemyWalking() {
  if (gameEngine.frames % 20 === 0) {
    enemyImage.src = enemyWalking1.src;
  } else if (gameEngine.frames % 25 === 0) {
    enemyImage.src = enemyWalking2.src;
  }
}
