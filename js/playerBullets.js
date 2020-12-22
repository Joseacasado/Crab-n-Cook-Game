class PlayerBullets {
  constructor(ctx, playerPos, playerSize, bulletsImage) {
    this.ctx = ctx;
    this.bulletsSize = {
      w: 20,
      h: 20,
    };
    this.bulletsPos = {
      x: playerPos.x + playerSize.w / 2 - this.bulletsSize.w / 2,
      y: playerPos.y,
    };
    this.bulletsInstance = new Image();
    this.bulletsInstance.src = `images/${bulletsImage}`;
    this.bulletsSpeed = {
      x: 10,
      y: 10,
    };
  }

  draw() {
    this.ctx.drawImage(
      this.bulletsInstance,
      this.bulletsPos.x,
      this.bulletsPos.y,
      this.bulletsSize.w,
      this.bulletsSize.h
    );

    this.move();
  }

  move() {
    this.bulletsPos.y -= this.bulletsSpeed.y;
  }
}
