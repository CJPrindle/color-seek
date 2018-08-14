"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const request = require("request");
const buffer_1 = require("buffer");
/**
 * Contains classes concerns with web access
 * @namespace
 */
var Web;
(function (Web) {
    /**
     * @class
     * @classdesc Provides access to HTML and/or CSS files to parse for color values
     * */
    class Http {
        /**
         * Connects to the provided Url and parses the text data
         * @function
         * @param {string}  url - The Url to parse
         * @param {Function} callback - The callback function for further processing
        */
        getUrlData(url, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                let html = '';
                request.get(url)
                    .on('data', (chunk) => html += buffer_1.Buffer.from(chunk).toString())
                    .on('end', () => callback(html));
            });
        }
    }
    Web.Http = Http;
})(Web = exports.Web || (exports.Web = {}));
//# sourceMappingURL=Web.js.map