/**
 * Contains classes related to the parsing of provided data
 * @namespace
 */
export declare namespace Palette {
    /**
     * @public
     * @class
     * @classdesc Contains methods for building the color palette
     * @memberof Palette
     */
    class PaletteBuilder {
        htmlTemplate: string;
        inputSource: string; /** The input file path or Url */
        outputPath: string; /** The output directory for the files */
        outputName: string; /** The output file name */
        totalColors: number; /** The total number of colors created */
        hueColors: PaletteColors[]; /** Contains all Hue based colors */
        grayColors: PaletteColors[]; /** Contains all gray based colors */
        /**
         * Sets the input file or url and the output file name (if provided)
         * @constructor
         * @param {string} source     - The source file/url parsed for color values
         * @param {string} outputPath - The path to save the output files
         * @param {string} name       - The provided name for the generated output files
         */
        constructor(source: string, outputPath: string, name: string);
        /**
         * Creates the color palette Html file. Sorts the color swatches by 'Luminosity'
         * @function
         * @param {string} searchText - The text to parse for colors values
         * @returns {string[]} An array of hexadecimal color values
         */
        buildHtmlOutput(searchText: string): string[];
        /**
         * Generates the color palettes as Html
         * @private
         * @function
         * @param {Array<PaletteColors>} paletteColors - An array of PaletteColors objects
         * @returns {string} Html string containing the color swatches
         */
        private createSwatches;
        /**
         * Finds RGB color values (ex: rgb(255,255,255) in current search text
         * @function
         * @param {string} searchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
         */
        private parseHSLColors;
        /**
         * Finds RGB color values (ex: rgb(255,255,255) in current search text
         * @function
         * @param {string} searchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
         */
        private parseRGBColors;
        /**
         * Finds hex color values (ex: #FFFFFF) in current search text
         * @function
         * @param {string} searchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
         */
        private parseHexColors;
        /**
         * Finds the indexes of a Search value in the provided string
         * @function
         * @param {string} SearchStr      - The value to Search for within the given string
         * @param {string} str            - The string to Search
         * @param {boolean} caseSensitive - True/False for case sensitivity
         * @returns {number[]} An Array<number> containing the position indexes of the hex color values
         */
        private getIndicesOf;
    }
    /**
     * @public
     * @class
     * @classdesc Contains the color formats used by the color palette
     * @memberof Palette
     */
    class PaletteColors {
        /**
         * @summary Color Format
         * @description Represents four color values between 0-100%: Cyan, Magenta, Yellow, and Key(Black)
         * @type {Array<string>}
         */
        CMYK: number[];
        /**
         * @summary Color Format
         * @description A string combining three (3) hexadecimal values (Ex: #1188FF) representing red (11),
         * @type {string}
         */
        Hex: string;
        /**
         * @summary Color Format
         * @description Represents three values; Hue (0-359), Saturation (0-100%), and Lightness (100%)
         * @type {Array<number>}
         */
        HSL: number[];
        /**
         * @summary Color Format
         * @description Represents three colors values between 0-255: Red. Green, and Blue
         * @type {Array<number>}
         */
        RGB: number[];
        /**
         * @summary Color Value
         * @description Red portion of the RGB color format
         * @type {number}
         */
        Red: number;
        /**
         * @summary Color Value
         * @description Green portion of the RGB color format
         * @type {number}
         */
        Green: number;
        /**
         * @summary Color Value
         * @description Blue portion of the RGB color format
         * @type {number}
         */
        Blue: number;
        /**
         * @summary Color Formula
         * @description Derived value of the RGB color format used to order colors by luminance. The value is a product of the
         * formula: Math.sqrt(.241 * Red + .691 * Green + .068 * Blue)
         * @type {number}
         */
        Luminosity: number;
        /**
         * @summary Color Value
         * @description Hue portion of the HSL color format
         * @type {number}
         */
        Hue: number;
        /**
         * @summary Color Value
         * @description Saturation portion of the HSL color format
         * @type {number}
         */
        Saturation: number;
        /**
         * @summary Color Value
         * @description Light portion of the HSL color format
         * @type {number}
         */
        Light: number;
        /**
         * @summary Color Value
         * @description Cyan portion of the CMYK color format
         * @type {number}
         */
        Cyan: number;
        /**
         * @summary Color Value
         * @description Magenta portion of the CMYK color format
         * @type {number}
         */
        Magenta: number;
        /**
         * @summary Color Value
         * @description Yellow portion of the CMYK color format
         * @type {number}
         */
        Yellow: number;
        /**
         * @summary Color Value
         * @description Black portion of the CMYK color format
         * @type {number}
         */
        Black: number;
        /**
         * @constructor
         */
        constructor();
        /**
         * Creates the color formats (Hexadecimal, RGB, HSL, CMYK) used to create the color palette and assigns the
         * constituent properties of each format.
         * @param {string} hexValue - Value used to create the color formats
         */
        createColorFormats(hexValue: string): void;
    }
}
