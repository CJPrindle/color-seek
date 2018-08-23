/**
  * Contains file system related classes
  * @namespace
 */
export declare namespace FileSystem {
    /**
     * @class
     * @classdesc Provides file read and write functionality
     * @property {string} inputSource - The source file/url parsed for color values
     * @property {string} outputName  - The provided name for the generated output files
    */
    class FileAccess {
        inputSource: string;
        outputName: string;
        /**
         * @constructor
         * @param source
         * @param name
         */
        constructor(source: string, name: string);
        /**
         * Reads a file and sends the text to be parsed for color values
         * @public
         * @function
        */
        readFile(callback: Function): void;
        /**
         * Writes color palette as a CSS file
         * @public
         * @function
         * @param {string} outputPath - The type of stylesheet: CSS, SASS, LESS
         * @param {string[]} hexColors    - A string array containing the color palette as Hexadecimal values
         * @param {string} colorFormat    - CSS color format to use when writing file: Hex, HSL, or RGB
         * @param {string} styleSheetType - The type of stylesheet: CSS, SASS, LESS
         */
        writeCss(outputPath: string, name: string, hexColors: string[], colorFormat: string, styleSheetType: string): void;
        private formatStyleSheet;
    }
}
