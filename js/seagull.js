class Seagull {
  constructor (
    ctx,
    canvasSize,
    frames,
    seagullPosX,
    seagullPosY,
    seagullWidth,
    seagullHeight,
    imageSource,
  )
  {
    this.ctx = ctx
    this.canvasSize = canvasSize
    this.frames = frames
    this.seagullPos = {
      x: seagullPosX,
      y: seagullPosY
    }
    this.seagullSize = {
      w: seagullWidth,
      h: seagullHeight
    }
    this.seagullSpeed = {
      x: Math.floor(Math.random() * (5 - -1)) - 1,
      y: 10
    }
    this.seagullInstance = new Image()
    this.seagullInstance.src = `images/${ imageSource }`
    this.seagullInstance.frames = 3
    this.seagullInstance.framesIndex = 0
    this.lives = 2
  }

  draw(frames) {
    this.ctx.drawImage(
      this.seagullInstance,
      this.seagullInstance.framesIndex * Math.floor(this.seagullInstance.width / this.seagullInstance.frames),
      0,
      Math.floor(this.seagullInstance.width / this.seagullInstance.frames),
      this.seagullInstance.height,
      this.seagullPos.x,
      this.seagullPos.y,
      this.seagullSize.w,
      this.seagullSize.h
    )

    this.animate(frames)
    this.move()
  }

  animate(frames) {
    if (frames % 5 === 0) {
      this.seagullInstance.framesIndex++;
    }
    if (this.seagullInstance.framesIndex > this.seagullInstance.frames - 1) {
      this.seagullInstance.framesIndex = 0;
    }
  }

  move() {
    this.seagullPos.y += this.seagullSpeed.y
    this.seagullPos.x += this.seagullSpeed.x
  }
}