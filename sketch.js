const MOVE_RATE = 3;
const MOVE_UP = 87;
const MOVE_LEFT = 65;
const MOVE_DOWN = 83;
const MOVE_RIGHT = 68;

const sceneH = 600;
const sceneW = 600;

let redraw_button;
let wall_count_input;
let fov_slider;
let color_input;
let opacity_input;

let walls = [];
let wall_count = 5;
let particle;

function initWalls() {
    walls = [];

    for (let i = 0; i < wall_count; i++) {
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
}

function setup() {
    createCanvas(600, 600);

    initWalls();
    particle = new Particle();

    redraw_button = createButton("Randomise Walls");
    redraw_button.position(7, sceneH + 20);
    redraw_button.mousePressed(initWalls);

    fov_slider = createSlider(0, 360, 70, 1);
    fov_slider.position(120, sceneH + 20);
    fov_slider.style("width", "80px");

    color_input = createColorPicker("#ffffff");
    color_input.position(210, sceneH + 18);

    opacity_input = createSlider(0, 255, 155, 1);
    opacity_input.position(210, sceneH + 48);
    opacity_input.style("width", "80px");

    wall_count_input = createInput("5");
    wall_count_input.style("width: 30px; border-radius: 2px; border: none; text-align: center;");
    wall_count_input.position(7, sceneH + 45);
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

    wall_count = wall_count_input.value();
    particle.setColor(color(color_input.value()).levels[3] = opacity_input.value());
    particle.setFOV(fov_slider.value());
    particle.rotatePos(mouseX, mouseY);
    particle.look(walls);
    particle.show();
    keyPressed()
}