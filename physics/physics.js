export function collision(start, end, direction, color ,callback){
  callback(start, end, direction, color)

  if (this.x + this.r > this.data.width || this.x - this.r < 0) {
    this.dx = -this.dx 
  }

  if (this.y + this.r  > this.data.height || this.y - this.r  < 0) {
    this.dy = -this.dy 
  } 

  this.y = this.y  + this.dy
  this.x = this.x  + this.dx
}