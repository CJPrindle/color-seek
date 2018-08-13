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
const Palette = Parse_1.Parse.Palette;
var File;
(function (File) {
    /**
    * @description Provides file read and write functionality
    */
    class FileSystem {
        constructor(sourceFile) {
        }
        readFile(filePath) {
            let buffer;
            const palette = new Palette();
            if (fs.existsSync(filePath)) {
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
    File.FileSystem = FileSystem;
})(File = exports.File || (exports.File = {}));
//# sourceMappingURL=File.js.map