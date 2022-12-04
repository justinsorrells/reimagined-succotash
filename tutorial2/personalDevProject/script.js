const canvas = document.querySelector("#mycanvas");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;

const slider = document.querySelector('#slider');
slider.value = gameSpeed;
const showGameSpeed = document.querySelector('#showGameSpeed');
showGameSpeed.textContent = gameSpeed;
slider.addEventListener('change', function(e) {
    showGameSpeed.textContent = e.target.value;
    gameSpeed = e.target.value;
});

const backgroundLayer1 = new Image();
backgroundLayer1.src = "backgroundLayers/myBackground.png";

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.height = 700;
        this.width = 2000;
        this.speed = 0;
        this.image = image;
        this.speedModifier = speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 1.0)

function animate() {
    layer1.update();
    layer1.draw();
    requestAnimationFrame(animate);
}

animate();