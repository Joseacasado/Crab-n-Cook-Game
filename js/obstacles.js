class Obstacle {
  constructor (ctx, canvasSize, frames, obstaclePosX, obstaclePosY, obstacleSizeW, obstacleSizeH, imageSource) {
    this.ctx = ctx
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h
    }
    this.frames = frames
    this.obstaclePos = {
      x: obstaclePosX,
      y: obstaclePosY
    }
    this.obstacleSize = {
      w: obstacleSizeW,
      h: obstacleSizeH
    }
    this.obstacleInstance = new Image()
    this.obstacleInstance.src = `images/${ imageSource }`
    this.lives = 10
  }
  

  draw() {
    this.ctx.drawImage(
      this.obstacleInstance,
      this.obstaclePos.x,
      this.obstaclePos.y,
      this.obstacleSize.w,
      this.obstacleSize.h
    )
  }
}