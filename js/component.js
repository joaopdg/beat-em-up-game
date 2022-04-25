//DELETE LATER
class Measures {
  drawMeasures() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 166, 900, 2);
    ctx.fillRect(0, 332, 900, 2);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 250, 900, 2);
    ctx.fillRect(450, 0, 2, 500);
    ctx.fillStyle = "green";
    ctx.fillRect(300, 0, 2, 500);
    ctx.fillRect(600, 0, 2, 500);
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 0, 2, 500);
    ctx.fillRect(890, 0, 2, 500);
    ctx.fillRect(0, 10, 900, 2);
    ctx.fillRect(0, 490, 900, 2);
  }
}

let scrollVal = 0;

class Background {
  constructor() {
    this.roadHeight = 168;
    this.img = new Image();
  }

  drawBackground() {
    this.img.src = "docs/assets/imgs/bakcground.jpg";
    if (scrollVal >= cWidth) {
      scrollVal = 0;
    }
    ctx.drawImage(this.img, -scrollVal, 0, 1797, 500);
    ctx.drawImage(this.img, cWidth - scrollVal, 0, 1797, 500);
    /*     ctx.drawImage(this.img, scrollVal, 0, 1797, cHeight); */

    /*     ctx.fillStyle = "lightcyan";
    ctx.fillRect(0, 0, 900, 500);
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 268, 900, 298);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 298, 900, 300);
    ctx.fillStyle = "darkgrey";
    ctx.fillRect(0, 310, 900, 500); */
  }
}

class Player {
  constructor() {
    this.x = 20;
    this.y = 250;
    this.widthStopped = 83;
    this.withPunching = 108;
    this.width = this.widthStopped;
    this.height = 166;
    this.img = playerImage;
    this.life = 300;
  }
  drawPlayer() {
    this.img.src = playerImage.src;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y + 73;
  }
  bottom() {
    return this.y + this.height - 83;
  }
  crashWith(enemies) {
    return !(
      this.bottom() < enemies.top() ||
      this.top() > enemies.bottom() ||
      this.right() < enemies.left() ||
      this.left() > enemies.right()
    );
  }
}

class Enemy {
  constructor(x, y) {
    this.x = 900 + x;
    this.y = y;
    this.width = player.widthStopped;
    this.height = player.height;
    this.img = enemyImage;
    this.life = 100;
  }
  drawEnemy() {
    enemyWalking();
    this.img.src = enemyImage.src;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y + 63;
  }
  bottom() {
    return this.y + this.height - 73;
  }
}

const enemiesBack = [];
function updateEnemiesBack() {
  gameEngine.frames++;

  for (let i = 0; i < enemiesBack.length; i++) {
    enemiesBack[i].x -= 0.5;
    enemiesBack[i].drawEnemy();
  }

  if (gameEngine.frames % 500 === 0 && gameEngine.frames < 4900) {
    let minY = background.roadHeight;
    let maxY =
      background.roadHeight +
      (cHeight - background.roadHeight) / 2 -
      player.height / 2 -
      10;
    let y = Math.floor(Math.random() * (maxY - minY) + minY);

    enemiesBack.push(new Enemy(0, y));
  }
}

const enemiesFront = [];
function updateEnemiesFront() {
  for (let i = 0; i < enemiesFront.length; i++) {
    enemiesFront[i].x -= 0.5;
    enemiesFront[i].drawEnemy();
  }

  if (gameEngine.frames % 750 === 1 && gameEngine.frames < 4900) {
    let minY =
      background.roadHeight +
      (cHeight - background.roadHeight) / 2 -
      player.height / 2 +
      10;
    let maxY = cHeight - player.height;
    let y = Math.floor(Math.random() * (maxY - minY) + minY);

    enemiesFront.push(new Enemy(Math.floor(Math.random() * 200), y));
  }
}

class Boss {
  constructor() {
    this.x = 900;
    this.y = 150;
    this.width = 256;
    this.height = 256;
    this.life = 500;
    this.img = new Image();
  }
  drawBoss() {
    this.img.src = "../docs/assets/imgs/boss_image.png";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

const bossArray = [];
function updateBoss() {
  for (let i = 0; i < bossArray.length; i++) {
    bossArray[i].drawBoss();
    if (bossArray[i].x > 600) {
      bossArray[i].x -= 1;
    }
  }

  if (
    gameEngine.frames > 5000 &&
    enemiesFront.length === 0 &&
    enemiesBack.length === 0 &&
    bossArray.length === 0
  ) {
    bossArray.push(new Boss());
  }
}
