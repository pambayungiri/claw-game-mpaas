Page({
  data: {
    radius : 30,
    circles : [],
    touchPositions : []
  },
  onLoad() { 
   
  },
  onReady() {
    this.c = my.createCanvasContext('canvas')
    
    const SelectorQuery = my.createSelectorQuery()
    SelectorQuery.select("#canvas")
    .boundingClientRect()
    .exec(ret => {
      
      this.setData({
        width : ret[0].width,
        height : ret[0].height,
        top : ret[0].top,
        left : ret[0].left
      })
      
      for (let i = 0; i < 10; i++) {  
        let radius = 5
        let x = radius + (Math.random() * (this.data.width - radius * 2))
        let y = radius + (Math.random() * (this.data.height - radius * 2))
        let dx = (Math.random() - 0.5) * 16
        let dy = (Math.random() - 0.5) * 16
        
        this.data.circles.push(new this.Circle(x, y, dx, dy, radius, this.c, this.data))
      }
      this.offScreenCanvas = my.createOffscreenCanvas(this.data.width, this.data.height)
    })
    this.offScreenCanvas.requestAnimationFrame()

    this.interval = setInterval(this.animate.bind(this), 17);
    

  },
  animate() {
    this.c.clearRect(0, 0, this.data.width, this.data.height)
    
    for (let i = 0; i < this.data.circles.length; i++) {
      this.data.circles[i].update()
    }
    this.c.draw()
  }, 
  Circle(x, y, dx, dy, r, c, data) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.r = r
    this.c = c
    this.data = data

    this.drawCircle = function () {
      this.c.beginPath()
      this.c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
      this.c.setFillStyle(`rgb(0, 0, 0)`);
      this.c.fill()
      this.c.closePath();
    }
  
    this.update = function() {
      this.drawCircle()

      if (this.x + this.r > this.data.width || this.x - this.r < 0) {
        this.dx = -this.dx
      } 
    
      if (this.y + this.r > this.data.height || this.y - this.r < 0) {
        this.dy = -this.dy
      } 
      
      this.y = this.y  + this.dy
      this.x = this.x  + this.dx

    }
  },
  onUnload() {
    clearInterval(this.interval);
  }
  
});
