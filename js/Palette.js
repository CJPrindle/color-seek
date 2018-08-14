"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const fs = require("fs");
const opn = require("opn");
const Helpers_1 = require("./Helpers");
const ColorConversion_1 = require("./ColorConversion");
/**
  * Contains classes related to the parsing of provided data
  * @namespace
  */
var Palette;
(function (Palette) {
    /**
     * @class
     * @classdesc Contains methods for building the color palette
    */
    class PaletteBuilder {
        /**
         * Sets the input file or url and the output file name (if provided)
         * @constructor
         * @param {string} source - The source file/url parsed for color values
         * @param {string} name   - The provided name for the generated output files
        */
        constructor(source, name) {
            this.paletteColors = [];
            this.inputSource = (source) ? source : 'N/A';
            this.outputName = (name) ? name : `Color Seek - ${Helpers_1.Helpers.getMilliseconds(6)}`;
        }
        /**
         * Creates the color palette Html file
         * @function
         * @param {string} searchText - The text to parse for colors values
        */
        buildHtmlOutput(searchText) {
            try {
                let hexColors = this.parseHexColors(searchText);
                hexColors.map((hc, idx, arr) => {
                    let pColor = new PaletteColor();
                    pColor.setHex(hc.valueOf());
                    this.paletteColors.push(pColor);
                });
                let html = fs.readFileSync('template.html').toString();
                let thumbnails = '';
                const fileName = `${this.outputName.trim().replace(new RegExp(' ', 'g'), '')}.html`;
                for (let x = 0; x < this.paletteColors.length; x++) {
                    let thumbnail = `
               <div class="box"> 
                  <div class="header">
                      <div class="label">hex :&nbsp;&nbsp;<b class="color">${this.paletteColors[x].Hex}</b></div> 
                      <div class="label">rgba:&nbsp;&nbsp;<b class="color">${this.paletteColors[x].RGB}</b></div>
                      <div class="label">hsla:&nbsp;&nbsp;<b class="color">${this.paletteColors[x].HSL}</b></div>
                  </div>
                  <div class="thumbnail" style="background-color:${hexColors[x]}">&#160;</div>
                  <div class="header">
                     <div class="label">cmyk :&nbsp;&nbsp;<b class="color">${this.paletteColors[x].CMYK}</b></div> 
                     <div class="label">hsv :&nbsp;&nbsp;<b class="color">${this.paletteColors[x].HSV}</b></div>
                  </div>
               </div>\n`;
                    thumbnails += thumbnail;
                }
                html = html
                    .replace('{name}', this.outputName)
                    .replace('{source}', this.inputSource)
                    .replace('{colors}', thumbnails);
                fs.writeFileSync(fileName, html.toString());
                opn(fileName);
            }
            catch (e) {
                Helpers_1.Helpers.outputError(e);
            }
        }
        /**
         * Finds hex color values (ex: #FFFFFF) in current search text
         * @function
         * @param {string} searchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
        */
        parseHexColors(searchText) {
            let hexColors = [];
            //- Find all '#' positions (start of hex color value)
            const searchAreas = this.getIndicesOf('#', searchText, false);
            for (let x = 0; x < searchAreas.length; x++) {
                try {
                    //- Get search range
                    const str = searchAreas[x] + 1;
                    const end = searchAreas[x] + 7;
                    //- Check for valid hex value
                    let hexColor = searchText.substring(str, end);
                    //- Convert any three letter hex value to six letters
                    if ((hexColor[0] == hexColor[1]) && (hexColor[1] == hexColor[2])) {
                        hexColor = `${hexColor.substring(0, 3)}${hexColor.substring(0, 3)}`;
                    }
                    const isHexColor = parseInt(hexColor, 16).toString();
                    //- Add  to color array
                    if (isHexColor != 'NaN') {
                        hexColors.push('#' + hexColor);
                    }
                }
                catch (e) {
                    Helpers_1.Helpers.outputError(e);
                }
            }
            return [...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())];
        }
        /**
         * Finds the indexes of a search value in the provided string
         * @function
         * @param {string} searchStr - The value to search for within the given string
         * @param {string} str - The string to search
         * @param {boolean} caseSensitive - True/False for case sensitivity
         * @returns {number[]} An Array<number> containing the position indexes of the hex color values
        */
        getIndicesOf(searchStr, str, caseSensitive = true) {
            const searchStrLen = searchStr.length;
            if (searchStrLen === 0) {
                return [];
            }
            let startIndex = 0;
            let index = 0;
            let indices = [];
            if (!caseSensitive) {
                str = str.toLowerCase();
                searchStr = searchStr.toLowerCase();
            }
            while ((index = str.indexOf(searchStr, startIndex)) > -1) {
                indices.push(index);
                startIndex = index + searchStrLen;
            }
            return indices;
        }
    }
    Palette.PaletteBuilder = PaletteBuilder;
    /**
     * @class
     * @classdesc Contains the color formats used by the color palette
    */
    class PaletteColor {
        constructor() {
            this.CMYK = [0, 0, 0, 0];
            this.Hex = '';
            this.HSL = [0, 0, 0];
            this.HSV = [0, 0, 0];
            this.RGB = [0, 0, 0];
            this.Red = this.RGB[0];
            this.Green = this.RGB[1];
            this.Blue = this.RGB[2];
            this.Hue = this.HSL[0];
            this.Saturation = this.HSL[1];
            this.Light = this.HSL[2];
            this.Value = this.HSV[2];
            this.Cyan = this.CMYK[0];
            this.Magenta = this.CMYK[1];
            this.Yellow = this.CMYK[2];
            this.Black = this.CMYK[3];
        }
        setHex(hexValue) {
            if (RegExp(/^#[0-9A-F]{6}$/i).test(hexValue)) {
                this.Hex = hexValue.toUpperCase();
                const ColorConvert = new ColorConversion_1.ColorConversion();
                this.RGB = ColorConvert.HexToRgb(this.Hex.substring(1));
                this.HSL = ColorConvert.RgbToHsl(this.RGB[0], this.RGB[1], this.RGB[2]);
                this.CMYK = ColorConvert.RgbToCmyk(this.RGB[0], this.RGB[1], this.RGB[2]);
                this.HSV = ColorConvert.RgbToHsv(this.RGB[0], this.RGB[1], this.RGB[2]);
            }
            else {
                Helpers_1.Helpers.outputError(new Error(`Invalid Hex value ${hexValue}`));
            }
        }
    }
    Palette.PaletteColor = PaletteColor;
})(Palette = exports.Palette || (exports.Palette = {}));
//# sourceMappingURL=Palette.js.map