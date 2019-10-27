class Utils {

    /**
     * @param {String} element_id 
     * @param {*} new_value 
     */
    static resetById(element_id, new_value) {
        if (typeof element_id !== "string") {
            new TypeError("element_id must be of type string")
        }
        document.getElementById(element_id).value = new_value;
    }

    /**
     * @param {String} string_val
     * @returns {Number}
     */
    static stringSum(string_val) {
        const sumChar = (a, b) => parseInt(a) + b.charCodeAt(0);
        return string_val.length == 0 ? random(sceneH * sceneH) : string_val.reduce(sumChar, 0);
    }

    /**
     * @param {String} hex 
     * @returns {Object}
     */
    static hexToRgb(hex) {
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
    
    /**
     * @param {Number} lower 
     * @param {Number} upper
     * @param {Number} value
     * @returns {Number}
     */
    static limitRange(lower, upper, value) {
        if (value < lower) {
            return lower + 1;
        } else if (value > upper) {
            return upper - 1;
        }
        return value;
    }

    /**
     * @param {p5.Vector} angle 
     * @param {Number} theta 
     * @returns {Number}
     */
    static zeroRange(angle, theta) {
        return degrees(angle) + (theta / 2);
    }

}