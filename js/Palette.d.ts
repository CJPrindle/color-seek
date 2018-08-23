/**
 * Contains classes related to the parsing of provided data
 * @namespace
 */
export declare namespace Palette {
    /**
     * @constant
     * */
    const namedColors: {
        key: string;
        value: string;
    }[];
    /**
     * @public
     * @class
     * @classdesc Contains methods for building the color palette
     */
    class PaletteBuilder {
        inputSource: string; /** The input file path or Url */
        outputName: string; /** The output file name */
        totalColors: number; /** The total number of colors created */
        hueColors: PaletteColors[]; /** Contains all Hue based colors */
        grayColors: PaletteColors[]; /** Contains all gray based colors */
        /**
         * Sets the input file or url and the output file name (if provided)
         * @constructor
         * @param {string} source - The source file/url parsed for color values
         * @param {string} name   - The provided name for the generated output files
         */
        constructor(source: string, name: string);
        /**
         * Creates the color palette Html file. Sorts the color swatches by 'Luminosity'
         * @function
         * @param {string} searchText - The text to parse for colors values
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
         * @param {string} SearchStr - The value to Search for within the given string
         * @param {string} str - The string to Search
         * @param {boolean} caseSensitive - True/False for case sensitivity
         * @returns {number[]} An Array<number> containing the position indexes of the hex color values
         */
        private getIndicesOf;
    }
    /**
     * @public
     * @class
     * @classdesc Contains the color formats used by the color palette
     */
    class PaletteColors {
        CMYK: number[];
        Hex: string;
        HSL: number[];
        RGB: number[];
        Red: number;
        Green: number;
        Blue: number;
        Luminosity: number;
        Hue: number;
        Saturation: number;
        Light: number;
        Cyan: number;
        Magenta: number;
        Yellow: number;
        Black: number;
        /**
         * @constructor
         */
        constructor();
        /**
         * Creates the color formats (Hexadecimal, RGB, HSL, CMYK) used to create the color palette and assigns the
         * constituent properties of each format.
         * @param {string} - hexValue used to create the color formats
         */
        createColorFormats(hexValue: string): void;
    }
}
