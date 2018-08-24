/**
  * Contains file system related classes
  * @namespace
 */
export declare namespace FileSystem {
    /**
     * @class
     * @classdesc Provides file read and write functionality
     * @memberof FileSystem
     * @property {string} inputSource - The source file/url parsed for color values
     * @property {string} outputName  - The provided name for the generated output files
     * @memberof FileSystem
    */
    class FileAccess {
        inputSource: string;
        outputPath: string;
        outputName: string;
        /**
         * @constructor
         * @param {string} source - The source file/url parsed for color values
         * @param {string} name   - The provided name for the generated output files
         */
        constructor(source: string, outputPath: any, name: string);
        /**
         * Reads a file and sends the text to be parsed for color values
         * @public
         * @function
         * @param {Function} callback - The function to call with the input source data when complete
        */
        readFile(callback: Function): void;
        /**
         * Writes color palette as a CSS file
         * @public
         * @function
         * @param {string} outputPath     - The type of stylesheet: CSS, SASS, LESS
         * @param {string} name           - The name given to the output files
         * @param {string[]} hexColors    - A string array containing the color palette as Hexadecimal values
         * @param {string} colorFormat    - CSS color format to use when writing file: Hex, HSL, or RGB
         * @param {string} styleType - The type of stylesheet: CSS, SASS, LESS
         */
        writeCss(outputPath: string, name: string, hexColors: string[], colorFormat: string, styleType: string): void;
        /**
         * Formats the color values based the file type provided
         * @private
         * @function
         * @param {string} styleType - The file type to create (css, less, etc)
         * @param {string} cssFormat      - The color format to use (Hex, RGB, HSL)
         * @param {number} count          - Value used to name each color entry
         * @returns {string} A string formatted for the specified stylesheet type
         */
        private formatStyleSheet;
    }
}
