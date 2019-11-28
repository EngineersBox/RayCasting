/**
 * @param {Object} instance 
 */
function rayInit(instance) {
    for (let a = -instance.fov / 2; a < instance.fov / 2; a += instance.rayAngle) {
        instance.rays.push(new Ray(instance.pos, radians(a)));
    }
}

class Particle {

    /**
     * Create a new particle instance and specify whether to pre-generate rays
     * 
     * @param {Boolean} initRays
     */
    constructor(initRays=true) {
        this.fov = 70;
        this.rayAngle = 1;
        this.pos = createVector(sceneW / 2, height / 2)
        this.rays = [];
        this.heading = 0;
        this.rayColor = color(255, 255, 255, 100);
        this.x_limit = {MIN: 0, MAX: sceneW};
        this.y_limit = {MIN: 0, MAX: sceneH};
        if (initRays){
            rayInit(this);
        }
    }

    /**
     * Set the field of view (FOV)
     * 
     * @param {Number} fov 
     */
    setFOV(fov) {
        this.rays = [];
        this.fov = fov;
        rayInit(this);
    }

    /**
     * Get the field of view (FOV)
     * 
     * @returns {Number}
     */
    getFOV() {
        return this.fov;
    }

    /**
     * Set the colour of the rays
     * 
     * @param {p5.Color} color 
     */
    setColor(color) {
        this.rayColor = color;
    }

    /**
     * Rotate the facing direction relative to a specified angle
     * and whether it is aboslute or relative rotation
     * 
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
     * Rotate the facing direction to face a point
     * 
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
     * Find walls to render and calculate reflections to a depth (number of reflections)
     * 
     * @param {Wall} walls 
     * @param {Number} depth
     */
    look(walls, depth=WALL_REFLECT_COUNT) {
        if (depth < 0) {
            return;
        }
        if (depth == WALL_REFLECT_COUNT) {
            toRender = [];
        }
        for (let ray of this.rays) {
            let record = Infinity;
            let ord_walls = [];
            let ord_points = [];
            let closest;
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

                        closest = [ray, wall, pt];
                    }
                }
            }

            if (closest && WALL_REFLECT_COUNT != 0) {
                let dx = closest[1].b.x - closest[1].a.x;
                let dy = closest[1].b.y - closest[1].a.y;

                // Left or right
                let wall_normal = this.pos.x <= closest[2].x ? createVector(dy, -dx) : createVector(-dy, dx);
                wall_normal.normalize();

                let ref_n = p5.Vector.dot(closest[0].dir, wall_normal);
                let reflected_dir = p5.Vector.sub(closest[0].dir, p5.Vector.dot(p5.Vector.mult(wall_normal, 2), ref_n));
                reflected_dir.normalize();

                let ref_particle = new Particle(false);
                ref_particle.pos = closest[2];
                ref_particle.fov = 1;

                let reflected_ray = new Ray(closest[2], 0);
                reflected_ray.dir = reflected_dir;

                ref_particle.rays.push(reflected_ray);
                ref_particle.rayColor = this.rayColor;
                ref_particle.look(walls, depth - 1);
                ref_particle.show();
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
     * Move the particle in a direction additively
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    move(x=0, y=0) {
        this.update(RangeUtils.clamp(this.x_limit.MIN, this.x_limit.MAX, this.pos.x + x),
                    RangeUtils.clamp(this.y_limit.MIN, this.y_limit.MAX, this.pos.y + y));
    }

    /**
     * Set the position of the particle
     * 
     * @param {Number} x
     * @param {Number} y
     */
    update(x, y) {
        this.pos.set(x, y);
    }

    /**
     * Render the rays
     */
    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}