"use strict";
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
/* ***************************************************************************
* @author      Christopher Prindle
* @version     1.0
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
* @fileOverview - EntryPoint
**************************************************************************** */
/// <reference path='./Command.ts' />
/// <reference path='./FileSystem.ts' />
/// <reference path='./Palette.ts' />
/// <reference path='./Web.ts' />
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Color Seek entry point
 * @module
 */
const chalk_1 = require("chalk");
const path = require("path");
const minimist2 = require("minimist2");
const FileSystem_1 = require("./FileSystem");
const Web_1 = require("./Web");
const Helpers_1 = require("./Helpers");
const Palette_1 = require("./Palette");
const Command_1 = require("./Command");
/**
 *  Abstracts the console.log method
 *  @constant
 *  @type {Console.log}
 * */
const log = console.log;
const exit = process.exit;
const info = chalk_1.default.green;
const infoBold = chalk_1.default.bold.green;
const warning = chalk_1.default.bold.yellow;
const Http = Web_1.Web.Http;
const PaletteBuilder = Palette_1.Palette.PaletteBuilder;
const args = (minimist2)(process.argv.slice(2));
let hexColors = [];
/**
 * Creates all Console switches and commands
 * @constant
 * @type {Command[]}
 * @default
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
let outputPath = (args.o) ? args.o : args.output;
const inputPath = (args.i) ? args.i : args.input;
const isCss = args.css;
const isLess = args.less;
const isSass = args.sass;
const colorFormat = (args.rgb)
    ? 'rgb'
    : (args.hsl)
        ? 'hsl'
        : 'hex';
const name = (args.n)
    ? args.n
    : (args.name)
        ? args.name
        : path.basename(inputPath, path.extname(inputPath));
console.log(name);
//- Enter the matrix
main();
/**
  * Entry function for Color Seek
  * @public
  * @function
 */
function main() {
    try {
        if (inputPath != null) {
            if (inputPath.length) {
                //- Determine input type
                if (inputPath.toLowerCase().startsWith('http')) {
                    new Http().getUrlData(inputPath, htmlTextHandler);
                }
                else {
                    new FileSystem_1.FileSystem.FileAccess(inputPath, name).readFile(htmlTextHandler);
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
 * Handles the html data sent from Web.Html.getUrlData()
 * @public
 * @function
 * @callback htmlTextHandler
 * @param {string} data - The file or URL text
 */
function htmlTextHandler(data) {
    console.log('inputPath', inputPath);
    const fs = new FileSystem_1.FileSystem.FileAccess(inputPath, name);
    //- Create color palette and generate HTML
    hexColors = new PaletteBuilder(inputPath, name).buildHtmlOutput(data);
    if (!outputPath) {
        outputPath = './';
    }
    //- Determine which output files to generate
    if (isCss) {
        fs.writeCss(outputPath, name, hexColors, colorFormat, 'css');
    }
    if (isLess) {
        fs.writeCss(outputPath, name, hexColors, colorFormat, 'less');
    }
    if (isSass) {
        fs.writeCss(outputPath, name, hexColors, colorFormat, 'scss');
    }
}
/*
 * Print the CLI command list for Color Seek
 * @public
 * @function
*/
function printHelp() {
    log(infoBold('\nUsage: node colorseek [OPTIONS]\n'));
    commands.forEach((c) => log(info(' ' + c.Argument + '\t' + c.Description)));
    log(warning('\nIf no output type is specified then only a [DIRECTORY]/[NAME].html file will be created.'));
    log(warning('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --html).'));
    exit();
}
//# sourceMappingURL=colorseek.js.map