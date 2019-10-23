class Utils {

    static resetById(element_id, new_value) {
        if (typeof element_id !== "string") {
            new TypeError("element_id must be of type string")
        }
        document.getElementById(element_id).value = new_value;
    }

    static stringSum(string) {
        const sumChar = (a, b) => parseInt(a) + b.charCodeAt(0);
        return string.length == 0 ? random(sceneH * sceneH) : string.reduce(sumChar, 0);
    }

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
    
    static limitRange(lower, upper, value) {
        if (value < lower) {
            return lower;
        } else if (value > upper) {
            return upper;
        }
        return value;
    }

}