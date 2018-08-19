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
        inputSource: string;
        outputName: string;
        totalColors: number;
        hueColors: PaletteColor[];
        grayColors: PaletteColor[];
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
         * @param {string} SearchText - The text to parse for colors values
         */
        buildHtmlOutput(SearchText: string): void;
        /**
         * Generates the color palettes as Html
         * @private
         * @function
         * @param {Array<PaletteColor>} paletteColors - An array of PaletteColor objects
         */
        private createThumbnails(paletteColors);
        /**
         * Finds hex color values (ex: #FFFFFF) in current Search text
         * @function
         * @param {string} SearchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
         */
        private parseHexColors(SearchText);
        /**
         * Finds the indexes of a Search value in the provided string
         * @function
         * @param {string} SearchStr - The value to Search for within the given string
         * @param {string} str - The string to Search
         * @param {boolean} caseSensitive - True/False for case sensitivity
         * @returns {number[]} An Array<number> containing the position indexes of the hex color values
         */
        private getIndicesOf(SearchStr, str, caseSensitive?);
    }
    /**
     * @public
     * @class
     * @classdesc Contains the color formats used by the color palette
     */
    class PaletteColor {
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
         * @param hexValue
         */
        createColorFormats(hexValue: string): void;
    }
}
