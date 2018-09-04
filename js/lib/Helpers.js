"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*! ***************************************************************************
@license MIT License
Copyright (c) 2018 Christopher Prindle. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
******************************************************************************/
const chalk_1 = require("chalk");
/**
 * @class
 * @classdesc Contains helper methods usable across the application
 * @memberof ColorSeek
 */
class Helpers {
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
    static between(min, max, val) {
        return val >= min && val <= max;
    }
    /**
     * @public
     * @function
     * @summary Random Integer
     * @description Generates a random integer based on the min/max values
     * @param {number} min - The minimum random value
     * @param {number} max - The maximum random value
     * @returns {number} An integer within the specified range
     */
    static getRandomInteger(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
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
    static getRandomDecimal(min = 1, max = 100, places = 2) {
        const val = Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
        return parseFloat(val.toFixed(places));
    }
    /**
     * @public
     * @function
     * @summary Milliseconds All Time
     * @description The milliseconds since Jan, 1 1970
     * @param {number} numOfDigits - Truncates the value from the end of the number
     * @returns {number} The milliseconds since Jan, 1 1970 as truncated
     */
    static getMilliseconds(numOfDigits = 0) {
        let mSecs = new Date().valueOf();
        const mLen = mSecs.toString().length;
        if (numOfDigits > 0) {
            var start = mLen - numOfDigits;
            mSecs = parseInt(mSecs.toString().substring(start));
        }
        return mSecs;
    }
    /**
     * @public
     * @function
     * @summary Error Output
     * @description Outputs the provided Error object to the console
     * @param {Error} error     - The error to show in the console
     * @param {boolean} logOnly - Determines if console will write to error or log
     */
    static outputError(error, logOnly = false) {
        const err = chalk_1.default.redBright;
        if (!logOnly) {
            console.error(error);
        }
        else {
            console.log(err(error.message), err(error.stack));
        }
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map