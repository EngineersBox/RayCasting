class Utils {

    /**
     * Set the value of a DOM element given by id
     * 
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
     * Calculate the sum of the characters of a string 
     * if the sum is zero return a random value between 0 and sceneH * sceneH
     * 
     * @param {String} string_val
     * @returns {Number}
     */
    static stringSum(string_val) {
        const sumChar = (a, b) => parseInt(a) + b.charCodeAt(0);
        return string_val.length == 0 ? random(sceneH * sceneH) : string_val.reduce(sumChar, 0);
    }

    /**
     * Get the DOM element with a specified id
     * 
     * @param {String} id 
     * @returns {*}
     */
    static getElem(id) {
        return document.getElementById(id);
    }

}

class RangeUtils extends Number {

    /**
     * Keep a value inside a range
     * 
     * @param {Number} min 
     * @param {Number} max
     * @param {Number} value
     * @returns {Number}
     */
    static clamp(min, max, value) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Calculate an offset by a half rotation of theta
     * 
     * @param {Number} angle 
     * @param {Number} theta 
     * @returns {Number}
     */
    static zeroRange(angle, theta) {
        return degrees(angle) + (theta / 2);
    }

}

class ColourUtils {

    /**
     * Generate a random colour
     * 
     * @param {Number} upper
     * @returns {Number}
     */
    static randColour(upper) {
        Math.seedrandom();
        return Math.random() * upper;
    }

    /**
     * Convert a hex colour code to RGB values
     * 
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

}