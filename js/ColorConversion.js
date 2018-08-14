"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorConversion {
    /**
     * Converts a binary color value to a hexadecimal color value
     * @function
     * @param {string} bin
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255),
     *                          and Blue (0-255) values
    */
    BinToRgb(bin) {
        const pbin = parseInt(bin, 2);
        const red = pbin >> 16;
        const green = pbin >> 8 & 0xFF;
        const blue = pbin & 0xFF;
        return [red, green, blue];
    }
    /**
     * Converts CMYK color values to RGB color values
     * @function
     * @param {number} cyan    - color value (0-100)
     * @param {number} magenta - color value (0-100)
     * @param {number} yellow  - color value (0-100)
     * @param {number} black   - color value (0-100)
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255),
     *                          and Blue (0-255) values
    */
    CmykToRgb(cyan, magenta, yellow, black) {
        cyan = cyan / 100;
        magenta = magenta / 100;
        yellow = yellow / 100;
        black = black / 100;
        let red = 1 - Math.min(1, cyan * (1 - black) + black);
        let green = 1 - Math.min(1, magenta * (1 - black) + black);
        let blue = 1 - Math.min(1, yellow * (1 - black) + black);
        return [
            Math.round(red * 255),
            Math.round(green * 255),
            Math.round(blue * 255)
        ];
    }
    /**
     * Converts a hexadecimal color value to RGB color values
     * @function
     * @param hex
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255),
     *                          and Blue (0-255) values
    */
    HexToRgb(hex) {
        hex = hex.replace(/[^0-9a-f]/gi, '');
        const hexValue = parseInt(hex, 16);
        const red = hexValue >> 16;
        const green = hexValue >> 8 & 0xFF;
        const blue = hexValue & 0xFF;
        return [red, green, blue];
    }
    /**
     * Converts HSL color values to RGB color values
     * @function
     * @param {number} hue        - color value (0-359)
     * @param {number} saturation - color value (0-100)
     * @param {number} lightness  - color value (0-100)
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255),
     *                          and Blue (0-255) values
    */
    HslToRgb(hue, saturation, lightness) {
        let red = 0;
        let green = 0;
        let blue = 0;
        let m = 0;
        let c = 0;
        let x = 0;
        hue = Number(String(hue).replace(/[^0-9\.]/gi, ''));
        saturation = Number(String(saturation).replace(/[^0-9\.]/gi, ''));
        lightness = Number(String(lightness).replace(/[^0-9\.]/gi, ''));
        if (!isFinite(hue))
            hue = 0;
        if (!isFinite(saturation))
            saturation = 0;
        if (!isFinite(lightness))
            lightness = 0;
        hue /= 60;
        if (hue < 0) {
            hue = 6 - (-hue % 6);
        }
        hue %= 6;
        saturation = Math.max(0, Math.min(1, saturation / 100));
        lightness = Math.max(0, Math.min(1, lightness / 100));
        c = (1 - Math.abs((2 * lightness) - 1)) * saturation;
        x = c * (1 - Math.abs((hue % 2) - 1));
        if (hue < 1) {
            red = c;
            green = x;
            blue = 0;
        }
        else if (hue < 2) {
            red = x;
            green = c;
            blue = 0;
        }
        else if (hue < 3) {
            red = 0;
            green = c;
            blue = x;
        }
        else if (hue < 4) {
            red = 0;
            green = x;
            blue = c;
        }
        else if (hue < 5) {
            red = x;
            green = 0;
            blue = c;
        }
        else {
            red = c;
            green = 0;
            blue = x;
        }
        m = lightness - c / 2;
        return [
            Math.round((red + m) * 255),
            Math.round((green + m) * 255),
            Math.round((blue + m) * 255)
        ];
    }
    /**
     * Converts HSV color values to RGB color values
     * @function
     * @param {number} hue        - color value (0-359)
     * @param {number} saturation - color value (0-100)
     * @param {number} value      - color value (0-100)
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255),
     *                          and Blue (0-255) values
    */
    HsvToRgb(hue, saturation, value) {
        hue = hue / 360;
        saturation = saturation / 100;
        value = value / 100;
        let red = 0;
        let green = 0;
        let blue = 0;
        if (saturation == 0) {
            red = value * 255;
            green = value * 255;
            blue = value * 255;
        }
        else {
            let var_h = hue * 6;
            let var_i = Math.floor(var_h);
            let var_1 = value * (1 - saturation);
            let var_2 = value * (1 - saturation * (var_h - var_i));
            let var_3 = value * (1 - saturation * (1 - (var_h - var_i)));
            let var_r = 0;
            let var_g = 0;
            let var_b = 0;
            if (var_i == 0) {
                var_r = value;
                var_g = var_3;
                var_b = var_1;
            }
            else if (var_i == 1) {
                var_r = var_2;
                var_g = value;
                var_b = var_1;
            }
            else if (var_i == 2) {
                var_r = var_1;
                var_g = value;
                var_b = var_3;
            }
            else if (var_i == 3) {
                var_r = var_1;
                var_g = var_2;
                var_b = value;
            }
            else if (var_i == 4) {
                var_r = var_3;
                var_g = var_1;
                var_b = value;
            }
            else {
                var_r = value;
                var_g = var_1;
                var_b = var_2;
            }
            ;
            red = Math.round(var_r * 255);
            green = Math.round(var_g * 255);
            blue = Math.round(var_b * 255);
        }
        return [red, green, blue];
    }
    /**
     * Converts RGB color values to a binary color value
     * @function
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {string} A binary color value
    */
    RgbToBin(red, green, blue) {
        const bin = red << 16 | green << 8 | blue;
        return (function (h) {
            return new Array(25 - h.length).join("0") + h;
        })(bin.toString(2));
    }
    /**
     * Converts RGB color values to CMYK color values
     * @function
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {Array<number>} An Array of Cyan (0-100), Magenta (0-100),
     *                          Yellow (0-100), and Black (0-100) values
    */
    RgbToCmyk(red, green, blue) {
        red = red / 255;
        green = green / 255;
        blue = blue / 255;
        let black = Math.min(1 - red, 1 - green, 1 - blue);
        let cyan = (1 - red - black) / (1 - black);
        let magenta = (1 - green - black) / (1 - black);
        let yellow = (1 - blue - black) / (1 - black);
        return [
            Math.round(cyan * 100),
            Math.round(magenta * 100),
            Math.round(yellow * 100),
            Math.round(black * 100)
        ];
    }
    /**
     * Converts RGB color values to  hexadecimal color value
     * @function
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {string} A hexadecimal color value
    */
    RgbToHex(red, green, blue) {
        const bin = red << 16 | green << 8 | blue;
        return (function (h) {
            return new Array(7 - h.length).join("0") + h;
        })(bin.toString(16).toUpperCase());
    }
    /**
     * Converts RGB color values to HSL color values
     * @function
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {Array<number>} An Array of Hue (0-359), Saturation (0-100),
     *                          and Lightness (0-100) values
    */
    RgbToHsl(red, green, blue) {
        red /= 255;
        green /= 255;
        blue /= 255;
        let hue = 0;
        let saturation = 0;
        let lightness = 0;
        let delta = 0;
        let max = Math.max(red, green, blue);
        let min = Math.min(red, green, blue);
        lightness = (max + min) / 2;
        if (max == min) {
            hue = saturation = 0;
        }
        else {
            delta = max - min;
            saturation = lightness > 0.5
                ? delta / (2 - max - min)
                : delta / (max + min);
            switch (max) {
                case red:
                    hue = (green - blue) / delta + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = (blue - red) / delta + 2;
                    break;
                case blue:
                    hue = (red - green) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        return [
            this.round(hue * 360, 0),
            this.round(saturation * 100, 0),
            this.round(lightness * 100, 0)
        ];
    }
    /**
     * Converts RGB color values to HSV color values
     * @function
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {Array<number>} An Array of Hue (0-359), Saturation (0-100),
     *                          and Value (light) (0-100) values
    */
    RgbToHsv(red, green, blue) {
        red = red / 255;
        green = green / 255;
        blue = blue / 255;
        const minVal = Math.min(red, green, blue);
        const maxVal = Math.max(red, green, blue);
        const delta = maxVal - minVal;
        let hue = 0;
        let saturation = 0;
        let value = maxVal;
        if (delta == 0) {
            hue = 0;
            saturation = 0;
        }
        else {
            saturation = delta / maxVal;
            const del_R = (((maxVal - red) / 6) + (delta / 2)) / delta;
            const del_G = (((maxVal - green) / 6) + (delta / 2)) / delta;
            const del_B = (((maxVal - blue) / 6) + (delta / 2)) / delta;
            if (red == maxVal) {
                hue = del_B - del_G;
            }
            else if (green == maxVal) {
                hue = (1 / 3) + del_R - del_B;
            }
            else if (blue == maxVal) {
                hue = (2 / 3) + del_G - del_R;
            }
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        hue = Math.round(hue * 360);
        saturation = Math.round(saturation * 100);
        value = Math.round(value * 100);
        return [hue, saturation, value];
    }
    round(value, decimals) {
        return Number(Math.round(eval(value + 'e' + decimals)) + 'e-' + decimals);
    }
}
exports.ColorConversion = ColorConversion;
//# sourceMappingURL=ColorConversion.js.map