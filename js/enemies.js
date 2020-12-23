class Enemy {
  constructor(
    ctx,
    canvasSize,
    frames,
    enemyPosX,
    enemyPosY,
    enemyWidth,
    enemyHeight,
    enemySpeed,
    enemyImage,
  ) {
    this.ctx = ctx;
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h,
    };
    this.frames = frames;
    this.enemyPos = {
      x: enemyPosX,
      y: enemyPosY,
    };
    this.enemySize = {
      w: enemyWidth,
      h: enemyHeight,
    };
    this.enemySpeed = enemySpeed;
    this.enemyInstance = new Image();
    this.enemyInstance.src = `images/${ enemyImage }`;
    this.bullets = [];
    this.shootKnife = false;
  }

  draw() {
    this.ctx.drawImage(
      this.enemyInstance,
      this.enemyPos.x,
      this.enemyPos.y,
      this.enemySize.w,
      this.enemySize.h
      );
      
      this.move();
      this.shootToPlayer();
      this.bullets.forEach((elm) => elm.draw());
  }

  move() {
    this.enemyPos.y += this.enemySpeed;
  }

  shootToPlayer() {
    if (this.shootKnife === false && this.enemyPos.y > this.enemySize.h * 2) {
      this.bullets.push(
        new enemyBullets(this.ctx, this.enemyPos, this.enemySize, "Knife.png")
      );
      this.shootKnife = true;
      let randomNum = Math.floor((Math.random() * (7 - 2)) + 2)
      let seconds = Number(randomNum + '000')
      setTimeout(() => {
        this.shootKnife = false;
      }, seconds)
    }
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      (knife) => knife.bulletsPos.y < this.canvasSize.h
    );
  }
}

