/**
  * @namespace
  * @name - Parse
  */
export declare namespace Parse {
    /**
     * @class
     * @name - Command
     * @classdesc - Represents all valid switches for ColorFinder
    */
    class Command {
        Argument: string;
        Description: string;
        constructor(argument: any, description: any);
    }
    /**
     * @class
     * @name - Palette
     * @classdesc - Contains methods for building the color palette
    */
    class Palette {
        inputSource: string;
        outputName: string;
        constructor(source: string, name: string);
        /**
         * @function
         * @name - buildHtmloutput
         * @description - Creates the color palette Html file
         * @param {string} searchText - The string to search for colors
        */
        buildHtmlOutput(searchText: string): void;
        /**
         * @function
         * @name - findColors
         * @description Finds hex color values (#FFFFFF) in current search text
         * @param {string} searchText - The string to search
         * @returns {string[]} - An array containing the found hex colors
        */
        private findColors;
        /**
         * @function
         * @name getIndicesOf
         * @description Finds the indexes of a search value in the given string
         * @param {string} searchStr - The value to search for within the given string
         * @param {string} str - The string to search
         * @param {boolean} caseSensitive - True/False for case sensitivity
         * @returns {number[]} containing found hex colors
        */
        private getIndicesOf;
        /**
         * @function
         * @name getMilliseconds
         * @description Returns the milliseconds since Jan 1, 1970
         * @param {number} numOfDigits - Returns the number of places from the end of the value
         * @returns {number} Milliseconds since Jan 1, 1970
         */
        getMilliseconds(numOfDigits?: number): number;
    }
}
