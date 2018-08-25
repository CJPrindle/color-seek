"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*! ***************************************************************************
@license
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
const buffer_1 = require("buffer");
const Helpers_1 = require("./Helpers");
const ColorConversion_1 = require("./ColorConversion");
/**
  * Contains file system related classes
  * @namespace
 */
var FileSystem;
(function (FileSystem) {
    /**
     * @class
     * @classdesc Provides file read and write functionality
     * @memberof FileSystem
     * @property {string} inputSource - The source file/url parsed for color values
     * @property {string} outputName  - The provided name for the generated output files
     * @memberof FileSystem
    */
    class FileAccess {
        /**
         * @constructor
         * @param {string} source     - The source file/url parsed for color values
         * @param {string} outputPath - The provided directory to save the generated output files
         * @param {string} name       - The provided name for the generated output files
         */
        constructor(source, outputPath, name) {
            this.inputSource = source;
            this.outputPath = outputPath;
            this.outputName = name;
        }
        /**
         * @public
         * @function
         * @summary Reads a file and extracts the contents
         * @description The file opened is specified on the command line. The entire text is returned for the subsequent
         *              parsing of CSS color values
         * @param {Function} callback - The function to call with the input source data when complete
        */
        readFile(callback) {
            let fileData = '';
            if (fs.existsSync(this.inputSource)) {
                var readStream = fs.createReadStream(this.inputSource)
                    .on('data', (chunk) => {
                    fileData += buffer_1.Buffer.from(chunk);
                })
                    .on('end', () => {
                    callback(fileData.toString());
                });
            }
            else {
                Helpers_1.Helpers.outputError(new Error('File does not exist'));
            }
        }
        /**
         * @public
         * @function
         * @summary Writes color palette
         * @description The type of file to create (CSS, GIMP, LESS, SASS) is based on the styleType parameter. Which
         *              color format to write (Hex, HSL, RGB) is specified via the colorFormat parameter.
         * @param {string} outputPath     - The type of stylesheet: CSS, SASS, LESS
         * @param {string} name           - The name given to the output files
         * @param {string[]} hexColors    - A string array containing the color palette as Hexadecimal values
         * @param {string} colorFormat    - CSS color format to use when writing file: Hex, HSL, or RGB
         * @param {string} styleType      - The type of stylesheet: CSS, SASS, LESS
         */
        writeCss(outputPath, name, hexColors, colorFormat = 'hex', styleType) {
            let cssFormat = '';
            let count = 0;
            const colorConv = new ColorConversion_1.ColorConversion();
            let r, g, b;
            let h, s, l;
            //- Start with the header
            let styleSheet = styleType === 'css' || styleType === 'less' || styleType === 'scss'
                ? '/* \n Generated by Color Seek \n https://github.com/CJPrindle/color-seek \n */\n\n'
                : styleType === 'gpl'
                    ? `GIMP Palette\nName: ${name}\n`
                    : '';
            switch (colorFormat) {
                case 'hex':
                    hexColors.forEach((hc) => {
                        cssFormat = `${hc};`;
                        styleSheet += this.formatStyleSheet(styleType, cssFormat, count++);
                    });
                    break;
                case 'gpl':
                    styleSheet += '\n#\n';
                    hexColors.forEach((hc) => {
                        [r, g, b] = colorConv.HexToRgb(hc);
                        cssFormat = `${r} ${g} ${b}`;
                        styleSheet += this.formatStyleSheet(styleType, cssFormat, count++);
                    });
                    break;
                case 'rgb':
                    hexColors.forEach((hc) => {
                        [r, g, b] = colorConv.HexToRgb(hc);
                        cssFormat = `rgb(${r}, ${g}, ${b});`;
                        styleSheet += this.formatStyleSheet(styleType, cssFormat, count++);
                    });
                    break;
                case 'hsl':
                    hexColors.forEach((hc) => {
                        [r, g, b] = colorConv.HexToRgb(hc);
                        [h, s, l] = colorConv.RgbToHsl(r, g, b);
                        cssFormat = `hsl(${h}, ${s}%, ${l}%);`;
                        styleSheet += this.formatStyleSheet(styleType, cssFormat, count++);
                    });
                    break;
                default:
                    Helpers_1.Helpers.outputError(new Error('Invalid Stylesheet type: ' + styleType));
            }
            const write = fs.writeFile(`${outputPath}/${name}.${styleType}`, styleSheet, (err) => {
                if (err) {
                    Helpers_1.Helpers.outputError(err);
                }
            });
        }
        /**
         * @private
         * @function
         * @summary Formats the color values based the file type provided
         * @param {string} styleType - The file type to create (css, less, etc)
         * @param {string} cssFormat - The color format to use (Hex, RGB, HSL)
         * @param {number} count     - Value used to name each color entry
         * @returns {string} A string formatted for the specified stylesheet type
         */
        formatStyleSheet(styleType, cssFormat, count) {
            let output = '';
            switch (styleType) {
                case 'css':
                    output = `.color-${count} { color: ${cssFormat} }\n`;
                    break;
                case 'gpl':
                    output = `${cssFormat}      primary ${count}\n`;
                    break;
                case 'less':
                    output = `@color-${count}: ${cssFormat}\n`;
                    break;
                case 'scss':
                    output = `$color-${count}: ${cssFormat}\n`;
                    break;
                default:
                    Helpers_1.Helpers.outputError(new Error('Invalid Stylesheet type: ' + styleType));
            }
            return output;
        }
    }
    FileSystem.FileAccess = FileAccess;
})(FileSystem = exports.FileSystem || (exports.FileSystem = {}));
//# sourceMappingURL=FileSystem.js.map