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

/// <reference path="./FileSystem.ts" />
/// <reference path="./Palette.ts" />
/// <reference path="./Web.ts" />

/**
 * Module Entry
 * Parse the command line and determine which options to call
 */
import chalk from 'chalk';
import * as minimist2 from 'minimist2';
import { FileSystem } from './FileSystem';
import { Web } from './Web';
import { Helpers } from './Helpers';
import { Palette } from './Palette';
import { Command } from './Command';

const log = console.log;
const logerr = console.error;
const exit = process.exit;
const info = chalk.green;
const infoBold = chalk.bold.green;
const error = chalk.bold.red;
const warning = chalk.bold.yellow;
const Http = Web.Http;
const PaletteBuilder = Palette.PaletteBuilder;
const PaletteColor = Palette.PaletteColor;
const args = (minimist2)(process.argv.slice(2));

/** 
 * Creates all Console switches and commands
 * @instance 
 */
const commands: Command[] = [
   new Command('-c, --parse-css                 ', 'Flag indicating css files will be searched when parsing a web page'),
   new Command('-o, --output [DIRECTORY]        ', 'The directory where the output file will be created'),
   new Command('-n, --name                      ', 'The name to use when creating the output files (No extension)'),
   new Command('-i, --input [FILE_PATH] or [URL]', 'The source file or html page to parse for color values'),
   new Command('--css                           ', 'Create a CSS version of the color palette'),
   new Command('--gimp                          ', 'Create a GPL (Gimp PaletteBuilder file) version of the color palette'),
   new Command('--html                          ', 'Create a HTML version of the color palette'),
   new Command('--less                          ', 'Create a LESS version of the color palette'),
   new Command('--scss                          ', 'Create a SASS version of the color palette'),
];

/** 
 * The file path or url specified on the command line (-i or --input)
 * @member {string} 
 */
const path: string = (args.i) ? args.i : args.input;
/** 
 * The name to use when creating the color palette output files (-n or --name)
 * @member {string} 
 */
const name: string = (args.n) ? args.n : args.name;

//- Enter the matrix
main();

/**
  * Entry function for the application
  * @function
 */
function main() {
   try {
      if(path) {
         if(path.length) {
            if(path.toLowerCase().startsWith('http')) {
               console.log('path', path);
               new Http().getUrlData(path, htmlTextHandler);
            } else {
               new FileSystem.FileAccess(path, name).readFile();
            }
         } else {
            Helpers.outputError(new Error('Missing input file'));
         }
      } else {
         printHelp();
      }
   }
   catch(e) {
      Helpers.outputError(e);
   }
}

/**
 * Handles the html data sent from Web~Html~getUrlData
 * @callback htmlTextHandler 
 * @param data
 */
function htmlTextHandler(data: string): void {
   new PaletteBuilder(path, name).buildHtmlOutput(data);
}

function printHelp() {
   log(infoBold('\nUsage: node colorseek [OPTIONS]\n'));
   commands.forEach((c) => log(info(' ' + c.Argument + '\t' + c.Description)));
   log(warning('\nIf no output type is specified then only a [DIRECTORY]/[NAME].html file will be created.'));
   log(warning('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --html).'));
   exit();
}

function showError(ex: Error, params: any) {
   logerr(error(`ERROR: ${ex.message}`), chalk.redBright(params));
   exit();
}
