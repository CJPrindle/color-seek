﻿/*! ***************************************************************************
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
import * as fs from 'fs';
import * as opn from 'opn';
import { Helpers } from './Helpers';
import { ColorConversion } from './ColorConversion';

/**
 * Contains classes related to the parsing of provided data
 * @namespace
 */
export namespace Palette {
   /**
    * @public
    * @class
    * @classdesc Contains methods for building the color palette
    * @memberof Palette
    */
   export class PaletteBuilder {
      private htmlTemplate = `<html xmlns="http://www.w3.org/1999/xhtml"><title>Color Seek - Color Palette</title><style>*{color:#999;font-family:'Gill Sans MT','Arial Nova','Open Sans','Helvetica Neue','Lucida Grande','Segoe UI',sans-serif;font-size:12px}body{background-color:#222;padding:20px}a{color:#fff777}a:visited{color:green}.center{text-align:center}.extra-large-text{font-size:2.5em;font-weight:600}.large-text{font-size:1.5em;font-weight:600}.container{background:#e0ffff;border:2px solid #c6c6c6;display:flex;flex-wrap:wrap;position:relative;padding-bottom:5px}.container.hues{background-color:#333}.palette-header{background-color:#b3b3b3;border:2px solid #e9e9e9;color:#141414;display:block;font-size:1.2em;font-weight:500;height:25px;margin:15px 0 0 0;padding:5px;position:relative;text-shadow:1px 1px 1px #b1b1b1}.palette-header span{color:#141414;font-size:1.33em;font-weight:600}.spectrum{display:inline-flex;position:absolute;right:0;top:1px}.strip{display:block;height:32px;margin:0;max-height:32px;width:8px}.swatch{border-radius:10px;box-shadow:0 4px 8px 0 rgba(0,0,0,.8),0 6px 20px 0 rgba(0,0,0,.8);display:inline-grid;height:160px;margin:6px;text-align:center;width:160px}.header{border-radius:0 0 4px 4px;height:75px;margin-bottom:auto;margin-left:auto;margin-right:auto;margin-top:auto;position:relative;text-align:left;width:70%}.header div{font-family:'Source Code Pro','Courier Prime Code',Cousine,Inconsolata,'Global Monospace',monospace;font-size:11px}.left{bottom:0;left:0;position:absolute;top:5px}.left div{font-weight:700}.right{bottom:0;position:absolute;right:0;text-align:right;top:5px}.colorseek{text-shadow:1px 1px 2px #1688d9}.strip:hover .tooltip{display:block}.tooltip{background:rgba(128,128,128,.74);color:#fff;display:none;height:auto;margin-left:-100px;margin-top:-16px;padding:4px;position:absolute;width:auto;z-index:1000}</style><script language=ecmaScript>let previousThumbnail = null;let previousStyle = null; function colorTarget(hex) { const thumbnail = document.getElementById(hex); if(previousThumbnail !== null) { previousThumbnail.style = previousStyle; } previousThumbnail = thumbnail; previousStyle = thumbnail.style; thumbnail.style.border = '5px yellow solid';}</script></head><body><div class="extra-large-text center">{name} Palette</div><div><span class=large-text>{total_colors} Colors Generated by</span> <b class="colorseek large-text">Color Seek</b></div><div style="position: relative"><span><span class=large-text>Original Source:</span> <i><span class=large-text>{source}</span></i></span> <span style="position: absolute; right: 0"><span>Go to:</span> <span>&nbsp;</span> <a href=#Hues>Hues</a> <span>&nbsp;</span> <a href=#Grays>Grays</a></span></div><div class=palette-header><span id=Hues>Hues</span> <span class=spectrum>{hue_spectrum}</span></div><div class="container hues">{hue_colors}</div><div class=palette-header><span id=Grays>Grays</span> <span class=spectrum>{gray_spectrum}</span></div><div class=container>{gray_colors}</div><br><div style="position: relative"><span><span>Color Seek is available on</span> <a href=http://www.github.com/cjprindle/color-seek>GitHub</a></span> <span style="position: absolute; right: 0"><span>Go to:</span> <span>&nbsp;</span> <a href=#Hues>Hues</a> <span>&nbsp;</span> <a href=#Grays>Grays</a></span></div><br><hr></body></html>`;
      private inputSource: string;               /* The input file path or Url */
      private outputPath: string;                /* The output directory for the files */
      private outputName: string;                /* The output file name */
      private totalColors: number                /* The total number of colors created */
      private hueColors: PaletteColors[] = [];   /* Contains all Hue based colors */
      private grayColors: PaletteColors[] = [];  /* Contains all gray based colors */

