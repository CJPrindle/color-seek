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
 
    */
    class FileAccess {
        inputSource: string;
        outputPath: string;
        outputName: string;
        /**
         * @constructor
         * @param {string} source     - The source file/url parsed for color values
         * @param {string} outputPath - The provided directory to save the generated output files
         * @param {string} name       - The provided name for the generated output files
         */
        constructor(source: string, outputPath: any, name: string);
        /**
         * @public
         * @function
         * @summary Reads a file and extracts the contents
         * @description The file opened is specified on the command line. The entire text is returned for the subsequent
         *              parsing of CSS color values
         * @param {Function} callback - The function to call with the input source data when complete
        */
        readFile(callback: Function): void;
        /**
         * @public
         * @function
         * @summary Writes color palette
         * @description The type of file to create (CSS, GIMP, LESS, SASS) is based on the styleType parameter. Which
         *              color format to write (Hex, HSL, RGB) is specified via the colorFormat parameter.
         * @param {string} outputPath     - The type of stylesheet: CSS, SASS, LESS
         * @param {string} name           - The name given to the output files
         * @param {string[]} hexColors    - A string array containing the color palette as Hexadecimal values
         * @param {string} colorFormat    - CSS color format to use when writing file: Hex, HSL, or RGB
         * @param {string} styleType      - The type of stylesheet: CSS, SASS, LESS
         */
        writeCss(outputPath: string, name: string, hexColors: string[], colorFormat: string, styleType: string): void;
        /**
         * @private
         * @function
         * @summary Formats the color values based the file type provided
         * @param {string} styleType - The file type to create (css, less, etc)
         * @param {string} cssFormat - The color format to use (Hex, RGB, HSL)
         * @param {number} count     - Value used to name each color entry
         * @returns {string} A string formatted for the specified stylesheet type
         */
        private formatStyleSheet;
    }
}
