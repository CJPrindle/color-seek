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
******************************************************************************/
/******************************************************************************
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
 *                  - GPL (Gimp Color Palette)
 *                  - HTML (Web Page)
 *                  - LESS (Less Style Sheet)
 *                  - SCSS (Sass Style Sheet)
 *
 ** **************************************************************************/
/// <reference path="./Parse.ts" />
/// <reference path="./File.ts" />
/// <reference path="./Web.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module Entry
 * Parse the command line and determine which options to call
 */
const Chalk = require("chalk");
const minimist2 = require("minimist2");
const File_1 = require("./File");
const Parse_1 = require("./Parse");
const Web_1 = require("./Web");
const Helpers_1 = require("./Helpers");
const log = console.log;
const logerr = console.error;
const exit = process.exit;
const chalk = Chalk.default;
const info = chalk.green;
const infoBold = chalk.bold.green;
const error = chalk.bold.red;
const warning = chalk.bold.yellow;
const Command = Parse_1.Parse.Command;
const Palette = Parse_1.Parse.Palette;
const Http = Web_1.Web.Http;
const args = (minimist2)(process.argv.slice(2));
//- All Console switches and commands
const commands = [
    new Command('-c, --parse-css                 ', 'Flag indicating css files will be searched when parsing a web page'),
    new Command('-o, --output [DIRECTORY]        ', 'The directory where the output file will be created'),
    new Command('-n, --name                      ', 'The name to use when creating the output files (No extension)'),
    new Command('-i, --input [FILE_PATH] or [URL]', 'The source file or html page to parse for color values'),
    new Command('--css                           ', 'Create a CSS version of the color palette'),
    new Command('--gimp                          ', 'Create a GPL (Gimp Palette file) version of the color palette'),
    new Command('--html                          ', 'Create a HTML version of the color palette'),
    new Command('--less                          ', 'Create a LESS version of the color palette'),
    new Command('--scss                          ', 'Create a SASS version of the color palette'),
];
//onerror = showError()
const path = (args.i) ? args.i : args.input;
const name = (args.n) ? args.n : args.name;
main();
/**
  * @function
  * @name - main
  * @description - Entry function for the application
  *
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
                    new File_1.File.FileSystem(path, name).readFile();
                }
            }
            else {
                Helpers_1.Helpers.raiseError(new Error('Missing input file'));
            }
        }
        else {
            printHelp();
        }
    }
    catch (e) {
        Helpers_1.Helpers.raiseError(e);
    }
}
function htmlTextHandler(data) {
    new Palette(path, name).buildHtmlOutput(data);
}
function printHelp() {
    log(infoBold('\nUsage: node colorfinder [OPTIONS]\n'));
    commands.forEach((c) => log(info(' ' + c.Argument + '\t' + c.Description)));
    log(warning('\nIf no output type is specified then only a [DIRECTORY]/[NAME].html file will be created.'));
    log(warning('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --html).'));
    exit();
}
function showError(ex, params) {
    logerr(error(`ERROR: ${ex.message}`), chalk.redBright(params));
    exit();
}
//# sourceMappingURL=colorseek.js.map