      /**
       * @constructor
       * @description Sets the input file or url and the output file name (if provided)
       * @param {string} source     - The source file/url parsed for color values
       * @param {string} outputPath - The path to save the output files
       * @param {string} name       - The provided name for the generated output files
       */
      constructor(source: string, outputPath: string, name: string) {
         this.inputSource = source ? source : 'N/A';
         this.outputPath = outputPath;
         this.outputName = name
            ? name
            : `Color Seek - ${Helpers.getMilliseconds(6)}`;
      }

      /**
       * @public 
       * @function
       * @summary Build HTML Output
       * @description Creates the color palette Html file. Sorts the color swatches by 'Luminosity'
       * @param {string} searchText - The text to parse for colors values
       * @returns {string[]} An array of hexadecimal color values
       */
      public buildHtmlOutput(searchText: string): string[] {
         let hexColors = [...new Set([
            ...this.parseHexColors(searchText),
            ...this.parseHSLColors(searchText),
            ...this.parseRGBColors(searchText)]
            .map(hc => hc.valueOf().toUpperCase()).sort())];

         this.totalColors = hexColors.length;

         //- Map each hex color into a PaletteColors object
         hexColors.map((h: string, i: number, a: string[]) => {
            let pColor = new PaletteColors();
            pColor.createColorFormats(h.valueOf());
            this.hueColors.push(pColor);
         });

         //- Find 'Grays' (R,G,B values within +- 5%) and separate them
         this.hueColors.map((h, i, a) => {
            //- Get the Red hi-low range 
            let pct = h.RGB[0] * .05;
            const redMin = h.Red - pct;
            const redMax = h.Red + pct;

            //- Determine if both green and blue are within red's range
            const isG = Helpers.between(redMin, redMax, h.Green);
            const isB = Helpers.between(redMin, redMax, h.Blue);

            if(isG && isB) {
               this.grayColors.push(h);
            }
         });

         //- Remove the Gray colors from the Hue array
         this.hueColors = this.hueColors.filter((el) => !this.grayColors.includes(el));

         //- Sort by Hue
         let hueSpectrum = '';

         this.hueColors
            .sort((a, b) => {
               return b.Hue - a.Hue;
            }).map((v, i, a) => {
               hueSpectrum += `
                  <a href="#${v.Hex}" onclick="colorTarget('${v.Hex}')">
                     <div alt="${v.Hex}" class="strip" style="background-color:${v.Hex};">
                        <span class="tooltip"
                              style="border: 4px solid ${v.Hex};">${v.Hex}</span>
                     </div>
                  </a>\n`;
            });

         //- Sort Grays by Luminosity (light to dark)
         let graySpectrum = '';

         this.grayColors
            .sort((a, b) => {
               return b.Luminosity - a.Luminosity;
            })
            .map((v, i, a) => {
               graySpectrum += `
                  <a href="#${v.Hex}" onclick="colorTarget('${v.Hex}')">
                     <div alt="${v.Hex}" class="strip" style="background-color:${v.Hex};">
                        <span class="tooltip"
                           style="border: 4px solid ${v.Hex};">${v.Hex}</span>
                     </div>
                  </a>\n`;
            });
                 
         const fileName = `${this.outputPath}/${this.outputName}.html`;

         //- Write color information into placeholders
         this.htmlTemplate = this.htmlTemplate
            .replace('{name}', this.outputName)
            .replace('{source}', this.inputSource)
            .replace('{hue_spectrum}', hueSpectrum)
            .replace('{gray_spectrum}', graySpectrum)
            .replace('{total_colors}', this.totalColors.toString())
            .replace('{hue_colors}', this.createSwatches(this.hueColors))
            .replace('{gray_colors}', this.createSwatches(this.grayColors));

         //- Write out Html palette and open in browser
         fs.writeFileSync(fileName, this.htmlTemplate);
         opn(fileName);

         return hexColors;
      }

      /**
       * @private
       * @function
       * @description Generates the color palettes as Html
       * @param {Array<PaletteColors>} paletteColors - An array of PaletteColors objects
       * @returns {string} Html string containing the color swatches
       */
      private createSwatches(paletteColors: Array<PaletteColors>): string {
         let swatches = '';

         paletteColors.forEach((pc) => {

            //- Based on the current Light value (part of HSL), 
            //- determine the offset Light value for the text color.
            let pcl = pc.Light;

            //TODO: Clean up this formula
            //- Determine lightness offset for text in swatches
            if(pcl <= 10) {
               pcl = 35;
            } else if(pcl <= 25) {
               pcl = 50;
            } else if(pcl <= 40) {
               pcl = pcl + 30;
            } else if(pcl <= 70) {
               pcl = pcl - 20;
            } else {
               pcl = pcl - 50;
            }

            //- Set the text on the color swatch either brighter or dimmer for readability
            let textLight = pcl;
            let textHSL = `hsl(${pc.Hue},${pc.Saturation}%,${textLight}%);`;
            let swatch = `
                <div id="${pc.Hex}" class="swatch" 
                      style="background-color:${pc.Hex};
                            border: 1px solid ${textHSL}">
                    <div class="header">
                      <div class="left">
                        <div style="color:${textHSL}">HEX</div>
                        <div style="color:${textHSL}">RGB</div>
                        <div style="color:${textHSL}">HSL</div>
                        <div style="color:${textHSL}">CMYK</div>
                      </div>
                      <div class="right">
                          <div style="color:${textHSL}">${pc.Hex}</div>
                          <div style="color:${textHSL}">${pc.RGB}</div>
                          <div style="color:${textHSL}">${pc.HSL}</div>
                          <div style="color:${textHSL}">${pc.CMYK}</div>
                      </div>
                  </div>
                </div>\n`;

            swatches += swatch;
         });

         return swatches;
      }

