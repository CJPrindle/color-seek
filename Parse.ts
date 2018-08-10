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

export namespace Parse {
   /**
   * @description Represents all valid switches for ColorFinder
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
   * @description Provides methods to find color values in provided text
   */
   export class Palette {

      constructor() { }

      /**
      * @description Creates a Html file containing the color palette
      */
      public buildHtmlOutput(searchText: string): void {
         let hexColors = this.findColors(searchText);
         let html = fs.readFileSync('template.html').toString();
         let thumbnails = '';

         for(let x = 0; x < hexColors.length; x++) {
            let thumbnail = '' +
               '<div class="box">' +
               '   <div class="header">' +
               '       <div>hex :&nbsp;&nbsp;<b>' + hexColors[x] + '</b></div>' +
               '       <div>rgba:&nbsp;&nbsp;<b>' + '255, 255, 255, 1.0' + '</b></div>' +
               '       <div>hsla:&nbsp;&nbsp;<b>' + '120, 80%, 65%, 1.0' + '</b></div>' +
               '   </div>' +
               '   <div class="thumbnail" style="background-color:' + hexColors[x] + '">&#160;</div>' +
               '</div>\n';
            thumbnails = thumbnails + thumbnail;
         }

         html = html.replace('{colors}', thumbnails);

         fs.writeFileSync('ColorBuilder.html', html.toString());
      }

      /**
      * @description Finds hex color values (#FFFFFF) in current search text
      * @param searchText
      * @returns string[] containing found hex colors
      */
      private findColors(searchText: string): string[] {
         let hexColors: string[] = [];

         //- Find all '#' positions (start of hex color value)
         const searchAreas = this.getIndicesOf('#', searchText, false);

         for(let x = 0; x < searchAreas.length; x++) {

            //- Get search range
            let str = searchAreas[x] + 1;
            let end = searchAreas[x] + 7;

            //- Check for valid hex value
            let hex_color = searchText.substring(str, end);
            const isHexColor = parseInt(hex_color, 16).toString();

            //- Add  to color array
            if(isHexColor != 'NaN') {
               hexColors.push('#' + hex_color);
            }
         }

         return [...new Set(hexColors.map(item => item.toLowerCase().valueOf()).sort())];
      }

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
   }
}
