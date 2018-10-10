#!/usr/bin/env node

/*! ***************************************************************************
@license MIT License
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
/// <reference path='../lib/command.ts' />
/// <reference path='../lib/file-system.ts' />
/// <reference path='../lib/palette.ts' />
/// <reference path='../lib/web.ts' />

/**
 * Module Entry
 * Parse the command line and determine which options to call
 */
import chalk, { Chalk } from 'chalk';
import * as path from 'path';
import * as minimist2 from 'minimist2';
import { FileSystem } from '../lib/file-system';
import { Web } from '../lib/web';
import { Helpers } from '../lib/helpers';
import { Palette } from '../lib/palette';
import { Command } from '../lib/command';

/**
 * @summary Global.Command Object
 * @description Creates all Console switches and commands
 * @type {Command[]}
 * @member
 */
const commands: Command[] = [
  new Command('-i, --input [PATH]      ', '[REQUIRED] The source file or url to search for color values   '),
  new Command('-o, --output [DIRECTORY]', 'The output file(s) directory                        '),
  new Command('-n, --name              ', 'The output file(s) name (no extension)              '),
  new Command('--css                   ', 'Create a Css rendering of the color palette         '),
  new Command('--gpl                   ', 'Create a Gimp Palette rendering of the color palette'),
  new Command('--less                  ', 'Create a Less rendering of the color palette        '),
  new Command('--scss                  ', 'Create a Sass rendering of the color palette        ')
];

/**
 * @summary Log Helper
 * @description Reference to the console.log method
 * @type {Console}
 * @member
 */
const log = console.log;

/**
 * @summary Application Exit Helper
 * @description Reference to the process.exit field
 * @type {any}
 * @member
 */
const exit: any = process.exit;

/**
 * @summary Console Helper
 * @description Displays 'Information' level messages to the console
 * @type {any}
 * @member
 */
const info: any = chalk.hex('#8CF069');

/**
 * @summary Console Helper
 * @description Displays bold 'Information' level messages to the console
 * @type {any}
 * @member
 */
const infoBold: any = chalk.bold.green;

/**
 * @summary Console Helper
 * @description Displays message sent to the printHelp method
 * @type {any}
 * @member
 */
const helpMessage: any = chalk.bold.hex('#69A0F0');

/**
 * @summary Console Helper
 * @description Displays 'Warning' level messages to the console
 * @type {any}
 * @member
 */
const warning: any = chalk.bold.hex('#F0EB69');

/**
 * @summary Command Line Arguments Helper
 * @description Returns the command line argument array starting on the third element
 * @type {any}
 * @member
 */
const args: any = minimist2(process.argv.slice(2));

/**
 *  @summary Color Format
 *  @description An array containing all colors found in the source file or URL
 *  @type {Array<string>}
 *  @member
 */
let hexColors: string[] = [];

/**
 * @summary Command Line Argument
 * @description Request for the help menu
 * @type {string}
 * @member
 */
const helpMe: string = args.h ? args.h : args.help;

/**
 * @summary Command Line Argument
 * @description The source file path or URL location
 * @type {string}
 * @member
 */
const inputPath: string = args.i ? args.i : args.input;

/**
 * @summary Command Line Argument
 * @description The directory to save all output files
 * @type {string}
 * @member
 */
let outputPath: string = args.o ? args.o : args.output;

/**
 * @summary Command Line Argument
 * @description Is CSS a requested output file type
 * @type {boolean}
 * @member
 */
const isCss: boolean = args.css;

/**
 * @summary Command Line Argument
 * @description Is Gimp Palette File a requested output file type
 * @type {boolean}
 * @member
 */
const isGimp: boolean = args.gimp;

/**
 * @summary Command Line Argument
 * @description Is LESS a requested output file type
 * @type {boolean}
 * @member
 */
const isLess: boolean = args.less;

/**
 * @summary Command Line Argument
 * @description Is SASS a requested output file type
 * @type {boolean}
 * @member
 */
const isSass: boolean = args.sass;

/**
 * @summary Command Line Argument
 * @description The color format to create (Hex, Gimp, RGB, HSL)
 * @type {string}
 * @member
 */
const colorFormat: string = args.rgb
  ? 'rgb'
  : args.hsl
    ? 'hsl'
    : 'hex';

/**
 * @summary Command Line Argument
 * @description The file name to assign all output files
 * @type {string}
 * @member
 */
let name: string = args.n ? args.n : args.name;

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
    //- Cry for HELP?
    if (helpMe) {
      printHelp();
      return;
    }

    //- Check if input source is valid
    if (inputPath) {
      if (inputPath.length) {
        //- Check if the file name needs to be set
        if (!name) {
          name = path.basename(inputPath, path.extname(inputPath));
        }

        //- Determine if input is a file or a URL
        if (inputPath.toLowerCase().startsWith('http')) {
          new Web.Http().getUrlData(inputPath, htmlTextHandler);
        } else {
          new FileSystem.FileAccess(inputPath, outputPath, name).readFile(htmlTextHandler);
        }
      } else {
        Helpers.outputError(new Error('Missing input file'));
      }
    } else {
      printHelp('Input Path is Required');
    }
  }
  catch (e) {
    Helpers.outputError(e);
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
function htmlTextHandler(data: string): void {
  const fs = new FileSystem.FileAccess(inputPath, outputPath, name);

  if (!outputPath) {
    outputPath = '.';
  }

  //- Create color palette and generate HTML
  hexColors = new Palette.PaletteBuilder(inputPath, outputPath, name).buildHtmlOutput(data);

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
function printHelp(message: string = '') {

  if (message.length) {
    log(helpMessage('-----------------------------------------------------'));
    log(helpMessage(`SYSTEM MESSAGE: ${message}`));
    log(helpMessage('-----------------------------------------------------'));
  }

  log(info('\nUsage: colorseek [OPTIONS]\n'));
  commands.forEach((c) => log(infoBold(' ' + c.Argument + '\t' + c.Description)));
  log(warning('\nIf no output type is specified then only a [DIRECTORY]/[NAME].html file will be created.'));
  log(warning('Multiple versions of the color palette can be created by specifying multiple output types (ex: --css --sass).'));
  exit();
}
