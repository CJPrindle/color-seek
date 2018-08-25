"use strict";
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
/* ***************************************************************************
* @author      Christopher Prindle
* @version     0.1
* @description Searches the provided file or web page for color values in the
*              following formats:
*                  - Hex:  #FFFFFF
*                  - RGB: rgba(255, 255, 255, 1.0)
*                  - HSL: hsl(359, 100%, 100%, 1.0)
*              The resulting color palette can be saved to the following
*              formats:
*                  - CSS (Cascading Style Sheet)
*                  - GPL (Gimp Color PaletteBuilder)
*                  - HTML (Web Page)
*                  - LESS (Less Style Sheet)
*                  - SCSS (Sass Style Sheet)
* @file Entry point of the Color Seek application
**************************************************************************** */
/// <reference path='./lib/Command.ts' />
/// <reference path='./lib/FileSystem.ts' />
/// <reference path='./lib/Palette.ts' />
/// <reference path='./lib/Web.ts' />
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  @module colorseek
 *  @description Creates a color palette by parsing a file or URL
 */
const chalk_1 = require("chalk");
const path = require("path");
const minimist2 = require("minimist2");
const FileSystem_1 = require("./lib/FileSystem");
const Web_1 = require("./lib/Web");
const Helpers_1 = require("./lib/Helpers");
const Palette_1 = require("./lib/Palette");
const Command_1 = require("./lib/Command");
/**
 * @summary Log Helper
 * @description Reference to the console.log method
 * @type {Console}
 * @instance
 */
const log = console.log;
/**
 * @summary Application Exit Helper
 * @description Reference to the process.exit field
 * @type {any}
 * @instance
 */
const exit = process.exit;
/**
 * @summary Console Helper
 * @description Displays 'Information' level messages to the console
 * @type {any}
 * @instance
 */
const info = chalk_1.default.green;
/**
 * @summary Console Helper
 * @description Displays bold 'Information' level messages to the console
 * @type {any}
 * @instance
 */
const infoBold = chalk_1.default.bold.green;
/**
 * @summary Console Helper
 * @description Displays 'Warning' level messages to the console
 * @type {any}
 * @instance

 */
const warning = chalk_1.default.bold.yellow;
/**
 * @summary Command Line Arguments Helper
 * @description Returns the command line argument array starting on the third element
 * @type {any}
 * @instance
 */
const args = minimist2(process.argv.slice(2));
/**
 *  @summary Color Format
 *  @description An array containing all colors found in the source file or URL
 *  @type {Array<string>}
 *  @instance
 */
let hexColors = [];
/**
 * @summary Global.Command Object
 * @description Creates all Console switches and commands
 * @type {Command[]}
 * @instance
 */
const commands = [
    new Command_1.Command('-i, --input [PATH] _**required', 'The source file or url to search for color values   '),
    new Command_1.Command('-o, --output [DIRECTORY]      ', 'The output file(s) directory                        '),
    new Command_1.Command('-n, --name                    ', 'The output file(s) name (no extension)              '),
    new Command_1.Command('--css                         ', 'Create a Css rendering of the color palette         '),
    new Command_1.Command('--gpl                         ', 'Create a Gimp Palette rendering of the color palette'),
    new Command_1.Command('--less                        ', 'Create a Less rendering of the color palette        '),
    new Command_1.Command('--scss                        ', 'Create a Sass rendering of the color palette        ')
];
/**
 * @summary Command Line Argument
 * @description The directory to save all output files
 * @type {string}
 * @instance
 */
let outputPath = args.o ? args.o : args.output;
/**
 * @summary Command Line Argument
 * @description The source file path or URL location
 * @type {string}
 * @instance
 */
const inputPath = args.i ? args.i : args.input;
/**
 * @summary Command Line Argument
 * @description Is CSS a requested output file type
 * @type {boolean}
 * @instance
 */
const isCss = args.css;
/**
 * @summary Command Line Argument
 * @description Is Gimp Palette File a requested output file type
 * @type {boolean}
 * @instance
 */
const isGimp = args.gimp;
/**
 * @summary Command Line Argument
 * @description Is LESS a requested output file type
 * @type {boolean}
 * @instance
 */
const isLess = args.less;
/**
 * @summary Command Line Argument
 * @description Is SASS a requested output file type
 * @type {boolean}
 * @instance
 */
const isSass = args.sass;
/**
 * @summary Command Line Argument
 * @description The color format to create (Hex, Gimp, RGB, HSL)
 * @type {string}
 * @instance
 */
const colorFormat = args.rgb
    ? 'rgb'
    : args.hsl
        ? 'hsl'
        : 'hex';
/**
 * @summary Command Line Argument
 * @description The file name to assign all output files
 * @type string
 * @instance
 */
const name = args.n
    ? args.n
    : args.name
        ? args.name
        : path.basename(inputPath, path.extname(inputPath));
//- Enter the matrix
main();
/**
  * @public
  * @function
  * @summary Main
  * @description Entry function for Color Seek
  * @memberof Global
 */
function main() {
    try {
        if (inputPath !== null) {
            if (inputPath.length) {
                //- Determine input type
                if (inputPath.toLowerCase().startsWith('http')) {
                    new Web_1.Web.Http().getUrlData(inputPath, htmlTextHandler);
                }
                else {
                    new FileSystem_1.FileSystem.FileAccess(inputPath, outputPath, name).readFile(htmlTextHandler);
                }
            }
            else {
                Helpers_1.Helpers.outputError(new Error('Missing input file'));
            }
        }
        else {
            printHelp();
        }
    }
    catch (e) {
        Helpers_1.Helpers.outputError(e);
    }
}
/**
 * @public
 * @function
 * @summary Html Text Handler Callback
 * @description Handles the html data sent from Web.Html.getUrlData() to be
 *              written to disk
 * @memberof Global
 * @callback htmlTextHandler
 * @param {string} data - The file or URL text
 */
function htmlTextHandler(data) {
    const fs = new FileSystem_1.FileSystem.FileAccess(inputPath, outputPath, name);
    if (!outputPath) {
        outputPath = '.';
    }
    //- Create color palette and generate HTML
    hexColors = new Palette_1.Palette.PaletteBuilder(inputPath, outputPath, name).buildHtmlOutput(data);
    //- Determine which output files to generate
    if (isCss) {
        fs.writeCss(outputPath, name, hexColors, colorFormat, 'css');
    }
    if (isGimp) {
        fs.writeCss(outputPath, name, hexColors, 'gpl', 'gpl');
    }
    if (isLess) {
        fs.writeCss(outputPath, name, hexColors, colorFormat, 'less');
    }
    if (isSass) {
        fs.writeCss(outputPath, name, hexColors, colorFormat, 'scss');
    }
}
/*
 * @public
 * @function
 * @summary Print Help
 * @description Print the CLI command list for Color Seek
 * @memberof Global
 */
function printHelp() {
    log(infoBold('\nUsage: node colorseek [OPTIONS]\n'));
    commands.forEach((c) => log(info(' ' + c.Argument + '\t' + c.Description)));
    log(warning('\nIf no output type is specified then only a [DIRECTORY]/[NAME].html file will be created.'));
    log(warning('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --html).'));
    exit();
}
//# sourceMappingURL=colorseek.js.map