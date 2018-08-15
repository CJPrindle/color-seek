/*! ***************************************************************************
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
import chalk from "chalk";

/**
 * @class
 * @classdesc Contains helper methods usable across the application
 */
export class Helpers {
  /**
   * Generates a random integer
   * @function
   * @param min {number} - The minimum random value
   * @param max {number} - The maximum random value
   * @returns {number} An integer within the specified range
   */
  static getRandomInteger(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Generates a random float
   * @function
   * @param min {number} - The minimum random value
   * @param max {number} - The maximum random value
   * @param places {number} - The maximum number of decimal places
   * @returns {number} A float within the specified range
   */
  static getRandomDecimal(
    min: number = 1,
    max: number = 100,
    places = 2
  ): number {
    const val: number =
      Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
    return parseFloat(val.toFixed(places));
  }

  /**
   * The milliseconds since Jan, 1 1970
   * @function
   * @param {number} numOfDigits - Truncates the value from the end of the number
   * @returns {number} The milliseconds since Jan, 1 1970 as truncated
   */
  static getMilliseconds(numOfDigits: number = 0): number {
    let mSecs: number = new Date().valueOf();
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
  static outputError(error: Error, logOnly: boolean = false): void {
   const err = chalk.redBright;

     if(!logOnly) {
        console.error(error);
     } else {
        console.log(err(error.message), err(error.stack));
     }
  }
}
