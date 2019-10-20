const MOVE_RATE = 3;
const MOVE_UP = 87;
const MOVE_LEFT = 65;
const MOVE_DOWN = 83;
const MOVE_RIGHT = 68;

const sceneH = 600;
const sceneW = 600;
let redraw_button;

let walls = [];
let particle;

function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < 5; i++) {
        let x1 = random(sceneW);
        let y1 = random(sceneH);
        let x2 = random(sceneW);
        let y2 = random(sceneH);
        walls[i] = new Wall(x1, y1, x2, y2);
    }

    walls.push(new Wall(0, 0, sceneW, 0));
    walls.push(new Wall(0, 0, 0, sceneH));
    walls.push(new Wall(0, sceneH, sceneW, sceneH));
    walls.push(new Wall(sceneW, 0, sceneW, sceneH));

    particle = new Particle();

    redraw_button = createButton("Randomise Walls");
    redraw_button.position(7, sceneH + 20);
    redraw_button.mousePressed(setup);
}

function keyPressed() {
    if (keyIsDown(MOVE_UP)) {
        particle.move(0, -MOVE_RATE);
    } else if (keyIsDown(MOVE_LEFT)) {
        particle.move(-MOVE_RATE);
    } else if (keyIsDown(MOVE_DOWN)) {
        particle.move(0, MOVE_RATE);
    } else if (keyIsDown(MOVE_RIGHT)) {
        particle.move(MOVE_RATE);
    }
}

function draw() {
    background(0);

    for (let wall of walls) {
        wall.show();
    }

    particle.rotatePos(mouseX, mouseY);
    particle.look(walls);
    particle.show();
    keyPressed()
}