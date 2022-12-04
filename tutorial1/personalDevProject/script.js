// QuerySelect canvas element in DOM 
const canvas = document.querySelector('#canvas1');
// Use the getContext method to gain access to the 2d library
const ctx = canvas.getContext("2d");
// Declare a canvas height and width
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
// Describe a ball class
class Ball {

    // Declare ball width && height
    ballWidth = 6;
    ballHeight = 6;
    // Declare a variable to store the ball's x and y coordinates
    FrameX = 300;
    FrameY = 0;
    // Declare bounce flags so we know when to change signs
    BounceX = 0;
    BounceY = 0;
    // Declare rate of change variables to alter the ball's slope
    dX = 0;
    dY = 2;
    // Declare a change slope method so that we can change the x or y slope at anytime
    changeSlope(axis, amount) {
        if (axis === "x") {
            this.dX = amount;
        }
        if (axis === "y") {
            this.dY = amount;
        }
    }
    // Declare a method to detect collision on the left and right bounds of the canvas
    detectCollisionX() {
        if (this.FrameX > CANVAS_WIDTH - this.ballWidth) {
            return true;
        } else if (this.FrameX < 0) {
            return true;
        }
    }
    // Declare a method to detect collision on the top and bottom bounds of the canvas
    detectCollisionY() {
        if (this.FrameY > CANVAS_HEIGHT - this.ballHeight) {
            return true;
        } else if (this.FrameY < 0) {
            return true;
        }
    }
    // Method to consolidate moveX and moveY as well as call the necessary draw functions to move the circle
    move() {
        this.moveX();
        this.moveY();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.FrameX, this.FrameY, 6, 0, Math.PI * 2, true);
        ctx.fill();
    }

    // Change the direction of x if there is a collision with a border
    // If there is a bounce then invert the sign of dX
    moveX() {
        if (this.detectCollisionX())
            this.BounceX = this.BounceX == 0 ? 1 : 0;
        if (this.BounceX == 1) {
            this.dX = this.dX * -1;
            this.BounceX = 0;
        }
        if (this.BounceX == 0) {
            this.FrameX = this.FrameX + this.dX;
        } 
    }

    // Change the direction of Y if there is a collision with a border
    // If there is a bounce then invert the sign of dY
    moveY() {
        if (this.detectCollisionY()) 
            this.BounceY = this.BounceY == 0 ? 1 : 0;
        if (this.BounceY == 0) {
            this.FrameY = this.FrameY + this.dY;
        } else if (this.BounceY == 1) {
            this.FrameY = this.FrameY - this.dY;
        }
    }
}

// Describe a Paddle class
class Paddle {
    // Declare the paddle width and height
    paddleWidth = 50;
    paddleHeight = 10;
    // Declare variables to store the paddle's left bound, midpoint, and right bound
    paddleLeft = 0;
    paddleRight = 0;
    paddleMid = 0
    // Store the top of the paddle's coordinate
    paddleY = CANVAS_HEIGHT - 50;
    // Declare variables to store the user's mouse movement
    mouseX = 0;
    mouseY = 0;

    // Detect collision with the ball
    // Check to see if the paddle's left bound is further left than the ball's left bound &&
    // Check to see if the paddle's right bound is further right than the ball's right bound &&
    // Check to see if the top of the paddle has the same y-coordinate as the bottom of the ball
    // If so get the new dX from the difference of midpoints divided by 10 then multiplied by a scalar
    detectCollisionWithBall(ball) {
        let ballMid = ball.FrameX + (ball.ballWidth / 2)
        let paddleMid = this.paddleLeft + (this.paddleWidth / 2);
        if (this.paddleLeft <= (ball.FrameX) &&
            this.paddleRight >= (ball.FrameX + ball.ballWidth) &&
            (this.paddleY == (ball.FrameY + ball.ballHeight) || (this.paddleY + this.paddleHeight) == ball.FrameY)
            ) {
                let dX = ((ballMid - paddleMid) / 10) * 1.36;
                ball.changeSlope("x", dX);
                ball.BounceY = ball.BounceY == 0 ? 1 : 0;
            } 

    }

    // Redraw the paddle as it moves
    draw(x) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, this.paddleY, this.paddleWidth, this.paddleHeight);
        ctx.fill();
    }

    // Get the coordinates of the top left corner of the paddle
    // The other coordinates can be found by factoring in the height and width of the paddle
    getCoords(element) {
        let rect = element.getBoundingClientRect();
        return [rect.x, rect.y];
    }

    // Declare an event listener to listen to the user's mouse
    listenToMouse() {
        window.addEventListener('load', () => {
            addEventListener('mousemove', (event) => {
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
            })
        });
    }

    // If the mouse's x coordinate minus the left bound of the canvas is positive &&
    // If the mouse's x coordinate minus the right bound is less then the canvas width
    // Then the mouse must be in the canvas and draw the paddle
    move() {
        let canvasPosition = this.getCoords(canvas);
        let left = canvasPosition[0];
        let right = left + CANVAS_WIDTH;
        if (this.mouseX - left > 0 - this.paddleWidth && this.mouseX - right < CANVAS_WIDTH) {
            this.draw(this.mouseX - (left + (this.paddleWidth / 2)));
            this.paddleMid = this.mouseX - (left + (this.paddleWidth / 2));
            this.paddleLeft = this.mouseX - left - (this.paddleWidth / 2);
            this.paddleRight = this.paddleLeft + this.paddleWidth;
        }
    }
}

// Declare new ball and paddle objects
let ball = new Ball();
let paddle = new Paddle();
// Immediately start listening to the user's mouse for movement
paddle.listenToMouse();
// Declare our main/animate function
function animate() {
    // Clear the rectangle every call
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Call the move method on the ball and paddle to grant movement to both
    ball.move();
    paddle.move();
    // Call the paddle method to detect collisions every move
    paddle.detectCollisionWithBall(ball);
    // Animate the animate function
    requestAnimationFrame(animate);
}
// Call the animate function to tie it all together
animate();
