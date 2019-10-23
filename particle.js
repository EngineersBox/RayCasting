function rayInit(instance) {
    for (let a = -instance.fov / 2; a < instance.fov / 2; a += instance.rayAngle) {
        instance.rays.push(new Ray(instance.pos, radians(a)));
    }
}

class Particle {
    constructor() {
        this.fov = 70;
        this.rayAngle = 1;
        this.pos = createVector(sceneW / 2, height / 2)
        this.rays = [];
        this.heading = 0;
        this.rayColor = color(255, 255, 255, 100);
        this.x_limit = {MIN: 0, MAX: sceneW};
        this.y_limit = {MIN: 0, MAX: sceneH};
        rayInit(this);
    }

    setFOV(fov) {
        this.rays = [];
        this.fov = fov;
        rayInit(this);
    }

    getFOV() {
        return this.fov;
    }

    setColor(color) {
        this.rayColor = color;
    }

    rotate(angle, static_rotate=true) {
        this.heading = static_rotate ? this.heading + angle : angle;
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].setAngle(radians(i) + this.heading);
        }
    }

    rotatePos(x, y) {
        let delta_x = x - this.pos.x;
        let delta_y = y - this.pos.y;
        let angle = atan(delta_y / delta_x);
        this.rotate((delta_x < 0 ? angle + PI : angle) - radians(this.fov / 2), false);
    }

    look(walls) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(this.rayColor);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }

    move(x=0, y=0) {
        this.update(Utils.limitRange(this.x_limit.MIN, this.x_limit.MAX, this.pos.x + x),
                    Utils.limitRange(this.y_limit.MIN, this.y_limit.MAX, this.pos.y + y));
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}