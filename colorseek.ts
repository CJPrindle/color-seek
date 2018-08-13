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

/**
 * Module Entry
 * Parse the command line and determine which options to call
 */
import * as minimist2 from 'minimist2';
import { File } from './File';
import { Parse } from './Parse';
import { Web } from './Web';
import { parse } from 'path';

const Command = Parse.Command;
const Palette = Parse.Palette;
const Http = Web.Http;
const args = (minimist2)(process.argv.slice(2));

//- All Console switches and commands
const commands: Parse.Command[] = [
   new Command('-c, --parse-css                     ', 'Flag indicating css files will be searched when parsing a web page'),
   new Command('-o, --output [DIRECTORY]            ', 'The directory where the output file will be created'),
   new Command('-p, --open                          ', 'Open the HTML file when complete'),
   new Command('-i, --input [FILE_PATH] or [URL]    ', 'The source file or html page to parse for color values'),
   new Command('--css                               ', 'Create a CSS version of the color palette'),
   new Command('--gimp                              ', 'Create a GPL (Gimp Palette file) version of the color palette'),
   new Command('--html                              ', 'Create a HTML version of the color palette'),
   new Command('--less                              ', 'Create a LESS version of the color palette'),
   new Command('--scss                              ', 'Create a SASS version of the color palette'),
];

const path: string = (args.i) ? args.i : args.input;

if(path.length) {
   if(path.toLowerCase().startsWith('http')) {
      console.log('path', path);
      new Http().parseUrl(path, htmlTextHandler);
   }
} else {
   printHelp();
}

function htmlTextHandler(data: string): void {
   console.log('data', data);
   new Palette(path).buildHtmlOutput(data);
}

function printHelp() {
   console.log('\nUsage: node colorfinder\n');
   commands.forEach((c) => console.log(' ' + c.Argument + '\t' + c.Description));
   console.log('\nIf no output type is specified then only a [DIRECTORY]/color-palette.txt file will be created.');
   console.log('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --html).');
   exit();
}

function error(err: Error, params: any[]) {
   console.error(err.message, params);
}
function exit(code: number = 1) {
   process.exit(code);
}