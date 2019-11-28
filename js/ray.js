class Ray {

    /**
     * Create a new ray instance
     * 
     * @param {p5.Vector} pos 
     * @param {Number} angle 
     */
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }
    
    /**
     * Set the angle of the ray
     * 
     * @param {Number} angle 
     */
    setAngle(angle) {
        this.dir = p5.Vector.fromAngle(angle);
    }

    /**
     * Change the direction of the ray to face a position
     * 
     * @param {Number} x
     * @param {Number} y
     */
    lookat(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    /**
     * Renders the ray
     */
    show() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 5, this.dir.y * 5);
        pop();
    }

    /**
     * Returns the point of intersection between ray and wall or undefined otherwise
     *
     * @param {Wall} wall 
     * @returns {p5.Vector | undefined}
     */
    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return;
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (0 < t && t < 1 && u > 0) {
            return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
        } else {
            return;
        }
    }
}