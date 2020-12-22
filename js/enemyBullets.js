class enemyBullets {
  constructor(ctx, enemyPos, enemySize, bulletsImage) {
    this.ctx = ctx;
    this.bulletsSize = {
      w: 20,
      h: 40,
    };
    this.bulletsPos = {
      x: enemyPos.x + enemySize.w / 2 - this.bulletsSize.w / 2,
      y: enemyPos.y + enemySize.h,
    };
    this.bulletsInstance = new Image();
    this.bulletsInstance.src = `../images/${ bulletsImage }`;
    this.bulletsSpeed = {
      x: 5,
      y: 5,
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
    this.bulletsPos.y += this.bulletsSpeed.y;
  }
}
