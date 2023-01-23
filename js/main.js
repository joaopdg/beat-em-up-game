/* Old values (windows)
this.interval = setInterval(updateGameArea, 20);
*/

const startButton = document.getElementsByClassName("start-button")[0];

let gameRunning = false;

window.onload = () => {
  startButton.onclick = () => {
    if (startButton.className === "start-button") {
      gameEngine.start();
      startButton.innerHTML = "PLAY AGAIN";
      startButton.className = "reset-button";
    } else {
      gameEngine.resetGame();
    }
  };
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

const player = new Player();
const dragonBoss = new Boss();
const background = new Background();
let points = 0;

const gameEngine = {
  frames: 0,
  start: function () {
    gameRunning = true;
    this.interval = setInterval(updateGameArea, 10);
    bgMusic.play();
  },
  resetGame: function () {
    if (gameRunning === false) {
      clearInterval(this.interval);
      ctx.clearRect(0, 0, cWidth, cHeight);
      this.frames = 0;
      points = 0;
      player.life = 340;
      player.x = 20;
      player.y = 250;
      enemiesBack.length = 0;
      enemiesFront.length = 0;
      dragonBoss.x = 1100;
      bossLife = 483;
      bossBarY = 340;
      this.start();
    }
  },
  win: function () {
    if (bossLife >= 823) {
      clearInterval(this.interval);
      gameRunning = false;
      youWinS.play();
    }
  },
  stop: function () {
    if (player.life <= 0) {
      clearInterval(this.interval);
      gameRunning = false;
      youLoseS.play();
    }
  },
  finalScreen: function () {
    if (bossLife >= 823) {
      ctx.drawImage(youWinScreen, 0, 0, 900, 500);
    }
    if (player.life <= 0) {
      ctx.drawImage(gameOverScreen, 0, 0, 900, 500);
    }
    if (dragonBoss.x < 1000 && dragonBoss.x > 800) {
      ctx.drawImage(finalBossScreen, 0, 0, 900, 500);
    }
  },
  score: function () {
    if (points < 0) {
      points = 0;
    }
    ctx.fillStyle = "white";
    ctx.font = "14px Helvetica";
    ctx.fillText(`Score: ${points}`, 85, 70);
    /* Time hidden because speed-up for mac
    ctx.font = "18px Helvetica";
    ctx.fillText(Math.floor(`${gameEngine.frames}` / 60), 443, 57);
    */
  },
  lifeBar: function () {
    ctx.fillStyle = "darkred";
    ctx.fillRect(85, 41, 340, 14);
    ctx.fillStyle = "darkorange";
    ctx.fillRect(85, 41, player.life, 14);
    ctx.drawImage(playerLifeBar, 20, 20, 423, 60);
  },
  bossLifeBar: function () {
    if (dragonBoss.x === dragonBoss.finalX) {
      ctx.fillStyle = "darkred";
      ctx.fillRect(483, 41, 340, 14);
      ctx.fillStyle = "darkorange";
      ctx.fillRect(bossLife, 41, bossBarY, 14);
      ctx.drawImage(bossLifeBar, 465, 20, 423, 60);
    }
  },
};

const updateGameArea = () => {
  background.drawBackground();
  updateEnemiesBack();
  player.drawPlayer();
  updateFire();
  updateBoss();
  updateEnemiesFront();
  background.drawFence();
  checkGameOver();
  gameEngine.score();
  gameEngine.stop();
  gameEngine.win();
  gameEngine.lifeBar();
  gameEngine.bossLifeBar();
  gameEngine.finalScreen();
};

function checkGameOver() {
  // COLLISION WITH BACK ROW ENEMIES
  for (let i = 0; i < enemiesBack.length; i++) {
    if (
      player.crashWith(enemiesBack[i]) &&
      player.width === player.widthStopped
    ) {
      if (player.x > 100) {
        player.x -= 60;
      } else {
        enemiesBack[i].x += 60;
      }
      playerHurt.play();
      player.life -= 40;
    }
    if (
      player.crashWith(enemiesBack[i]) &&
      player.width === player.widthBlocking
    ) {
      if (player.x > 100) {
        player.x -= 60;
      } else {
        enemiesBack[i].x += 60;
      }
      playerHurt.play();
      player.life -= 10;
    }
    if (
      player.crashWith(enemiesBack[i]) &&
      player.width === player.withPunching
    ) {
      enemiesBack[i].life -= 50;
      enemiesBack[i].x += 60;
    }
    if (
      player.crashWith(enemiesBack[i]) &&
      player.width === player.widthKicking
    ) {
      enemiesBack[i].life -= 100;
      enemiesBack[i].x += 90;
    }
    if (enemiesBack[i].x + enemiesBack[i].width <= 0) {
      enemiesBack.splice(i, 1);
      playerHurt.play();
      player.life -= 30;
      points -= 50;
    }
    if (enemiesBack[i].life <= 0) {
      enemyHurt.play();
      enemiesBack.splice(i, 1);
      points += 100;
    }
  }

  // COLLISION WITH FRONT ROW ENEMIES
  for (let i = 0; i < enemiesFront.length; i++) {
    if (
      player.crashWith(enemiesFront[i]) &&
      player.width === player.widthStopped
    ) {
      if (player.x > 100) {
        player.x -= 60;
      } else {
        enemiesFront[i].x += 60;
      }
      playerHurt.play();
      player.life -= 40;
    }
    if (
      player.crashWith(enemiesFront[i]) &&
      player.width === player.widthBlocking
    ) {
      if (player.x > 100) {
        player.x -= 60;
      } else {
        enemiesFront[i].x += 60;
      }
      playerHurt.play();
      player.life -= 10;
    }
    if (
      player.crashWith(enemiesFront[i]) &&
      player.width === player.withPunching
    ) {
      enemiesFront[i].life -= 50;
      enemiesFront[i].x += 60;
    }
    if (
      player.crashWith(enemiesFront[i]) &&
      player.width === player.widthKicking
    ) {
      enemiesFront[i].life -= 100;
      enemiesFront[i].x += 90;
    }
    if (enemiesFront[i].x + enemiesFront[i].width <= 0) {
      enemiesFront.splice(i, 1);
      playerHurt.play();
      player.life -= 30;
      points -= 50;
    }
    if (enemiesFront[i].life <= 0) {
      enemyHurt.play();
      enemiesFront.splice(i, 1);
      points += 100;
    }
  }

  // COLLISION WITH BOSS
  if (player.crashWith(dragonBoss) && player.width === player.widthStopped) {
    playerHurt.play();
    player.life -= 55;
    player.x -= 60;
  }
  if (
    player.crashWith(dragonBoss) &&
    player.width === player.withPunching &&
    bossLife > 0
  ) {
    bossLife += 2;
    bossBarY -= 2;
    player.x -= 5;
  }
  if (
    player.crashWith(dragonBoss) &&
    player.width === player.widthKicking &&
    bossLife > 0
  ) {
    bossLife += 4;
    bossBarY -= 4;
    player.x -= 10;
  }
  if (bossLife >= 823) {
    points += 1000;
  }

  // COLLISION WITH FIRE
  for (let i = 0; i < fireArray.length; i++) {
    function crashWithFire(enemies) {
      return !(
        player.y + player.height < enemies.top() ||
        player.y + 10 > enemies.bottom() ||
        player.x + player.width < enemies.left() ||
        player.x > enemies.right()
      );
    }
    if (crashWithFire(fireArray[i]) && player.width === player.widthBlocking) {
      playerHurt.play();
      player.life -= 0.08;
    }
    if (crashWithFire(fireArray[i]) && player.width !== player.widthBlocking) {
      playerHurt.play();
      player.life -= 0.25;
    }
  }
}
