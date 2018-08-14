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
        constructor(source: string, name: string);
        /**
         * Reads a file and sends the text to be parsed for color values
         * @function
        */
        readFile(): void;
    }
}
