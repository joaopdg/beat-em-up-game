class Background {
  constructor() {
    this.roadHeight = 300;
    this.img = new Image();
  }

  drawBackground() {
    ctx.fillStyle = "lightcyan";
    ctx.fillRect(0, 0, 900, 500);
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 360, 900, 390);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 390, 900, 400);
    ctx.fillStyle = "darkgrey";
    ctx.fillRect(0, 400, 900, 500);
  }
}

class Player {
  constructor() {
    this.x = 20;
    this.y = 370;
    this.widthStopped = 40;
    this.withPunching = 65;
    this.width = this.widthStopped;
    this.height = 80;
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
    return this.y;
  }
  bottom() {
    return this.y + this.height / 2;
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
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

const enemiesBack = [];
function updateEnemiesBack() {
  gameEngine.frames++;

  for (let i = 0; i < enemiesBack.length; i++) {
    enemiesBack[i].x -= 0.5;
    enemiesBack[i].drawEnemy();
  }

  if (gameEngine.frames % 250 === 0 && gameEngine.frames < 4900) {
    let minY = background.roadHeight;
    let maxY =
      background.roadHeight +
      (cHeight - background.roadHeight) / 2 -
      player.height / 2;
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

  if (gameEngine.frames % 500 === 1 && gameEngine.frames < 4900) {
    let minY =
      background.roadHeight +
      (cHeight - background.roadHeight) / 2 -
      player.height / 2;
    let maxY = cHeight - player.height;
    let y = Math.floor(Math.random() * (maxY - minY) + minY);

    enemiesFront.push(new Enemy(Math.floor(Math.random() * 100), y));
  }
}

class Boss {
  constructor() {
    this.x = 900;
    this.y = 300;
    this.width = 156;
    this.height = 156;
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
    if (bossArray[i].x > 700) {
      bossArray[i].x -= 1;
    }
  }

  if (
    gameEngine.frames ===
    5000 && gameEngine.frames < 5500 && enemiesFront.length === 0 && enemiesBack.length === 0 && bossArray.length === 0 
  ) {
    bossArray.push(new Boss());
  }
}
