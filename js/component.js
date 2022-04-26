let scrollVal = 0;
class Background {
  constructor() {
    this.roadHeight = 200;
    this.imgBg = new Image();
    this.imgFence = new Image();
  }

  drawBackground() {
    this.imgBg.src = "docs/assets/imgs/background.jpg";
    if (scrollVal >= cWidth) {
      scrollVal = 0;
    }
    ctx.drawImage(this.imgBg, -scrollVal, 0, 900, 500);
    ctx.drawImage(this.imgBg, cWidth - scrollVal, 0, 900, 500);
  }

  drawFence() {
    this.imgFence.src = "docs/assets/imgs/background_fence.png";
    ctx.drawImage(this.imgFence, -scrollVal, 0, 900, 500);
    ctx.drawImage(this.imgFence, cWidth - scrollVal, 0, 900, 500);
  }
}

class Player {
  constructor() {
    this.x = 20;
    this.y = 250;
    this.widthStopped = 92;
    this.withPunching = 136;
    this.widthKicking = 155;
    this.widthBlocking = 102;
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
    this.width = 104;
    this.height = 140;
    this.img = enemyImage;
    this.life = 150;
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
    return this.y + 52;
  }
  bottom() {
    return this.y + this.height - 52;
  }
}

const enemiesBack = [];
function updateEnemiesBack() {
  gameEngine.frames++;

  for (let i = 0; i < enemiesBack.length; i++) {
    enemiesBack[i].x -= 0.5;
    enemiesBack[i].drawEnemy();
  }

  if (gameEngine.frames % 750 === 0 && gameEngine.frames < 4900) {
    let minY = background.roadHeight + 20;
    let maxY =
      background.roadHeight +
      (cHeight - background.roadHeight) / 2 -
      player.height / 2 -
      15;
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

  if (gameEngine.frames % 1000 === 1 && gameEngine.frames < 4900) {
    let minY =
      background.roadHeight +
      (cHeight - background.roadHeight) / 2 -
      player.height / 2 +
      20;
    let maxY = cHeight - player.height - 15;
    let y = Math.floor(Math.random() * (maxY - minY) + minY);

    enemiesFront.push(new Enemy(Math.floor(Math.random()) * 100, y));
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

class Fire {
  constructor() {
    this.x = 700;
    this.y = 200;
    this.width = 100;
    this.height = 100;
    this.img = new Image();
  }
  drawFire() {
    if (this.x > randomX && this.y < randomY) {
      this.x -= Math.floor(Math.random() * (6 - 2) + 2);
      this.y += Math.floor(Math.random() * (2 - 1) + 1);
    }
    this.img.src = "../docs/assets/imgs/fire1.png";
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

let randomX;
let randomY;
const fireArray = [];
function updateFire() {
  for (let i = 0; i < fireArray.length; i++) {
    fireArray[i].drawFire();
    randomX = Math.floor(Math.random() * (900 - 100) + 100);
    randomY = Math.floor(Math.random() * (400 - 250) + 250);
    setTimeout(() => {
      fireArray.pop(fireArray[i]);
    }, 17000);
  }

  if (
    gameEngine.frames % 40 === 1 &&
    fireArray.length < 10 &&
    bossArray.length === 1
  ) {
    fireArray.push(new Fire());
  }
}
