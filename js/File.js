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
const fs = require("fs");
const Parse_1 = require("./Parse");
const buffer_1 = require("buffer");
const Helpers_1 = require("./Helpers");
const Palette = Parse_1.Parse.Palette;
/**
  * @namespace
  * @name - File
  * @description - Contains file system related classes
 */
var File;
(function (File) {
    /**
     * @class
     * @name - Filesystem
     * @classdesc Provides file read and write functionality
    */
    class FileSystem {
        constructor(source, name) {
            console.log('Source', source);
            console.log('name', name);
            if (source) {
                this.inputSource = source;
            }
            if (name) {
                this.outputName = name;
            }
        }
        /**
         * @function
         * @name - readFile
         * @description - Reads a file to parse for color values
         * @param filePath
         */
        readFile() {
            try {
                let fileData = '';
                let buffer;
                const palette = new Palette(this.inputSource, this.outputName);
                if (fs.existsSync(this.inputSource)) {
                    var readStream = fs.createReadStream(this.inputSource)
                        .on('data', (chunk) => {
                        fileData += buffer_1.Buffer.from(chunk);
                    })
                        .on('end', () => {
                        palette.buildHtmlOutput(fileData.toString());
                    });
                }
                else {
                    Helpers_1.Helpers.raiseError(new Error('File does not exist'));
                }
            }
            catch (e) {
                Helpers_1.Helpers.raiseError(e);
            }
        }
    }
    File.FileSystem = FileSystem;
})(File = exports.File || (exports.File = {}));
//# sourceMappingURL=File.js.map