const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

const player = new Player();
const background = new Background();
let points = 0;

//DELETE LATER
const measures = new Measures();

const gameEngine = {
  frames: 0,
  start: function () {
    this.interval = setInterval(updateGameArea, 20);
  },
  win: function () {
    if (points === 50) {
      clearInterval(this.interval);
      ctx.fillStyle = "green";
      ctx.fillText("YOU WIN", 420, 225);
    }
  },
  stop: function () {
    clearInterval(this.interval);
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 400, 225);
  },
  score: function () {
    ctx.font = "18px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${points}`, 30, 490);
    ctx.font = "12px Helvetica";
    ctx.fillText(`frames: ${gameEngine.frames}`, 800, 35);
  },
  lifeBar: function () {
    ctx.fillStyle = "black";
    ctx.fillText("Life", 30, 35);
    ctx.fillStyle = "green";
    ctx.fillRect(31, 41, player.life, 18);
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 40, 300, 20);
  },
};

const updateGameArea = () => {
  background.drawBackground();
  updateBoss();
  checkGameOver();
  gameEngine.win();
  updateEnemiesBack();
  player.drawPlayer();
  updateEnemiesFront();
  gameEngine.lifeBar();
  gameEngine.score();
  //DELETE LATER
  measures.drawMeasures();
};

function checkGameOver() {
  // COLISION WITH BACK ROW ENEMIES
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
      player.life -= 50;
    }
    if (
      player.crashWith(enemiesBack[i]) &&
      player.width === player.withPunching
    ) {
      enemiesBack[i].life -= 50;
      enemiesBack[i].x += 60
      if (enemiesBack[i].life <= 0) {
        enemiesBack.splice(enemiesBack[i], 1);
        points += 1;
      }
    }
    if (player.life <= 0) {
      gameEngine.stop();
    }
  }

  // COLISION WITH FRONT ROW ENEMIES
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
      player.life -= 50;
    }
    if (
      player.crashWith(enemiesFront[i]) &&
      player.width === player.withPunching
    ) {
      enemiesFront[i].life -= 50;
      enemiesFront[i].x += 60
      if (enemiesFront[i].life <= 0) {
        enemiesFront.splice(enemiesFront[i], 1);
        points += 1;
      }
    }
    if (player.life <= 0) {
      gameEngine.stop();
    }
  }

  // COLISION WITH BOSS
  for (let i = 0; i < bossArray.length; i++) {
    if (
      player.crashWith(bossArray[i]) &&
      player.width === player.widthStopped
    ) {
      player.life -= 50;
    } else if (player.life <= 0) {
      gameEngine.stop();
    } else if (
      player.crashWith(bossArray[i]) &&
      player.width === player.withPunching
    ) {
      bossArray[i].life -= 50;
    } else if (bossArray[i].life <= 0) {
      points += 100;
    }
  }
}

// START GAME
gameEngine.start();
