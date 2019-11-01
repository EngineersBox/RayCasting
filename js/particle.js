/**
 * @param {Object} instance 
 */
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

    /**
     * @param {Number} fov 
     */
    setFOV(fov) {
        this.rays = [];
        this.fov = fov;
        rayInit(this);
    }

    /**
     * @returns {Number}
     */
    getFOV() {
        return this.fov;
    }

    /**
     * @param {p5.Color} color 
     */
    setColor(color) {
        this.rayColor = color;
    }

    /**
     * @param {Number} angle 
     * @param {Boolean} static_rotate 
     */
    rotate(angle, static_rotate=true) {
        this.heading = static_rotate ? this.heading + angle : angle;
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].setAngle(radians(i) + this.heading);
        }
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    rotatePos(x, y) {
        let delta_x = x - this.pos.x;
        let delta_y = y - this.pos.y;
        let angle = atan(delta_y / delta_x);
        this.rotate((delta_x < 0 ? angle + PI : angle) - radians(this.fov / 2), false);
    }

    /**
     * @param {Wall} walls 
     */
    look(walls) {
        toRender = [];
        for (let ray of this.rays) {
            let record = Infinity;
            let ord_walls = [];
            let ord_points = [];
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        if (ord_walls.length > 0 && ord_walls[ord_walls.length - 1].density >= 1) {
                            ord_walls = [];
                            ord_points = [];
                        }
                        ord_walls.push(wall);
                        ord_points.push(pt);

                    }
                }
            }
            if (ord_walls.length > 0) {
                for (let i = 0; i < ord_walls.length; i++) {
                    stroke(this.rayColor);
                    line(this.pos.x, this.pos.y, ord_points[i].x, ord_points[i].y);
                    ord_walls[i].color.levels[3] = ord_walls[i].density;
                    toRender.push([ray.dir, p5.Vector.dist(this.pos, ord_points[i]), ord_walls[i].color]);
                }
            }
        }
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    move(x=0, y=0) {
        this.update(RangeUtils.clamp(this.x_limit.MIN, this.x_limit.MAX, this.pos.x + x),
                    RangeUtils.clamp(this.y_limit.MIN, this.y_limit.MAX, this.pos.y + y));
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
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