﻿/*! ***************************************************************************
@license MIT License
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
import * as request from "request";
import { Buffer } from "buffer";

/**
 * Contains classes pertaining to the web
 * @namespace
 */
export namespace Web {
  /**
   * @public
   * @class
   * @classdesc Provides access to HTML and/or CSS files to parse for color values
   * @memberof Web
   */
  export class Http {
     /**
      * @constructor
      * @description Default Constructor
      */
     constructor() { }

     /**
     * @public
     * @function
     * @summary URL Connect
     * @description Connects to the provided Url and parses the text data
     * @param {string}  url       - The Url to parse
     * @param {Function} callback - The callback function for further processing
     */
    public async getUrlData(url: string, callback: Function): Promise<any> {
      let html = '';

      request
        .get(url)
        .on('data', chunk => html += Buffer.from(chunk).toString())
        .on('end', () => callback(html));
    }
  }
}
