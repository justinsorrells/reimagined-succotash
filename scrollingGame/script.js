const canvas = document.querySelector("#mycanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const status = document.querySelector("#status");

const backgroundLayer1 = new Image();
backgroundLayer1.src = "clouds.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "ground.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "sun.png";

const sprite = new Image();
sprite.src = "person.png";

const obj = new Image();
obj.src = "obstacle.png";

let gameSpeed = 5;

class Layer {
    constructor(image, speedModifier, y) {
        this.x = 0;
        this.y = y;
        this.height = 200;
        this.width = 2400;
        this.image = image;
        this.speedModifier = speedModifier;
    }

    update() {
        let speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        Math.floor(this.x -= speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

class character {
    constructor(image, x, y) {
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.characterHeight = 200;
        this.characterWidth = 100;
        this.image = image;
    }

    run() {
        if (fallFlag == 0 && jumpFlag == 0) {
            if (this.x >= 480) {
                this.x = 240;
            } else {
                this.x = 480;
            }
        }
    }

    jump() {
        if (fallFlag != 1) {
            this.x = 0;
            ctx.drawImage(this.image, 0, 0, 200, 300, 0, this.y, 100, 200);
            if (this.y >= this.baseY - 120) {
                this.y -= 4;
            } else {
                jumpFlag = 0;
                fallFlag = 1;
            }
        }
    }

    fall() {
        if (jumpFlag != 1) {
            if (this.y < this.baseY) {
                this.y += 3;
            } else {
                fallFlag = 0;
            }
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, 0, 200, 300, 0, this.y, this.characterWidth, this.characterHeight);
    }
}

class obstacle { 
    constructor(image, x, y) {
        this.height = 120;
        this.width = 120;
        this.image = image; 
        this.x = x; 
        this.baseX = x;
        this.y = y;
    }

    move() {
        if (this.x <= -200) {
            this.x = this.baseX;
        }
        this.x -= 5;
    }

    draw() {
        ctx.drawImage(obj, 0, 0, 400, 400, this.x, this.y, this.width, this.height);
    }
}

let layer1 = new Layer(backgroundLayer1, .5, 0);
let layer2 = new Layer(backgroundLayer2, 1, 500);
let layer3 = new Layer(backgroundLayer3, 1, 0);

let player = new character(sprite, 240, 460);

let enemy = new obstacle(obj, 640, 565);

let gameFrame = 0;
let jumpFlag = 0;
let fallFlag = 0;

window.addEventListener('keydown', function(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        if (fallFlag != 1) {
            jumpFlag = 1;
        }
    }
});

function detectCollision(player, obstacle) {
    let topOfObstacle = obstacle.y - obstacle.height;
    let playerX = 0;
    // console.log(playerX, obstacle.x);
    if (player.y >= topOfObstacle &&
        ((playerX <= obstacle.x && obstacle.x <= playerX + player.characterWidth) || 
        (obstacle.x <= playerX && playerX <= obstacle.x + obstacle.width))) {
            status.style.display = "block";
        }
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer3, 720, -220, 900, 350);
    layer1.draw();
    layer1.update();
    layer2.draw();
    layer2.update();
    player.draw();
    enemy.draw();
    enemy.move(); 
    if (jumpFlag == 1 && fallFlag != 1) {
        player.jump();
    }
    if (fallFlag == 1 && jumpFlag != 1) {
        player.fall();
    }
    if (gameFrame % 6 == 0) {
        player.run();
    }
    detectCollision(player, enemy);
    gameFrame++;
    requestAnimationFrame(animate);
}
//     ctx.drawImage(obj, 0, 0, 400, 400, 670, 505, 150, 200);
animate();