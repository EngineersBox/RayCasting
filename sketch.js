let MOVE_RATE = 3;
const MOVE_UP = 87;
const MOVE_LEFT = 65;
const MOVE_DOWN = 83;
const MOVE_RIGHT = 68;

const sceneH = 600;
const sceneW = 600;

let redraw_button;
let wall_count_input;
let wall_seed;
let fov_slider;
let color_input;
let opacity_input;
let change_move_rate;

let walls = [];
let wall_count = 5;
let seed = Math.random();
let particle;

function initWalls() {
    walls = [];

    for (let i = 0; i < wall_count; i++) {
        Math.seedrandom(str((i) * seed));
        let x1 = Math.random() * sceneW;
        Math.seedrandom(str((i + x1) * seed * x1));
        let y1 = Math.random() * sceneH;
        Math.seedrandom(str((i + y1) * seed * y1));
        let x2 = Math.random() * sceneW;
        Math.seedrandom(str((i + x2) * seed * x2));
        let y2 = Math.random() * sceneH;
        walls.push(new Wall(x1, y1, x2, y2));
    }

    walls.push(new Wall(0, 0, sceneW, 0));
    walls.push(new Wall(0, 0, 0, sceneH));
    walls.push(new Wall(0, sceneH, sceneW, sceneH));
    walls.push(new Wall(sceneW, 0, sceneW, sceneH));
}

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("sketch_view");

    initWalls();
    particle = new Particle();
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

function stringSum(string) {
    const sumChar = (a, b) => parseInt(a) + b.charCodeAt(0);
    return string.length == 0 ? random(sceneH * sceneH) : string.reduce(sumChar, 0);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function draw() {

    redraw_button = document.getElementById("seed_button");
    wall_count_input = document.getElementById("wall_count");
    wall_seed = document.getElementById("wall_seed");
    fov_slider = document.getElementById("fov");
    color_input = document.getElementById("ray_color");
    opacity_input = document.getElementById("ray_opacity");
    change_move_rate = document.getElementById("particle_speed");

    background(0);

    for (wall of walls) {
        wall.show();
    }

    MOVE_RATE = int(change_move_rate.value);
    wall_count = wall_count_input.value;
    seed = stringSum(wall_seed.value.split(""));
    let c_color = hexToRgb(color_input.value);
    particle.setColor(color(c_color.r, c_color.g, c_color.b, int(opacity_input.value)));
    particle.setFOV(int(fov_slider.value));
    particle.rotatePos(mouseX, mouseY);
    particle.look(walls);
    particle.show();
    keyPressed()
}