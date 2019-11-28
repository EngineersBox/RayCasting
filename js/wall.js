
class Wall {

    /**
     * Create a new wall instance
     * 
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {p5.Color} color
     * @param {Number} density
     * @param {Number} ref_ind
     */
    constructor(x1, y1, x2, y2, color, density, ref_ind) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        this.color = color;
        this.density = density;
        this.ref_ind = ref_ind;
        this.angle = atan((x1 - x2) / (y1 - y2));
    }
    
    /**
     * Render the wall
     */
    show() {
        stroke(this.color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
