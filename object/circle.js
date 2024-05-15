export class Circle {
  constructor(x, y, dx, dy, r, c, data){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.r = r
    this.c = c
    this.data = data
  }

  draw(start = 0, end = Math.PI * 2, direction = false, color = `rgb(0, 0, 0)` ) {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.r, start, end, direction)
    this.c.setFillStyle(color)
    this.c.fill()
  }

  containerCollision(start, end, direction, color) {
    this.draw(start, end, direction, color)

    if (this.x + this.r > this.data.width || this.x - this.r < 0) {
      this.dx = -this.dx 
    }
  
    if (this.y + this.r  > this.data.height || this.y - this.r  < 0) {
      this.dy = -this.dy
    } 

    this.y = this.y  + this.dy
    this.x = this.x  + this.dx
  }

}