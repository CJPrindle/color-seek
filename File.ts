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
const Palette = Parse.Palette;

/**
 * @namespace File - Contains file system related classes
 */
export namespace File {
   /**
    * @class - Filesystem
    * @classdesc Provides file read and write functionality
   */
   export class FileSystem {

      constructor(sourceFile: string) {
      }

      readFile(filePath) {

         let buffer: Buffer;
         const palette = new Palette();

         if(fs.existsSync(filePath)) {
            var readStream = fs.createReadStream(filePath)
               .on('data', (chunk) => {
                  buffer.write(chunk, buffer.length);
               })
               .on('end', () => {
                  palette.buildHtmlOutput(buffer.toString());
               });
         }
      }
   }
}