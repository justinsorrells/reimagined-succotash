const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

let ballWidth = 6;
let ballHeight = 6;

class Ball {

    FrameX = 0;
    FrameY = 0;
    BounceX = 0;
    BounceY = 0;

    detectCollisionX() {
        if (this.FrameX > CANVAS_WIDTH - ballWidth) {
            return true;
        } else if (this.FrameX < 0) {
            return true;
        }
    }

    detectCollisionY() {
        if (this.FrameY > CANVAS_HEIGHT - ballHeight) {
            return true;
        } else if (this.FrameY < 0) {
            return true;
        }
    }

    move() {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.FrameX, this.FrameY, 6, 0, Math.PI * 2, true);
        ctx.fill();
    }

    moveX() {
        if (this.detectCollisionX())
            this.BounceX = this.BounceX == 0 ? 1 : 0;
        if (this.BounceX == 0) {
            this.FrameX++;
        } else if (this.BounceX == 1) {
            this.FrameX--;
        }
    }

    moveY() {
        if (this.detectCollisionY()) 
            this.BounceY = this.BounceY == 0 ? 1 : 0;
        if (this.BounceY == 0) {
            this.FrameY++;
        } else if (this.BounceX == 1) {
            this.FrameY--;
        }
    }
}

class Paddle {
    
    paddleWidth = 50;
    paddleHeight = 10;
    paddleMid = 0
    paddleY = CANVAS_HEIGHT - 50;
    mouseX = 0;
    mouseY = 0;

    draw(x) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, this.paddleY, this.paddleWidth, this.paddleHeight);
        ctx.fill();
    }

    getCoords(element) {
        let rect = element.getBoundingClientRect();
        return [rect.x, rect.y];
    }

    listenToMouse() {
        window.addEventListener('load', () => {
            addEventListener('mousemove', (event) => {
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
            })
        });
    }

    move() {
        let canvasPosition = this.getCoords(canvas);
        let left = canvasPosition[0];
        let right = left + CANVAS_WIDTH;
        console.log(this.mouseX, left, right);
        if (this.mouseX - left > 0 - this.paddleWidth && this.mouseX - right < CANVAS_WIDTH) {
            this.draw(this.mouseX - (left + (this.paddleWidth / 2)));
            this.paddleMid = this.mouseX - (left + (this.paddleWidth / 2));
        }
    }
}

let ball = new Ball();
let paddle = new Paddle();
paddle.listenToMouse();
console.log(paddle.paddleX);

function animate() {
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ball.moveX();
    ball.moveY();
    ball.move();
    paddle.move();

    requestAnimationFrame(animate);
}

animate();
