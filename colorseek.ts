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
/// <reference path="./Command.ts" />
/// <reference path="./FileSystem.ts" />
/// <reference path="./Palette.ts" />
/// <reference path="./Web.ts" />

/**
 * Color Seek entry point
 * @module
 */
import chalk from 'chalk';
import * as minimist2 from 'minimist2';
import { FileSystem } from './FileSystem';
import { Web } from './Web';
import { Helpers } from './Helpers';
import { Palette } from './Palette';
import { Command } from './Command';

/** 
 *  Abstracts the console.log method
 *  @constant
 *  @type {}
 * */
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
 * @constant
 * @type {Command[]}
 * @default 
 */
const commands: Command[] = [
   new Command('-i, --input [PATH] _**required','The source file or url to search for color values   '),
   new Command('-o, --output [DIRECTORY]      ','The output file(s) directory                        '),
   new Command('-n, --name                    ','The output file(s) name (no extension)              '),
   new Command('--css                         ','Create a Css rendering of the color palette         '),
   new Command('--gpl                         ','Create a Gimp Palette rendering of the color palette'),
   new Command('--less                        ','Create a Less rendering of the color palette        '),
   new Command('--scss                        ','Create a Sass rendering of the color palette        ')
];

/** 
 * The file path or url specified on the command line (-i or --input)
 * @constant 
 * @type {string} 
 * @default
 */
const path: string = (args.i) ? args.i : args.input;

/**
 * The name to use when creating the color palette output files (-n or --name)
 * @constant
 * @type {string}
 * @inner
 * @default
 */
const name: string = (args.n) ? args.n : args.name;

//- Enter the matrix
main();

/**
  * Entry function for Color Seek
  * @public
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
 * @public
 * @function
 * @callback htmlTextHandler 
 * @param data
 */
function htmlTextHandler(data: string): void {
   new PaletteBuilder(path, name).buildHtmlOutput(data);
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
