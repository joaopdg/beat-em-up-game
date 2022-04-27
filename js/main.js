const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

const player = new Player();
const background = new Background();
let points = 0;

const gameEngine = {
  frames: 0,
  start: function () {
    this.interval = setInterval(updateGameArea, 20);
  },
  win: function () {
    if (bossLife <= 0) {
      clearInterval(this.interval);
      ctx.fillStyle = "green";
      ctx.fillText("YOU WIN", 420, 225);
    }
  },
  stop: function () {
    if (player.life <= 0) {
      clearInterval(this.interval);
      ctx.fillStyle = "red";
      ctx.fillText("GAME OVER", 400, 225);
    }
  },
  score: function () {
    ctx.font = "18px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${points}`, 30, 490);
    ctx.font = "20px Helvetica";
    ctx.fillText(`${gameEngine.frames}`, 450, 55);
/*     ctx.fillText(Math.floor(`${gameEngine.frames}` / 60), 450, 55); */
  },
  lifeBar: function () {
    ctx.fillStyle = "black";
    ctx.fillText("LIFE", 30, 35);
    ctx.fillStyle = "green";
    ctx.fillRect(31, 41, player.life, 18);
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 40, 300, 20);
  },
  bossLifeBar: function () {
    if (bossArray.length === 1) {
      ctx.fillStyle = "black";
      ctx.fillText("FIRE DRAGON", 732, 35);
      ctx.fillStyle = "red";
      ctx.fillRect(570, 41, bossLife, 18);
      ctx.lineWidth = 2;
      ctx.strokeRect(570, 40, 300, 20);
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
      player.life -= 20;
      enemiesBack.splice(enemiesBack[i], 1);
    }
    if (enemiesBack[i].life <= 0) {
      enemiesBack.splice(enemiesBack[i], 1);
      points += 1;
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
      player.life -= 20;
      enemiesFront.splice(enemiesFront[i], 1);
    }
    if (enemiesFront[i].life <= 0) {
      enemiesFront.splice(enemiesFront[i], 1);
      points += 1;
    }
  }

  // COLLISION WITH BOSS
  for (let i = 0; i < bossArray.length; i++) {
    if (
      player.crashWith(bossArray[i]) &&
      player.width === player.widthStopped
    ) {
      player.life -= 55;
      player.x -= 60;
    }
    if (
      player.crashWith(bossArray[i]) &&
      player.width === player.withPunching &&
      bossLife > 0
    ) {
      bossLife -= 1;
      player.x -= 2;
    }
    if (
      player.crashWith(bossArray[i]) &&
      player.width === player.widthKicking &&
      bossLife > 0
    ) {
      bossLife -= 2;
      player.x -= 2;
    }
    if (bossLife <= 0) {
      points += 100;
      setTimeout(() => {
        bossArray.pop(bossArray[i]);
      }, 1000);
    }
  }

  // COLLISION WITH FIRE
  for (let i = 0; i < fireArray.length; i++) {
    function crashWithFire(enemies) {
      return !(
        player.y + player.height < enemies.top() ||
        player.y > enemies.bottom() ||
        player.x + player.width < enemies.left() ||
        player.x > enemies.right()
      );
    }
    if (crashWithFire(fireArray[i]) && player.width === player.widthBlocking) {
      player.life -= 0.08;
    }
    if (crashWithFire(fireArray[i]) && player.width !== player.widthBlocking) {
      player.life -= 0.25;
    }
  }
}

// START GAME
gameEngine.start();
