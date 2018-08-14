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
import * as request from 'request';
import * as http from 'http';
import * as htmlparser from 'htmlparser2';
import { error } from 'util';
import { Readable, Writable } from 'stream';
import { write } from 'fs';
import { Buffer } from 'buffer';

/**
 * Contains classes concerns with web access
 * @namespace
 */
export namespace Web {

   /**
    * @class 
    * @classdesc Provides access to HTML and/or CSS files to parse for color values
    * */
   export class Http {

      /**
       * Connects to the provided Url and parses the text data
       * @function
       * @param {string}  url - The Url to parse
       * @param {Function} callback - The callback function for further processing
      */
      public async getUrlData(url: string, callback: Function): Promise<any> {
         let html = '';

         request.get(url)
            .on('data', (chunk) => html += Buffer.from(chunk).toString())
            .on('end', () => callback(html) );
      }
   }
}
