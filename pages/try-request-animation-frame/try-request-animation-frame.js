Page({
  onReady() {
      this.offCanvas = my.createOffscreenCanvas()
      
      this.offCtx = this.offCanvas.getContext('2d')
      this.x = 0
      this.y = 0
  },

  render() {
      const { offCanvas, offCtx, x, y } = this

      // 在离屏画布中渲染内容
      offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height)
      offCtx.fillStyle = 'red'
      offCtx.fillRect(x, y, 50, 50)

      this.x = ((x + 0.5) % offCanvas.width)
      this.y = ((y + 0.5) % offCanvas.height)
  },

  draw(time) {
      console.log(time)
      const { ctx, offCanvas } = this
      this.render()
      // 绘制渲染内容
      ctx.clearRect(0, 0, ctx.canvas.height, ctx.canvas.height)
      ctx.drawImage(offCanvas, 0, 0)
      offCanvas.requestAnimationFrame(this.draw.bind(this))
  },

  onCanvasReady() {
      my.createSelectorQuery().select('#canvas').node().exec((res) => {
          this.canvas = res[0].node
          this.ctx = this.canvas.getContext('2d')
          this.draw()
      })
  },

})