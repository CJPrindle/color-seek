"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*! ***************************************************************************
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