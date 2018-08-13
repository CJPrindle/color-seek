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
import { Parse } from './Parse'
import { Buffer } from 'buffer';
import { Helpers } from './Helpers';
const Palette = Parse.Palette;

/**
  * @namespace
  * @name - File
  * @description - Contains file system related classes
 */
export namespace File {
   /**
    * @class 
    * @name - Filesystem
    * @classdesc Provides file read and write functionality
   */
   export class FileSystem {
      inputSource: string;
      outputName: string;

      constructor(source: string, name: string) {
         console.log('Source', source);
         console.log('name', name);
         if(source) {
            this.inputSource = source;
         }

         if(name) {
            this.outputName = name;
         }
      }

      /**
       * @function
       * @name - readFile
       * @description - Reads a file to parse for color values
       * @param filePath
       */
      public readFile() {
         try {
            let fileData: string = '';
            let buffer: Buffer;

            const palette = new Palette(this.inputSource, this.outputName);

            if(fs.existsSync(this.inputSource)) {
               var readStream = fs.createReadStream(this.inputSource)
                  .on('data', (chunk) => {
                     fileData += Buffer.from(chunk);
                  })
                  .on('end', () => {
                     palette.buildHtmlOutput(fileData.toString());
                  });
            } else {
               Helpers.raiseError(new Error('File does not exist'));
            }
         } catch(e) {
            Helpers.raiseError(e);
         }

      }
   }
}