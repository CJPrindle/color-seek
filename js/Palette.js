"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.inputSource = source ? source : "N/A";
            this.outputName = name
                ? name
                : `Color Seek - ${Helpers_1.Helpers.getMilliseconds(6)}`;
        }
        /**
         * Creates the color palette Html file. Sorts the color swatches by 'Luminosity'
         * @function
         * @param {string} searchText - The text to parse for colors values
         */
        buildHtmlOutput(searchText) {
            try {
                let hexColors = this.parseHexColors(searchText);
                //- Map each hex color into a PaletteColor object
                hexColors.map((h, i, a) => {
                    let pColor = new PaletteColor();
                    pColor.createColorFormats(h.valueOf());
                    this.paletteColors.push(pColor);
                });
                //- Sort by 'Luminosity' property. Not ideal but better than Hue
                this.paletteColors.sort((a, b) => {
                    return (b.Luminosity) - (a.Luminosity);
                });
                let html = fs.readFileSync("template.html").toString();
                let thumbnails = "";
                const fileName = `${this.outputName
                    .trim()
                    .replace(new RegExp(" ", "g"), "")}.html`;
                this.paletteColors.forEach((pc) => {
                    //- Based on the current Light value (part of HSL), 
                    //- determine the offset Light value for the text color.
                    let pcl = pc.Light;
                    if (pcl <= 10) {
                        pcl = 35;
                    }
                    else if (pcl <= 25) {
                        pcl = 45;
                    }
                    else if (pcl <= 40) {
                        pcl = pcl + 25;
                    }
                    else if (pcl <= 70) {
                        pcl = pcl - 30;
                    }
                    else {
                        pcl = pcl - 40;
                    }
                    //- Set the text on the color swatch either brighter or dimmer for readability
                    let textLight = pcl;
                    let textHSL = `hsl(${pc.Hue},${pc.Saturation}%,${textLight}%);`;
                    let thumbnail = `
                  <div class="thumbnail" 
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
                    thumbnails += thumbnail;
                });
                html = html
                    .replace("{name}", this.outputName)
                    .replace("{source}", this.inputSource)
                    .replace("{colors}", thumbnails);
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
            const searchAreas = this.getIndicesOf("#", searchText, false);
            for (let x = 0; x < searchAreas.length; x++) {
                try {
                    //- Get search range
                    const str = searchAreas[x] + 1;
                    const end = searchAreas[x] + 7;
                    //- Check for valid hex value
                    let hexColor = searchText.substring(str, end);
                    //- Convert any three letter hex value to six letters
                    if (hexColor[0] == hexColor[1] && hexColor[1] == hexColor[2]) {
                        hexColor = `${hexColor.substring(0, 3)}${hexColor.substring(0, 3)}`;
                    }
                    const isHexColor = parseInt(hexColor, 16).toString();
                    //- Add  to color array
                    if (isHexColor != "NaN") {
                        hexColors.push("#" + hexColor);
                    }
                }
                catch (e) {
                    Helpers_1.Helpers.outputError(e, true);
                }
            }
            return [
                ...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())
            ];
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
     * @public
     * @class
     * @classdesc Contains the color formats used by the color palette
     */
    class PaletteColor {
        /**
         * @constructor
         */
        constructor() {
            this.CMYK = [0, 0, 0, 0];
            this.Hex = "";
            this.HSL = [0, 0, 0];
            this.RGB = [0, 0, 0];
            this.Red = 0;
            this.Green = 0;
            this.Blue = 0;
            this.Luminosity = 0; //- RGB derived
            this.Huenosity = 0; //- RGB derived
            this.Hue = 0;
            this.Saturation = 0;
            this.Light = 0;
            this.Cyan = 0;
            this.Magenta = 0;
            this.Yellow = 0;
            this.Black = 0;
        }
        /**
         * Creates the color formats (Hexadecimal, RGB, HSL, CMYK) used to create the color palette and assigns the
         * constituent properties of each format.
         * @param hexValue
         */
        createColorFormats(hexValue) {
            if (RegExp(/^#[0-9A-F]{6}$/i).test(hexValue)) { //- Valid Hexadecimal
                const ColorConvert = new ColorConversion_1.ColorConversion();
                this.Hex = hexValue;
                this.RGB = ColorConvert.HexToRgb(hexValue.substring(1));
                [this.Red, this.Green, this.Blue] = this.RGB;
                this.CMYK = ColorConvert.RgbToCmyk(this.Red, this.Green, this.Blue);
                [this.Cyan, this.Magenta, this.Yellow, this.Black] = this.CMYK;
                this.HSL = ColorConvert.RgbToHsl(this.Red, this.Green, this.Blue);
                [this.Hue, this.Saturation, this.Light] = this.HSL;
                //- The magic numbers correspond to how the human eye perceives RGB
                this.Luminosity = Math.sqrt(.241 * this.Red + .691 * this.Green + .068 * this.Blue);
            }
            else {
                Helpers_1.Helpers.outputError(new Error(`Invalid Hex value ${hexValue}`));
            }
        }
    }
    Palette.PaletteColor = PaletteColor;
})(Palette = exports.Palette || (exports.Palette = {}));
//# sourceMappingURL=Palette.js.map