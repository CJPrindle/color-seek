/**
 * @class
 * @classdesc Contains helper methods usable across the application
 */
export declare class Helpers {
    /**
     * Generates a random integer
     * @public
     * @function
     * @param min {number} - The minimum random value
     * @param max {number} - The maximum random value
     * @returns {number} An integer within the specified range
     */
    static getRandomInteger(min?: number, max?: number): number;
    /**
     * Generates a random float
     * @public
     * @function
     * @param min {number} - The minimum random value
     * @param max {number} - The maximum random value
     * @param places {number} - The maximum number of decimal places
     * @returns {number} A float within the specified range
     */
    static getRandomDecimal(min?: number, max?: number, places?: number): number;
    /**
     * The milliseconds since Jan, 1 1970
     * @public
     * @function
     * @param {number} numOfDigits - Truncates the value from the end of the number
     * @returns {number} The milliseconds since Jan, 1 1970 as truncated
     */
    static getMilliseconds(numOfDigits?: number): number;
    /**
     * Outputs the provided Error object to the console
     * @public
     * @function
     * @param {Error} error     - The error to show in the console
     * @param {boolean} logOnly - Determines if console will write to error or log
     */
    static outputError(error: Error, logOnly?: boolean): void;
}