      /**
       * @private
       * @function
       * @description Finds RGB color values (ex: rgb(255,255,255) in current search text
       * @param {string} searchText - The text to parse
       * @returns {string[]} An Array<string> containing the parsed hex colors
       */
      private parseHSLColors(searchText: string): string[] {
         let hexColors: string[] = [];
         let h: any;
         let s: any;
         let l: any;

         searchText = searchText.replace(new RegExp('hsla', 'g'), 'hsl');

         //- Find all '#' positions (start of hex color value)
         const matches = this.getIndicesOf('hsl(', searchText, false);

         for(let x = 0; x < matches.length; x++) {
            //- Get Search range
            const str = matches[x] + 4;
            const end = matches[x] + 20;
            let hsl = searchText.substring(str, end);

            //- split into array and get each value
            const arrHSL = hsl.substring(0, hsl.indexOf(')')).split(',');
            [h, s, l] = arrHSL;
            const colorConv = new ColorConversion();

            //- Convert to RGB
            const arrRGB = colorConv.HslToRgb(h, s, l);

            //- Convert RGB -> Hex
            const hex = colorConv.RgbToHex(arrRGB[0], arrRGB[1], arrRGB[2])
            hexColors.push('#' + hex);
         }

         return [
            ...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())
         ];
      }

