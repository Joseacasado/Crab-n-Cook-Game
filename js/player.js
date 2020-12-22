class Player {
  constructor(
    ctx,
    canvasSize,
    playerPosX,
    playerPosY,
    playerWidth,
    playerHeight,
    frames,
    keys,
    playerImage
  ) {
    this.ctx = ctx;
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h,
    };
    this.playerPos = {
      x: playerPosX,
      y: playerPosY,
    };
    this.playerSize = {
      w: playerWidth,
      h: playerHeight,
    };
    this.keys = keys;
    this.frames = frames;
    this.playerInstance = new Image()
    this.playerInstance.src = `images/${ playerImage }`
    this.bullets = [];
    this.delayShot = false;
    this.speed = {
      x: 20,
      y: 20,
    };
  }

  draw() {
    this.ctx.drawImage(
      this.playerInstance,
      this.playerPos.x,
      this.playerPos.y,
      this.playerSize.w,
      this.playerSize.h
    );

    this.bullets.forEach((elm) => elm.draw());
  }

  move(dir) {
    this.playerPos.x >= 0 && dir === "left"
      ? (this.playerPos.x -= this.speed.x)
      : null;
    this.playerPos.x <= this.canvasSize.w - this.playerSize.w && dir === "right"
      ? (this.playerPos.x += this.speed.x)
      : null;
    this.playerPos.y > 0 && dir === "up"
      ? (this.playerPos.y -= this.speed.y)
      : null;
    this.playerPos.y < this.canvasSize.h - this.playerSize.h && dir === "down"
      ? (this.playerPos.y += this.speed.y)
      : null;
  }

  shoot() {
    if (this.delayShot === false) {
      this.bullets.push(
        new PlayerBullets(
          this.ctx,
          this.playerPos,
          this.playerSize,
          "player_bullet_rock.png"
        )
      );
      this.delayShot = true;
      setTimeout(() => {
        this.delayShot = false;
      }, 200);
    }
  }

  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => bullet.bulletsPos.y > 0);
  }
}
