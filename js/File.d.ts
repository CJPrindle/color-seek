/**
  * @namespace
  * @name - File
  * @description - Contains file system related classes
 */
export declare namespace File {
    /**
     * @class
     * @name - Filesystem
     * @classdesc Provides file read and write functionality
    */
    class FileSystem {
        inputSource: string;
        outputName: string;
        constructor(source: string, name: string);
        /**
         * @function
         * @name - readFile
         * @description - Reads a file to parse for color values
         * @param filePath
         */
        readFile(): void;
    }
}