      /**
       * @private
       * @function
       * @description Finds RGB color values (ex: rgb(255,255,255) in current search text
       * @param {string} searchText - The text to parse
       * @returns {string[]} An Array<string> containing the parsed hex colors
       */
      private parseRGBColors(searchText: string): string[] {
         let hexColors: string[] = [];
         let r: any;
         let g: any;
         let b: any;

         searchText = searchText.replace(new RegExp('rgba', 'g'), 'rgb');

         //- Find all '#' positions (start of hex color value)
         const matches = this.getIndicesOf('rgb(', searchText, false);

         for(let x = 0; x < matches.length; x++) {
            //- Get Search range
            const str = matches[x] + 4;
            const end = matches[x] + 20;
            let rgb = searchText.substring(str, end);
            const arrRGB = rgb.substring(0, rgb.indexOf(')')).split(',');
            [r, g, b] = arrRGB;
            const hex = new ColorConversion().RgbToHex(r, g, b);
            hexColors.push('#' + hex);
         }

         return [
            ...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())
         ];
      }

      /**
       * @private
       * @function
       * @description Finds hex color values (ex: #FFFFFF) in current search text
       * @param {string} searchText - The text to parse
       * @returns {string[]} An Array<string> containing the parsed hex colors
       */
      private parseHexColors(searchText: string): string[] {
         let hexColors: string[] = [];

         //- Find all '#' positions (start of hex color value)
         const matches = this.getIndicesOf('#', searchText, false);

         for(let x = 0; x < matches.length; x++) {
            try { //- Keep going on Error so all colors are processed
               //- Get Search range
               const str = matches[x] + 1;
               const end = matches[x] + 7;

               //- Possible hex lengths include:
               //-    - #FFFFFF
               //-    - #FFF
               const hexColor6 = searchText.substring(str, end);
               const hexColor3 = hexColor6.substring(0, 3);

               //- Attempt to validate a six digit hex value. If false, try a three digit hex value.
               //- If three digits is successful then convert it to six digits.
               if(/^[0-9A-F]{6}$/i.test(hexColor6)) {
                  hexColors.push('#' + hexColor6);
               } else if(/^[0-9A-F]{3}$/i.test(hexColor3)) {
                  const hexColorChars = hexColor3.split('');
                  let hexVal = '';
                  hexColorChars.forEach((h) => hexVal += h + h);
                  hexColors.push('#' + hexVal);
               }
            } catch(e) {
               Helpers.outputError(e, true);
            }
         }

         return [
            ...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())
         ];
      }

      /**
       * @private
       * @function
       * @description Finds the indexes of a Search value in the provided string
       * @param {string} SearchStr      - The value to Search for within the given string
       * @param {string} str            - The string to Search
       * @param {boolean} caseSensitive - True/False for case sensitivity
       * @returns {number[]} An Array<number> containing the position indexes of the hex color values
       */
      private getIndicesOf(
         SearchStr: string,
         str: string,
         caseSensitive: boolean = true
      ): Array<number> {
         const SearchStrLen = SearchStr.length;

         if(SearchStrLen === 0) {
            return [];
         }

         let startIndex = 0;
         let index = 0;
         let indices = [];

         if(!caseSensitive) {
            str = str.toLowerCase();
            SearchStr = SearchStr.toLowerCase();
         }

         while((index = str.indexOf(SearchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + SearchStrLen;
         }

         return indices;
      }
   }

   /**
    * @public
    * @class
    * @classdesc Contains the color formats used by the color palette
    * @memberof Palette
    */
   export class PaletteColors {
      /**
       * @summary Color Format
       * @description Represents four color values between 0-100%: Cyan, Magenta, Yellow, and Key(Black)
       * @type {Array<string>}
       */
      public CMYK: number[] = [0, 0, 0, 0];
      /**
       * @summary Color Format
       * @description A string combining three (3) hexadecimal values (Ex: #1188FF) representing red (11),
       * @type {string}
       */
      public Hex: string = '';
      /**
       * @summary Color Format
       * @description Represents three values; Hue (0-359), Saturation (0-100%), and Lightness (100%)
       * @type {Array<number>}
       */
      public HSL: number[] = [0, 0, 0];
      /**
       * @summary Color Format
       * @description Represents three colors values between 0-255: Red. Green, and Blue
       * @type {Array<number>}
       */
      public RGB: number[] = [0, 0, 0];
      /**
       * @summary Color Value
       * @description Red portion of the RGB color format
       * @type {number}
       */
      public Red: number = 0;
      /**
       * @summary Color Value
       * @description Green portion of the RGB color format
       * @type {number}
       */
      public Green: number = 0;
      /**
       * @summary Color Value
       * @description Blue portion of the RGB color format
       * @type {number}
       */
      public Blue: number = 0;
      /**
       * @summary Color Formula
       * @description Derived value of the RGB color format used to order colors by luminance. The value is a product of the
       * formula: Math.sqrt(.241 * Red + .691 * Green + .068 * Blue)
       * @type {number}
       */
      public Luminosity: number = 0;
      /**
       * @summary Color Value
       * @description Hue portion of the HSL color format
       * @type {number}
       */
      public Hue: number = 0;
      /**
       * @summary Color Value
       * @description Saturation portion of the HSL color format
       * @type {number}
       */
      public Saturation: number = 0;
      /**
       * @summary Color Value 
       * @description Light portion of the HSL color format
       * @type {number}
       */
      public Light: number = 0;
      /**
       * @summary Color Value
       * @description Cyan portion of the CMYK color format
       * @type {number}
       */
      public Cyan: number = 0;
      /**
       * @summary Color Value 
       * @description Magenta portion of the CMYK color format
       * @type {number}
       */
      public Magenta: number = 0;
      /**
       * @summary Color Value
       * @description Yellow portion of the CMYK color format
       * @type {number}
       */
      public Yellow: number = 0;
      /**
       * @summary Color Value
       * @description Black portion of the CMYK color format
       * @type {number}
       */
      public Black: number = 0;

      /**
       * @constructor
       * @description Default Constructor
       */
      constructor() { }

      /**
       * @public 
       * @function
       * @summary Color Format Creation
       * @description Creates the color formats (Hexadecimal, RGB, HSL, CMYK) used to create the color palette and 
       *              assigns the constituent properties of each format.
       * @param {string} hexValue - Value used to create the color formats
       */
      public createColorFormats(hexValue: string): void {
         if(RegExp(/^#[0-9A-F]{6}$/i).test(hexValue)) { //- Valid Hexadecimal

            const ColorConvert = new ColorConversion();

            this.Hex = hexValue;

            //- Assign RGB and the individual properties
            this.RGB = ColorConvert.HexToRgb(hexValue.substring(1));
            [this.Red, this.Green, this.Blue] = this.RGB;

            //- Assign CMYK and the individual properties
            this.CMYK = ColorConvert.RgbToCmyk(this.Red, this.Green, this.Blue);
            [this.Cyan, this.Magenta, this.Yellow, this.Black] = this.CMYK;

            //- Assign HSL and the individual properties
            this.HSL = ColorConvert.RgbToHsl(this.Red, this.Green, this.Blue);
            [this.Hue, this.Saturation, this.Light] = this.HSL;

            //- Create Luminosity. The magic numbers correspond to how the human eye perceives RGB
            this.Luminosity = Math.sqrt(.241 * this.Red + .691 * this.Green + .068 * this.Blue);
         } else {
            Helpers.outputError(new Error(`Invalid Hex value ${hexValue}`));
         }
      }
   }
}
