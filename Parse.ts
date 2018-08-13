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
import * as fs from 'fs';
import * as opn from 'opn';
import { Helpers } from './Helpers';

/** 
  * @namespace 
  * @name - Parse
  */
export namespace Parse {
   /**
    * @class 
    * @name - Command
    * @classdesc - Represents all valid switches for ColorFinder
   */
   export class Command {
      Argument: string;
      Description: string;

      constructor(argument, description) {
         this.Argument = argument;
         this.Description = description;
      }
   }

   /**
    * @class 
    * @name - Palette
    * @classdesc - Contains methods for building the color palette
   */
   export class Palette {
      inputSource: string;
      outputName: string;

      constructor(source: string, name: string) {
         this.inputSource = (source) ? source : 'N/A';
         this.outputName = (name) ? name : `Color Seek - ${Helpers.getMilliseconds(6)}`;
      }

      /**
       * @function
       * @name - buildHtmloutput
       * @description - Creates the color palette Html file
       * @param {string} searchText - The string to search for colors
      */
      public buildHtmlOutput(searchText: string): void {
         try {
            let hexColors = this.findColors(searchText);
            let html = fs.readFileSync('template.html').toString();
            let thumbnails = '';
            const fileName = `${this.outputName.trim().replace(new RegExp(' ', 'g'), '')}.html`;

            for(let x = 0; x < hexColors.length; x++) {
               let thumbnail = `
               <div class="box"> 
                  <div class="header">
                      <div class="label">hex :&nbsp;&nbsp;<b class="color">${hexColors[x]}</b></div> 
                      <div class="label">rgba:&nbsp;&nbsp;<b class="color">255, 255, 255, 1</b></div>
                      <div class="label">hsla:&nbsp;&nbsp;<b class="color">120, 80%, 65%, 1</b></div>
                  </div>
                  <div class="thumbnail" style="background-color:${hexColors[x]}">&#160;</div>
               </div>\n`;

               thumbnails = thumbnails + thumbnail;
            }

            html = html
               .replace('{name}', this.outputName)
               .replace('{source}', this.inputSource)
               .replace('{colors}', thumbnails);

            fs.writeFileSync(fileName, html.toString());
            opn(fileName);
         } catch(e) {
            Helpers.raiseError(e);
         }
      }
         
      /**
       * @function
       * @name - findColors
       * @description Finds hex color values (#FFFFFF) in current search text
       * @param {string} searchText - The string to search
       * @returns {string[]} - An array containing the found hex colors
      */
      private findColors(searchText: string): string[] {
         let hexColors: string[] = [];

         //- Find all '#' positions (start of hex color value)
         const searchAreas = this.getIndicesOf('#', searchText, false);

         for(let x = 0; x < searchAreas.length; x++) {

            //- Get search range
            const str = searchAreas[x] + 1;
            const end = searchAreas[x] + 7;

            //- Check for valid hex value
            let hexColor = searchText.substring(str, end);

            if((hexColor[0] == hexColor[1]) && (hexColor[1] == hexColor[2])) {
               hexColor = hexColor.substring(0, 3);
            }
            
            const isHexColor = parseInt(hexColor, 16)
               .toString();

            //- Add  to color array
            if(isHexColor != 'NaN') {
               hexColors.push('#' + hexColor);
            }
         }

         return [...new Set(hexColors.map(item => item.toUpperCase().valueOf()).sort())];
      }

      /**
       * @function 
       * @name getIndicesOf
       * @description Finds the indexes of a search value in the given string
       * @param {string} searchStr - The value to search for within the given string
       * @param {string} str - The string to search
       * @param {boolean} caseSensitive - True/False for case sensitivity
       * @returns {number[]} containing found hex colors
      */
      private getIndicesOf(searchStr, str, caseSensitive = true): number[] {
         const searchStrLen = searchStr.length;

         if(searchStrLen === 0) {
            return [];
         }

         let startIndex = 0;
         let index = 0;
         let indices = [];

         if(!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
         }

         while((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
         }

         return indices;
      }

      /**
       * @function
       * @name getMilliseconds
       * @description Returns the milliseconds since Jan 1, 1970
       * @param {number} numOfDigits - Returns the number of places from the end of the value
       * @returns {number} Milliseconds since Jan 1, 1970
       */
      getMilliseconds(numOfDigits: number = 0): number {
         let mSecs: number = new Date().valueOf();
         const mLen = mSecs.toString().length;

         if(numOfDigits > 0) {
            var start = mLen - numOfDigits;
            mSecs = parseInt(mSecs.toString().substring(start));
         }

         return mSecs;
      }
   }
}
