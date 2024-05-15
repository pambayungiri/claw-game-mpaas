Page({
  data: {
    radius : 30,
    circles : [],
    clickPos : {},
    buttonLeftStatus : false,
    buttonLeftImage : 3,
    buttonRightStatus : false,
    buttonRightImage : 5,
    buttonGrabStatus : false,
    buttonGrabImage : 1, 
    clawPosX : 45,
    clawPosY : 45,
    moveDirection : "",
    clawRotate : 0,
    onGrabStatus : false,
    ballCatchIndex : null,
    ballCatchStatus: false,
    gachaStatus : true
  },
  onLoad() { 
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
   
      
      for (let i = 0; i < 15 ; i++) {  
        let radius = 30
        let dx = (Math.random() - 0.5 ) * 16
        let dy = (Math.random() - 0.5) * 16 
        let x;
        let y;
        let isOverlapping = false;
        do {
            x = radius*2 + Math.random() * (this.data.width - radius * 2);
            y = radius*2 + Math.random() * (this.data.height - radius * 2);
            isOverlapping = false;
            for (let otherCircle of this.data.circles) {
              if (this.distance(x, y, otherCircle.x, otherCircle.y) < radius + otherCircle.r) {
                isOverlapping = true;
                break;
              }
            }
          } while (isOverlapping);
  
        // let x = radius + dx + (Math.random() * (this.data.width  - radius  * 2))
        // let y = radius + dy + (Math.random() * (this.data.height - radius * 2))
        let r = Math.round(Math.random() * 255 | 0);
        let g = Math.round(Math.random() * 255 | 0);
        let b = Math.round(Math.random() * 255 | 0);
        let rgbVal = `rgb(${r}, ${g}, ${b})`
        let logo = this.randomIntFromRange(1, 7) + "-logo"
        
        this.data.circles.push(new this.Circle(x, y, dx, dy, radius, this.c, this.data, rgbVal, logo))
      }
      this.interval = setInterval(this.animate.bind(this), 17);
    })
  },
  onCanvasTap(e) {
    this.setData({clickPos : e.detail})
  },
  onCanvasReady() {

  },
  clawDraw(){
    let poleY = this.data.height / 25
    let poleWidth = this.data.width / 46.8
    let poleMachineWidth = this.data.width / 28.08
    this.setData({poleMachineWidth : poleMachineWidth})
    let clawRealHeight = this.data.height 
    let clawHeight = 0 + this.data.clawRealHeight
    let clawPosXPerc = this.data.clawPosX / 100 * (this.data.width - this.data.width / 4) 
    let clawPosY = this.data.clawPosY
  
    // this.c.drawImage(`../../images/claw-svg.svg`, 100, 100, 125, 125);

    this.c.beginPath();
    this.c.setFillStyle('#a2a2a3')
    this.c.rect(0, poleY, this.data.width, poleWidth); 
    this.c.fill();
    this.c.closePath()
    
    this.c.beginPath();
    this.c.setFillStyle('#ef304b') 
    this.c.moveTo(clawPosXPerc  , poleY + poleWidth / 2 - poleMachineWidth / 2 )
    this.c.lineTo(clawPosXPerc  + this.data.width / 4, poleY + poleWidth / 2 - poleMachineWidth / 2 )
    this.c.arc(clawPosXPerc  + this.data.width / 4, poleY + poleWidth / 2, poleMachineWidth / 2, 0 - Math.PI / 2, Math.PI / 2)
    this.c.lineTo(clawPosXPerc  , poleY + poleWidth / 2  + poleMachineWidth / 2 )
    this.c.arc(clawPosXPerc  ,  poleY + poleWidth / 2, poleMachineWidth / 2,  Math.PI / 2,0 - Math.PI / 2)
    this.c.fill()

    this.c.beginPath();
    this.c.setFillStyle('#a2a2a3')
    this.c.rect(clawPosXPerc + this.data.width / 8 - poleWidth / 2, poleY + poleWidth / 2 + poleMachineWidth / 2 , poleWidth, clawPosY ); 
    this.c.fill();
    this.c.closePath()

    let centerX = clawPosXPerc + this.data.width / 8;
    let centerY = poleY + poleWidth / 2 + poleMachineWidth / 2 + clawPosY;
    let xClaw = clawPosXPerc + this.data.width / 8
    let yClaw = poleY + poleWidth / 2 + poleMachineWidth / 2 + clawPosY - poleMachineWidth
    this.setData({
      clawPosXTrue: xClaw,
      clawPosYTrue: yClaw + poleMachineWidth
    })

    this.c.save();
    this.c.translate(centerX, centerY);
    this.c.rotate(-1 * this.data.clawRotate)
    this.c.translate(-centerX, -centerY);

    this.c.beginPath();
    this.c.setFillStyle('#feb700') 
    this.c.moveTo(xClaw  ,yClaw)
    this.c.lineTo(xClaw  + 55, yClaw + 20)
    this.c.lineTo(xClaw + 45, yClaw + 60)
    this.c.lineTo(xClaw + 15, yClaw + 75)
    this.c.lineTo(xClaw + 35, yClaw + 55)
    this.c.lineTo(xClaw + 35, yClaw + 35)
    this.c.lineTo(xClaw , yClaw + poleMachineWidth*2)
    this.c.fill();

    this.c.restore()

    this.c.save();
    this.c.translate(centerX, centerY);
    this.c.rotate(this.data.clawRotate)
    this.c.translate(-centerX, -centerY);

    this.c.beginPath();
    this.c.setFillStyle('#feb700') 
    this.c.moveTo(xClaw , yClaw + poleMachineWidth*2)
    this.c.lineTo(xClaw + -35, yClaw + 35)
    this.c.lineTo(xClaw + -35, yClaw + 55)
    this.c.lineTo(xClaw + -15, yClaw + 75)
    this.c.lineTo(xClaw + -45, yClaw + 60)
    this.c.lineTo(xClaw + -55, yClaw + 20)
    this.c.lineTo(xClaw  , yClaw )
    this.c.fill();

    this.c.restore()

    this.c.beginPath()
    this.c.setFillStyle("#4442c0")
    this.c.rect(xClaw - 9, yClaw + 6, 18, -12)
    this.c.fill()
    this.c.closePath()
    
    this.c.beginPath()
    this.c.setFillStyle("#4442c0")
    this.c.arc(xClaw , yClaw - 6 , 9 ,0  , Math.PI * 2 ); 
    this.c.fill()
    this.c.closePath()
    
    this.c.beginPath();
    this.c.setFillStyle('#ef304b')
    this.c.arc( xClaw, yClaw + poleMachineWidth , poleMachineWidth , 0  , Math.PI * 2 ); 
    this.c.fill();
    this.c.closePath()

    // this.c.lineTo(clawPosXPerc  , poleY + poleWidth / 2  + poleMachineWidth / 2 )
    // this.c.arc(clawPosXPerc  ,  poleY + poleWidth / 2, poleMachineWidth / 2,  Math.PI / 2,0 - Math.PI / 2)
    // this.c.fill()
  },
  box(){

  },
  animate() {
    this.c.clearRect(0, 0, this.data.width, this.data.height)

    if (this.data.moveDirection == "left" && !this.data.onGrabStatus && !this.data.ballCatchStatus) {
      if (this.data.clawPosX <= 0) {
        this.setData({clawPosX : 0})
      } else {
        this.setData({clawPosX : this.data.clawPosX - 1})
      }
    } else if (this.data.moveDirection == "right" && !this.data.onGrabStatus && !this.data.ballCatchStatus) {
      if (this.data.clawPosX >= 100) {
        this.setData({clawPosX : 100})
      } else {
        this.setData({clawPosX : this.data.clawPosX + 1})
      }
    }

    if (this.data.onGrabStatus && this.data.clawRotate <= Math.PI / 6) {
      this.setData({clawRotate : this.data.clawRotate + 0.02})
    } 

    if (this.data.clawRotate >= Math.PI / 6 && this.data.onGrabStatus && !this.data.ballCatchStatus) {
      this.setData({clawPosY : this.data.clawPosY + 3})
    }

    if (!this.data.onGrabStatus && this.data.clawRotate > Math.PI / 18) {
      this.setData({clawRotate : this.data.clawRotate - 0.02})
    } 

    if (this.data.clawRotate < Math.PI / 18 && !this.data.onGrabStatus && this.data.ballCatchStatus && this.data.clawPosY >= 45) {
      this.setData({clawPosY : this.data.clawPosY - 3})
    }

    if (this.data.ballCatchStatus && !this.data.onGrabStatus && this.data.clawPosY == 45 ) {
      if (this.data.gachaStatus) {
        this.setData({gachaStatus : Math.random() < 0.5})
        console.log(this.data.gachaStatus);
      }

      if (this.data.gachaStatus) {
        console.log("mantap tuan");
      } else {
        this.setData({
          clawPosX : 45,
          clawPosY : 45,
          moveDirection : "",
          clawRotate : 0,
          onGrabStatus : false,
          ballCatchIndex : null,
          ballCatchStatus: false,
          gachaStatus : true
        })
      }
      


    }
    
    for (let i = 0; i < this.data.circles.length; i++) {
      if (this.data.ballCatchStatus && this.data.ballCatchIndex == i && this.data.gachaStatus) {
        let catchPosX = this.data.clawPosXTrue
        let catchPosY = this.data.clawPosYTrue + this.data.poleMachineWidth + this.data.circles[i].r
        this.data.circles[i].catchPos(catchPosX, catchPosY)

        this.setData({onGrabStatus : false})

      } else {
        this.data.circles[i].update(i)
        let touchDistance = this.distance(this.data.circles[i].x, this.data.circles[i].y, this.data.clawPosXTrue, this.data.clawPosYTrue)
        // console.log(touchDistance, this.data.clawPosX, this.data.clawPosY);
        if (touchDistance < this.data.circles[i].r + this.data.poleMachineWidth && !this.data.ballCatchStatus && this.data.onGrabStatus) {
          // console.log('kena', this.data.circles[i]);
          this.setData({
            ballCatchIndex : i,
            ballCatchStatus : true
          })
        }
      }
    }
    this.clawDraw()
    this.c.draw()
  }, 
  Circle(x, y, dx, dy, r, c, data, rgb, logo) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.c = c;
    this.data = data;
    this.rgb = rgb;
    this.gravity = 0.5; // Adjust gravity slightly lower if needed
    this.airFriction = 0.7; // Increase air friction to dampen movement
    this.groundFriction = 0.8; // Increase ground friction to reduce bouncing
    
    this.logo = logo
  
    this.draw = function () {
      this.c.beginPath();
      this.c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      this.c.setFillStyle(`rgba(0, 0, 100, 7%)`);
      this.c.fill();
      this.c.closePath();

      var imgX = this.x - (this.r * 7 / 8 );
      var imgY = this.y - (this.r * 7 / 8 );
      var imgSize = 1.75 * this.r; // Diameter of the circle
      this.c.drawImage(`../../images/${this.logo}.png`, imgX, imgY, imgSize, imgSize);
      
      this.c.beginPath();
      this.c.arc(this.x - (this.r * 3.75 / 8), this.y - (this.r * 3.75 / 8) , this.r / 4, 0, Math.PI * 2, false);
      this.c.setFillStyle(`rgba(255, 255, 255, 25%)`);
      this.c.fill();
      this.c.closePath();

      this.c.beginPath();
      this.c.arc(this.x - (this.r * 5.75 / 8), this.y - (this.r * 4 / 8) + (this.r * 4 / 8), this.r / 8, 0, Math.PI * 2, false);
      this.c.setFillStyle(`rgba(255, 255, 255, 25%)`);
      this.c.fill();
      this.c.closePath();
    };
  
    this.update = function(index) {
      this.draw();
    
      // Apply gravity
      this.dy += this.gravity;

      // Boundary collision with damping
      if (this.x + this.r + this.dx > this.data.width || this.x - this.r - this.dx< 0) {
        this.dx = -this.dx * this.airFriction ; // Reverse and apply air friction
        this.x = Math.max(this.r, Math.min(this.x, this.data.width - this.r)); // Keep circle within horizontal bounds
      }
    
      if (this.y + this.r + this.dy  > this.data.height) {
        this.dy = -this.dy * this.groundFriction ; // Reverse and apply ground friction when hitting the bottom
        this.y = this.data.height - this.r;
      } else if (this.y - this.r - this.dy< 0) {
        this.dy = -this.dy * this.airFriction; // Reverse and apply air friction when hitting the top
        this.y = this.r;
      }
    
  

      // Handle collisions with other circles
      for (let j = 0; j < this.data.circles.length; j++) {
        if (j !== index) {
          const other = this.data.circles[j];
          const dx = other.x - this.x;
          const dy = other.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = this.r + other.r;
    
          if (distance < minDistance) {
            const overlap = 0.5 * (minDistance - distance);
            const nx = dx / distance;
            const ny = dy / distance;
    
            // Resolve overlaps
            this.x -= overlap * nx ; // Using a smaller fraction to adjust position gently
            other.x += overlap * nx ;
            this.y -= overlap * ny ;
            other.y += overlap * ny ;
    
            // Elastic collision response with damping
            const vx1 = this.dx - other.dx;
            const vy1 = this.dy - other.dy;
            const dotProduct = vx1 * nx + vy1 * ny;
    
            if (dotProduct > 0) {
              const combinedMass = this.r + other.r;
              const coefficientOfRestitution = 0.3;
              const impulse = (2 * dotProduct / combinedMass) * coefficientOfRestitution;
    
              this.dx -= impulse * other.r * nx;
              this.dy -= impulse * other.r * ny;
              other.dx += impulse * this.r * nx;
              other.dy += impulse * this.r * ny;
            }
          }
        }
      }


   
      this.x += this.dx;
      this.y += this.dy;
    }

    this.catchPos = function(x, y){
      this.draw()
      this.x = x
      this.y = y
    }
    this.distance = function(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
  },
  onGrab() {
    this.setData({ onGrabStatus :  true })

  },
  onTouchStart(e){
    let direction = e.currentTarget.dataset.direction 
    if (direction == "left") {
      this.setData({
        buttonLeftImage : 4,
        moveDirection : "left"
      })
    
    } else if (direction == "right") {
      this.setData({
        buttonRightImage : 6,
        moveDirection : "right"
      })
    }
  },
  onTouchEnd(e){
    let direction = e.currentTarget.dataset.direction 
    if (direction == "left") {
      this.setData({
        buttonLeftImage : 3,
        moveDirection : ""
      })
    } else if (direction == "right") {
      this.setData({
        buttonRightImage : 5,
        moveDirection : ""
      })
    }
  },
  onTouchGrapStart(){
    this.setData({buttonGrabImage : 2})
  },
  onTouchGrapEnd(){
    this.setData({buttonGrabImage : 1})
  },
  randomIntFromRange(min, max) {
    return Math.floor(Math.random() * ( max - min + 1)) + min
  },
  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },
  onUnload() {
    clearInterval(this.interval);
  }
  
});
