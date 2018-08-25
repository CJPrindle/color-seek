/**
 * @class
 * @classdesc Contains helper methods usable across the application
 * @memberof Global
 */
export declare class Helpers {
    /**
     * @public
     * @function
     * @summary Value Between
     * @description Determines if value is in a given range
     * @param {number} min - The minimum for the range
     * @param {number} max - The maximum for the range
     * @param {number} val - The value to test for between
     * @returns {boolean} True if the value is within the given range,
     *                    otherwise False
     */
    static between(min: number, max: number, val: number): boolean;
    /**
     * @public
     * @function
     * @summary Random Integer
     * @description Generates a random integer based on the min/max values
     * @param {number} min - The minimum random value
     * @param {number} max - The maximum random value
     * @returns {number} An integer within the specified range
     */
    static getRandomInteger(min?: number, max?: number): number;
    /**
     * @public
     * @function
     * @summary Random Float
     * @description Generates a random float based on the min/max values
     * @param {number} min    - The minimum random value
     * @param {number} max    - The maximum random value
     * @param {number} places - The maximum number of decimal places
     * @returns {number} A float within the specified range
     */
    static getRandomDecimal(min?: number, max?: number, places?: number): number;
    /**
     * @public
     * @function
     * @summary Milliseconds All Time
     * @description The milliseconds since Jan, 1 1970
     * @param {number} numOfDigits - Truncates the value from the end of the number
     * @returns {number} The milliseconds since Jan, 1 1970 as truncated
     */
    static getMilliseconds(numOfDigits?: number): number;
    /**
     * @public
     * @function
     * @summary Error Output
     * @description Outputs the provided Error object to the console
     * @param {Error} error     - The error to show in the console
     * @param {boolean} logOnly - Determines if console will write to error or log
     */
    static outputError(error: Error, logOnly?: boolean): void;
}
