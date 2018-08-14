"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*! ***************************************************************************
Copyright (c) Christopher Prindle. All rights reserved
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
******************************************************************************/
const chalk_1 = require("chalk");
/**
 * @class
 * @classdesc Contains helper methods usable across the application
 */
class Helpers {
    /**
     * Generates a random integer
     * @function
     * @param min {number} - The minimum random value
     * @param max {number} - The maximum random value
     * @returns {number} - An integer within the specified range
    */
    static getRandomInteger(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**
     * Generates a random float
     * @function
     * @param min {number} - The minimum random value
     * @param max {number} - The maximum random value
     * @param places {number} - The maximum number of decimal places
     * @returns {number} - A float within the specified range
    */
    static getRandomDecimal(min = 1, max = 100, places = 2) {
        const val = Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
        return parseFloat(val.toFixed(places));
    }
    /**
     * The milliseconds since Jan, 1 1970
     * @function
     * @param {number} numOfDigits - Truncates the value from the end of the number
     * @returns The milliseconds since Jan, 1 1970 as truncated
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
     * Outputs the provided Error object to the console
     * @function
     * @param {Error} error - The error to show in the console
     */
    static outputError(error) {
        const err = chalk_1.default.redBright;
        console.error(err(error.message), err(error.stack));
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=Helpers.js.map