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
const Palette_1 = require("./Palette");
const buffer_1 = require("buffer");
const Helpers_1 = require("./Helpers");
const PaletteBuilder = Palette_1.Palette.PaletteBuilder;
/**
  * Contains file system related classes
  * @namespace
 */
var FileSystem;
(function (FileSystem) {
    /**
     * @class
     * @classdesc Provides file read and write functionality
     * @property {string} inputSource - The source file/url parsed for color values
     * @property {string} outputName  - The provided name for the generated output files
    */
    class FileAccess {
        constructor(source, name) {
            if (source) {
                this.inputSource = source;
            }
            if (name) {
                this.outputName = name;
            }
        }
        /**
         * Reads a file and sends the text to be parsed for color values
         * @function
        */
        readFile() {
            try {
                let fileData = '';
                let buffer;
                const palette = new PaletteBuilder(this.inputSource, this.outputName);
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
                    Helpers_1.Helpers.outputError(new Error('File does not exist'));
                }
            }
            catch (e) {
                Helpers_1.Helpers.outputError(e);
            }
        }
    }
    FileSystem.FileAccess = FileAccess;
})(FileSystem = exports.FileSystem || (exports.FileSystem = {}));
//# sourceMappingURL=FileSystem.js.map