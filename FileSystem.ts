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
import { Palette } from './Palette'
import { Buffer } from 'buffer';
import { Helpers } from './Helpers';

const PaletteBuilder = Palette.PaletteBuilder;

/**
  * Contains file system related classes
  * @namespace
 */
export namespace FileSystem {

   /**
    * @class 
    * @classdesc Provides file read and write functionality
    * @property {string} inputSource - The source file/url parsed for color values
    * @property {string} outputName  - The provided name for the generated output files
   */
   export class FileAccess {
      inputSource: string;
      outputName: string;

      constructor(source: string, name: string) {
         if(source) {
            this.inputSource = source;
         }

         if(name) {
            this.outputName = name;
         }
      }

      /**
       * Reads a file and sends the text to be parsed for color values
       * @function
      */
      public readFile(): void {
         try {
            let fileData: string = '';
            let buffer: Buffer;

            const palette = new PaletteBuilder(this.inputSource, this.outputName);
            
            if(fs.existsSync(this.inputSource)) {
               var readStream = fs.createReadStream(this.inputSource)
                  .on('data', (chunk) => {
                     fileData += Buffer.from(chunk);
                  })
                  .on('end', () => {
                     palette.buildHtmlOutput(fileData.toString());
                  });
            } else {
               Helpers.outputError(new Error('File does not exist'));
            }
         } catch(e) {
            Helpers.outputError(e);
         }

      }
   }
}