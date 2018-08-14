"use strict";
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
**************************************************************************** */
/* ***************************************************************************
 * @author      Christopher Prindle
 * @version     1.0
 * @description Searches the provided file or web page for color values in the
 *              following formats:
 *                  - Hex:  #FFFFFF
 *                  - RGBA: rgba(255, 255, 255, 1.0)
 *                  - HSLA: hsl(359, 100%, 100%, 1.0)
 *              The resulting color palette can be saved to the following
 *              formats:
 *                  - CSS (Cascading Style Sheet)
 *                  - GPL (Gimp Color PaletteBuilder)
 *                  - HTML (Web Page)
 *                  - LESS (Less Style Sheet)
 *                  - SCSS (Sass Style Sheet)
 *
 *************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./FileSystem.ts" />
/// <reference path="./Palette.ts" />
/// <reference path="./Web.ts" />
/**
 * Module Entry
 * Parse the command line and determine which options to call
 */
const chalk_1 = require("chalk");
const minimist2 = require("minimist2");
const FileSystem_1 = require("./FileSystem");
const Web_1 = require("./Web");
const Helpers_1 = require("./Helpers");
const Palette_1 = require("./Palette");
const Command_1 = require("./Command");
const log = console.log;
const logerr = console.error;
const exit = process.exit;
const info = chalk_1.default.green;
const infoBold = chalk_1.default.bold.green;
const error = chalk_1.default.bold.red;
const warning = chalk_1.default.bold.yellow;
const Http = Web_1.Web.Http;
const PaletteBuilder = Palette_1.Palette.PaletteBuilder;
const PaletteColor = Palette_1.Palette.PaletteColor;
const args = (minimist2)(process.argv.slice(2));
/**
 * Creates all Console switches and commands
 * @instance
 */
const commands = [
    new Command_1.Command('-c, --parse-css                 ', 'Flag indicating css files will be searched when parsing a web page'),
    new Command_1.Command('-o, --output [DIRECTORY]        ', 'The directory where the output file will be created'),
    new Command_1.Command('-n, --name                      ', 'The name to use when creating the output files (No extension)'),
    new Command_1.Command('-i, --input [FILE_PATH] or [URL]', 'The source file or html page to parse for color values'),
    new Command_1.Command('--css                           ', 'Create a CSS version of the color palette'),
    new Command_1.Command('--gimp                          ', 'Create a GPL (Gimp PaletteBuilder file) version of the color palette'),
    new Command_1.Command('--html                          ', 'Create a HTML version of the color palette'),
    new Command_1.Command('--less                          ', 'Create a LESS version of the color palette'),
    new Command_1.Command('--scss                          ', 'Create a SASS version of the color palette'),
];
/**
 * The file path or url specified on the command line (-i or --input)
 * @member {string}
 */
const path = (args.i) ? args.i : args.input;
/**
 * The name to use when creating the color palette output files (-n or --name)
 * @member {string}
 */
const name = (args.n) ? args.n : args.name;
//- Enter the matrix
main();
/**
  * Entry function for the application
  * @function
 */
function main() {
    try {
        if (path) {
            if (path.length) {
                if (path.toLowerCase().startsWith('http')) {
                    console.log('path', path);
                    new Http().getUrlData(path, htmlTextHandler);
                }
                else {
                    new FileSystem_1.FileSystem.FileAccess(path, name).readFile();
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
 * Handles the html data sent from Web~Html~getUrlData
 * @callback htmlTextHandler
 * @param data
 */
function htmlTextHandler(data) {
    new PaletteBuilder(path, name).buildHtmlOutput(data);
}
function printHelp() {
    log(infoBold('\nUsage: node colorseek [OPTIONS]\n'));
    commands.forEach((c) => log(info(' ' + c.Argument + '\t' + c.Description)));
    log(warning('\nIf no output type is specified then only a [DIRECTORY]/[NAME].html file will be created.'));
    log(warning('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --html).'));
    exit();
}
function showError(ex, params) {
    logerr(error(`ERROR: ${ex.message}`), chalk_1.default.redBright(params));
    exit();
}
//# sourceMappingURL=colorseek.js.map