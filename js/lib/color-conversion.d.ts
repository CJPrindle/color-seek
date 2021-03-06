/*! ***************************************************************************
@license MIT License
Copyright (c) 2018 Christopher Prindle. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
******************************************************************************/
/**
 * @class
 * @classdesc Contains methods for converting color formats into other format types. The formats available are:
 * - Hexadecimal
 * - RGB
 * - HSL
 * - CMYK
 * @memberof ColorSeek
 */
export declare class ColorConversion {
    /**
     *  @constructor
     *  @description Default Constructor
     */
    constructor();
    /**
     * @public
     * @function
     * @summary Binary to Hex
     * @description Converts a binary color value to a hexadecimal color value
     * @param {string} bin - The binary value to convert
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255), and Blue (0-255) values
     */
    BinToRgb(bin: string): Array<number>;
    /**
     * @public
     * @function
     * @summary CMYK to RGB
     * @description Converts CMYK color values to RGB color values
     * @param {number} cyan    - color value (0-100)
     * @param {number} magenta - color value (0-100)
     * @param {number} yellow  - color value (0-100)
     * @param {number} black   - color value (0-100)
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255), and Blue (0-255) values
     */
    CmykToRgb(cyan: number, magenta: number, yellow: number, black: number): Array<number>;
    /**
     * @public
     * @function
     * @summary Hex to RGB
     * @description Converts a hexadecimal color value to RGB color values
     * @param {string} hex - A hexadecimal
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255), and Blue (0-255) values
     */
    HexToRgb(hex: string): Array<number>;
    /**
     * @public
     * @function
     * @summary HSL to RGB
     * @description Converts HSL color values to RGB color values
     * @param {number} hue        - color value (0-359)
     * @param {number} saturation - color value (0-100)%
     * @param {number} lightness  - color value (0-100)%
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255), and Blue (0-255) values
     */
    HslToRgb(hue: number, saturation: number, lightness: number): Array<number>;
    /**
     * @public
     * @function
     * @summary HSV to RGB
     * @description Converts HSV color values to RGB color values
     * @param {number} hue        - color value (0-359)
     * @param {number} saturation - color value (0-100)%
     * @param {number} value      - color value (0-100)%
     * @returns {Array<number>} An Array of Red (0-255), Green (0-255), and Blue (0-255) values
     */
    HsvToRgb(hue: number, saturation: number, value: number): Array<number>;
    /**
     * @public
     * @function
     * @summary RGB to Binary
     * @description Converts RGB color values to a binary color value
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {string} A binary color value
     */
    RgbToBin(red: number, green: number, blue: number): string;
    /**
     * @public
     * @function
     * @summary RGB to CMYK
     * @description Converts RGB color values to CMYK color values
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {Array<number>} An Array of Cyan (0-100), Magenta (0-100), Yellow (0-100), and Black (0-100) values
     */
    RgbToCmyk(red: number, green: number, blue: number): Array<number>;
    /**
     * @public
     * @function
     * @summary RGB to Hex
     * @description Converts RGB color values to  hexadecimal color value
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {string} A hexadecimal color value
     */
    RgbToHex(red: number, green: number, blue: number): string;
    /**
     * @public
     * @function
     * @summary RGB to HSL
     * @description Converts RGB color values to HSL color values
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {Array<number>} An Array of Hue (0-359), Saturation (0-100), and Lightness (0-100) values
     */
    RgbToHsl(red: number, green: number, blue: number): Array<number>;
    /**
     * @public
     * @function
     * @summary RGB to HSV
     * @description Converts RGB color values to HSV color values
     * @param {number} red   - color value (0-255)
     * @param {number} green - color value (0-255)
     * @param {number} blue  - color value (0-255)
     * @returns {Array<number>} An Array of Hue (0-359), Saturation (0-100), and Value (light) (0-100) values
     */
    RgbToHsv(red: number, green: number, blue: number): Array<number>;
    private round;
}
