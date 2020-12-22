class Map {
  constructor (ctx, canvasSize, imageSource) {
    this.ctx = ctx
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h
    }
    this.mapPosition = {
      x: 0,
      y: 0
    }
    this.mapInstance = new Image()
    this.mapInstance.src = `images/${imageSource}`
  }

  draw() {
    this.ctx.drawImage(
      this.mapInstance,
      this.mapPosition.x,
      this.mapPosition.y,
      this.canvasSize.w,
      this.canvasSize.h
    )
  }
}