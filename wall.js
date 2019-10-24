
class Wall {
    /**
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     */
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
