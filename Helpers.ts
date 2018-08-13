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
import chalk, * as Chalk from 'chalk';

export class Helpers {

   static getRandomInteger(min: number = 1, max: number = 100 ): number {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }

   static getRandomDecimal(min: number = 1, max: number = 100, places = 2): number {
      const val: number = Math.floor(Math.random() * (max - min + 1) + min) + Math.random();
      return parseFloat(val.toFixed(places));
   }

   static getMilliseconds(numOfDigits: number = 0): number {
      let mSecs: number = new Date().valueOf();
      const mLen = mSecs.toString().length;

      if(numOfDigits > 0) {
         var start = mLen - numOfDigits;
         mSecs = parseInt(mSecs.toString().substring(start));
      }

      return mSecs;
   }

   static raiseError(error: Error): void {
      const red = Chalk.default.bold.redBright;

      console.error(red(error.message), red(error.stack));
   }
}