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
const Chalk = require("chalk");
class Helpers {
    static getRandomInteger(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static getRandomDecimal(min = 1, max = 100, places = 2) {
        const val = Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
        return parseFloat(val.toFixed(places));
    }
    static getMilliseconds(numOfDigits = 0) {
        let mSecs = new Date().valueOf();
        const mLen = mSecs.toString().length;
        if (numOfDigits > 0) {
            var start = mLen - numOfDigits;
            mSecs = parseInt(mSecs.toString().substring(start));
        }
        return mSecs;
    }
    static raiseError(error) {
        const red = Chalk.default.bold.redBright;
        console.error(red(error.message), red(error.stack));
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=Helpers.js.map