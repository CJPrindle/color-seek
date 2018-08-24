"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*! ***************************************************************************
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
     * @instance
     * @memberof Palette
     */
    Palette.namedColors = [
        { key: "Black", value: "#000000" },
        { key: "Navy", value: "#000080" },
        { key: "DarkBlue", value: "#00008B" },
        { key: "MediumBlue", value: "#0000CD" },
        { key: "Blue", value: "#0000FF" },
        { key: "DarkGreen", value: "#006400" },
        { key: "Green", value: "#008000" },
        { key: "Teal", value: "#008080" },
        { key: "DarkCyan", value: "#008B8B" },
        { key: "DeepSkyBlue", value: "#00BFFF" },
        { key: "DarkTurquoise", value: "#00CED1" },
        { key: "MediumSpringGreen", value: "#00FA9A" },
        { key: "Lime", value: "#00FF00" },
        { key: "SpringGreen", value: "#00FF7F" },
        { key: "Aqua", value: "#00FFFF" },
        { key: "Cyan", value: "#00FFFF" },
        { key: "MidnightBlue", value: "#191970" },
        { key: "DodgerBlue", value: "#1E90FF" },
        { key: "LightSeaGreen", value: "#20B2AA" },
        { key: "ForestGreen", value: "#228B22" },
        { key: "SeaGreen", value: "#2E8B57" },
        { key: "DarkSlateGray", value: "#2F4F4F" },
        { key: "LimeGreen", value: "#32CD32" },
        { key: "MediumSeaGreen", value: "#3CB371" },
        { key: "Turquoise", value: "#40E0D0" },
        { key: "RoyalBlue", value: "#4169E1" },
        { key: "SteelBlue", value: "#4682B4" },
        { key: "DarkSlateBlue", value: "#483D8B" },
        { key: "MediumTurquoise", value: "#48D1CC" },
        { key: "Indigo", value: "#4B0082" },
        { key: "DarkOliveGreen", value: "#556B2F" },
        { key: "CadetBlue", value: "#5F9EA0" },
        { key: "CornflowerBlue", value: "#6495ED" },
        { key: "MediumAquamarine", value: "#66CDAA" },
        { key: "DimGray", value: "#696969" },
        { key: "SlateBlue", value: "#6A5ACD" },
        { key: "OliveDrab", value: "#6B8E23" },
        { key: "SlateGray", value: "#708090" },
        { key: "LightSlateGray", value: "#778899" },
        { key: "MediumSlateBlue", value: "#7B68EE" },
        { key: "LawnGreen", value: "#7CFC00" },
        { key: "Chartreuse", value: "#7FFF00" },
        { key: "Aquamarine", value: "#7FFFD4" },
        { key: "Maroon", value: "#800000" },
        { key: "Purple", value: "#800080" },
        { key: "Olive", value: "#808000" },
        { key: "SkyBlue", value: "#87CEEB" },
        { key: "LightSkyBlue", value: "#87CEFA" },
        { key: "BlueViolet", value: "#8A2BE2" },
        { key: "DarkRed", value: "#8B0000" },
        { key: "DarkMagenta", value: "#8B008B" },
        { key: "SaddleBrown", value: "#8B4513" },
        { key: "DarkSeaGreen", value: "#8FBC8F" },
        { key: "LightGreen", value: "#90EE90" },
        { key: "MediumPurple", value: "#9370DB" },
        { key: "DarkViolet", value: "#9400D3" },
        { key: "PaleGreen", value: "#98FB98" },
        { key: "DarkOrchid", value: "#9932CC" },
        { key: "YellowGreen", value: "#9ACD32" },
        { key: "Sienna", value: "#A0522D" },
        { key: "Brown", value: "#A52A2A" },
        { key: "DarkGray", value: "#A9A9A9" },
        { key: "LightBlue", value: "#ADD8E6" },
        { key: "GreenYellow", value: "#ADFF2F" },
        { key: "PaleTurquoise", value: "#AFEEEE" },
        { key: "LightSteelBlue", value: "#B0C4DE" },
        { key: "PowderBlue", value: "#B0E0E6" },
        { key: "Firebrick", value: "#B22222" },
        { key: "DarkGoldenrod", value: "#B8860B" },
        { key: "MediumOrchid", value: "#BA55D3" },
        { key: "RosyBrown", value: "#BC8F8F" },
        { key: "DarkKhaki", value: "#BDB76B" },
        { key: "Gray", value: "#BEBEBE" },
        { key: "Silver", value: "#C0C0C0" },
        { key: "MediumVioletRed", value: "#C71585" },
        { key: "IndianRed", value: "#CD5C5C" },
        { key: "Peru", value: "#CD853F" },
        { key: "Chocolate", value: "#D2691E" },
        { key: "Tan", value: "#D2B48C" },
        { key: "LightGrey", value: "#D3D3D3" },
        { key: "Thistle", value: "#D8BFD8" },
        { key: "Orchid", value: "#DA70D6" },
        { key: "Goldenrod", value: "#DAA520" },
        { key: "PaleVioletRed", value: "#DB7093" },
        { key: "Crimson", value: "#DC143C" },
        { key: "Gainsboro", value: "#DCDCDC" },
        { key: "Plum", value: "#DDA0DD" },
        { key: "Burlywood", value: "#DEB887" },
        { key: "LightCyan", value: "#E0FFFF" },
        { key: "Lavender", value: "#E6E6FA" },
        { key: "DarkSalmon", value: "#E9967A" },
        { key: "Violet", value: "#EE82EE" },
        { key: "PaleGoldenrod", value: "#EEE8AA" },
        { key: "LightCoral", value: "#F08080" },
        { key: "Khaki", value: "#F0D58C" },
        { key: "AliceBlue", value: "#F0F8FF" },
        { key: "Honeydew", value: "#F0FFF0" },
        { key: "Azure", value: "#F0FFFF" },
        { key: "SandyBrown", value: "#F4A460" },
        { key: "Wheat", value: "#F5DEB3" },
        { key: "Beige", value: "#F5F5DC" },
        { key: "WhiteSmoke", value: "#F5F5F5" },
        { key: "MintCream", value: "#F5FFFA" },
        { key: "GhostWhite", value: "#F8F8FF" },
        { key: "Salmon", value: "#FA8072" },
        { key: "AntiqueWhite", value: "#FAEBD7" },
        { key: "Linen", value: "#FAF0E6" },
        { key: "LightGoldenrodYellow", value: "#FAFAD2" },
        { key: "OldLace", value: "#FDF5E6" },
        { key: "Red", value: "#FF0000" },
        { key: "Fuchsia", value: "#FF00FF" },
        { key: "Magenta", value: "#FF00FF" },
        { key: "DeepPink", value: "#FF1493" },
        { key: "OrangeRed", value: "#FF4500" },
        { key: "Tomato", value: "#FF6347" },
        { key: "HotPink", value: "#FF69B4" },
        { key: "Coral", value: "#FF7F50" },
        { key: "DarkOrange", value: "#FF8C00" },
        { key: "LightSalmon", value: "#FFA07A" },
        { key: "Orange", value: "#FFA500" },
        { key: "LightPink", value: "#FFB6C1" },
        { key: "Pink", value: "#FFC0CB" },
        { key: "Gold", value: "#FFD700" },
        { key: "PeachPuff", value: "#FFDAB9" },
        { key: "NavajoWhite", value: "#FFDEAD" },
        { key: "Moccasin", value: "#FFE4B5" },
        { key: "Bisque", value: "#FFE4C4" },
        { key: "MistyRose", value: "#FFE4E1" },
        { key: "BlanchedAlmond", value: "#FFEBCD" },
        { key: "PapayaWhip", value: "#FFEFD5" },
        { key: "LavenderBlush", value: "#FFF0F5" },
        { key: "Seashell", value: "#FFF5EE" },
        { key: "CornSilk", value: "#FFF8DC" },
        { key: "LemonChiffon", value: "#FFFACD" },
        { key: "FloralWhite", value: "#FFFAF0" },
        { key: "Snow", value: "#FFFAFA" },
        { key: "Yellow", value: "#FFFF00" },
        { key: "LightYellow", value: "#FFFFE0" },
        { key: "Ivory", value: "#FFFFF0" },
        { key: "White", value: "#FFFFFF" }
    ];
    /**
     * @public
     * @class
     * @classdesc Contains methods for building the color palette
     * @memberof Palette
     */
    class PaletteBuilder {
        /**
         * Sets the input file or url and the output file name (if provided)
         * @constructor
         * @param {string} source - The source file/url parsed for color values
         * @param {string} name   - The provided name for the generated output files
         */
        constructor(source, name) {
            this.htmlTemplate = `<html xmlns="http://www.w3.org/1999/xhtml"><title>Color Seek - Color Palette</title><style>*{color:#999;font-family:Armata,'Gill Sans MT','Arial Nova','Open Sans','Helvetica Neue','Lucida Grande','Segoe UI',sans-serif;font-size:12px}body{background-color:#222;padding:20px}a{color:#fff777}a:visited{color:green}.center{text-align:center}.extra-large-text{font-size:3em;font-weight:600}.large-text{font-size:1.75em;font-weight:600}.container{background:#e0ffff;border:2px solid #c6c6c6;display:flex;flex-wrap:wrap;position:relative;padding-bottom:5px}.container.hues{background-color:#333}.palette-header{background-color:#b3b3b3;border:2px solid #e9e9e9;color:#141414;display:block;font-size:1.2em;font-weight:500;height:25px;margin:15px 0 0 0;padding:5px;position:relative;text-shadow:1px 1px 1px #b1b1b1}.palette-header span{color:#141414;font-size:1.33em;font-weight:600}.spectrum{display:inline-flex;position:absolute;right:0;top:1px}.strip{display:block;height:32px;margin:0;max-height:32px;width:8px}.swatch{border-radius:10px;box-shadow:0 4px 8px 0 rgba(0,0,0,.8),0 6px 20px 0 rgba(0,0,0,.8);display:inline-grid;height:160px;margin:6px;text-align:center;width:160px}.header{border-radius:0 0 4px 4px;height:75px;margin-bottom:auto;margin-left:auto;margin-right:auto;margin-top:auto;position:relative;text-align:left;width:70%}.header div{font-family:'Source Code Pro','Courier Prime Code',Cousine,Inconsolata,'Global Monospace',monospace;font-size:11px}.left{bottom:0;left:0;position:absolute;top:5px}.left div{font-weight:700}.right{bottom:0;position:absolute;right:0;text-align:right;top:5px}.colorseek{text-shadow:1px 1px 2px #1688d9}.strip:hover .tooltip{display:block}.tooltip{background:rgba(128,128,128,.74);color:#fff;display:none;height:auto;margin-left:-100px;margin-top:-16px;padding:4px;position:absolute;width:auto;z-index:1000}</style><script language=ecmaScript>let previousThumbnail = null;let previousStyle = null; function colorTarget(hex) { const thumbnail = document.getElementById(hex); if(previousThumbnail !== null) { previousThumbnail.style = previousStyle; } previousThumbnail = thumbnail; previousStyle = thumbnail.style; thumbnail.style.border = '5px yellow solid';}</script></head><body><div class="extra-large-text center">{name} Palette</div><div><span class=large-text>{total_colors} Colors Generated by</span> <b class="colorseek large-text">Color Seek</b></div><br><div style="position: relative"><span><span class=large-text>Original Source:</span> <i><span class=large-text>{source}</span></i></span> <span style="position: absolute; right: 0"><span>Go to:</span> <span>&nbsp;</span> <a href=#Hues>Hues</a> <span>&nbsp;</span> <a href=#Grays>Grays</a></span></div><div class=palette-header><span id=Hues>Hues</span> <span class=spectrum>{hue_spectrum}</span></div><div class="container hues">{hue_colors}</div><div class=palette-header><span id=Grays>Grays</span> <span class=spectrum>{gray_spectrum}</span></div><div class=container>{gray_colors}</div><br><div style="position: relative"><span><span>Color Seek is available on</span> <a href=http://www.github.com/cjprindle>GitHub</a></span> <span style="position: absolute; right: 0"><span>Go to:</span> <span>&nbsp;</span> <a href=#Hues>Hues</a> <span>&nbsp;</span> <a href=#Grays>Grays</a></span></div><br><hr></body></html>`;
            this.hueColors = []; /** Contains all Hue based colors */
            this.grayColors = []; /** Contains all gray based colors */
            this.inputSource = source ? source : "N/A";
            this.outputName = name
                ? name
                : `Color Seek - ${Helpers_1.Helpers.getMilliseconds(6)}`;
        }
        /**
         * Creates the color palette Html file. Sorts the color swatches by 'Luminosity'
         * @function
         * @param {string} searchText - The text to parse for colors values
         * @returns {string[]} An array of hexadecimal color values
         */
        buildHtmlOutput(searchText) {
            let hexColors = [...new Set([
                    ...this.parseHexColors(searchText),
                    ...this.parseHSLColors(searchText),
                    ...this.parseRGBColors(searchText)
                ]
                    .map(hc => hc.valueOf().toUpperCase()).sort())];
            this.totalColors = hexColors.length;
            //- Map each hex color into a PaletteColors object
            hexColors.map((h, i, a) => {
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
                const isG = Helpers_1.Helpers.between(redMin, redMax, h.Green);
                const isB = Helpers_1.Helpers.between(redMin, redMax, h.Blue);
                if (isG && isB) {
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
            let graySpectrum = "";
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
            //- Open the template Html file
            //let html = fs.readFileSync("template.html").toString();
            //const fileName = `${this.outputName
            //   .trim()
            //   .replace(new RegExp(" ", "g"), "")}.html`;
            const fileName = `${this.outputName}.html`;
            //- Write color information into placeholders
            this.htmlTemplate = this.htmlTemplate
                .replace("{name}", this.outputName)
                .replace("{source}", this.inputSource)
                .replace("{hue_spectrum}", hueSpectrum)
                .replace("{gray_spectrum}", graySpectrum)
                .replace("{total_colors}", this.totalColors.toString())
                .replace("{hue_colors}", this.createSwatches(this.hueColors))
                .replace("{gray_colors}", this.createSwatches(this.grayColors));
            //- Write out Html palette and open in browser
            fs.writeFileSync(fileName, this.htmlTemplate);
            opn(fileName);
            return hexColors;
        }
        /**
         * Generates the color palettes as Html
         * @private
         * @function
         * @param {Array<PaletteColors>} paletteColors - An array of PaletteColors objects
         * @returns {string} Html string containing the color swatches
         */
        createSwatches(paletteColors) {
            let swatches = "";
            paletteColors.forEach((pc) => {
                //- Based on the current Light value (part of HSL), 
                //- determine the offset Light value for the text color.
                let pcl = pc.Light;
                //TODO: Clean up this formula
                //- Determine lightness offset for text in swatches
                if (pcl <= 10) {
                    pcl = 35;
                }
                else if (pcl <= 25) {
                    pcl = 50;
                }
                else if (pcl <= 40) {
                    pcl = pcl + 30;
                }
                else if (pcl <= 70) {
                    pcl = pcl - 20;
                }
                else {
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
         * Finds RGB color values (ex: rgb(255,255,255) in current search text
         * @function
         * @param {string} searchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
         */
        parseHSLColors(searchText) {
            let hexColors = [];
            let h;
            let s;
            let l;
            searchText = searchText.replace(new RegExp("hsla", "g"), "hsl");
            //- Find all '#' positions (start of hex color value)
            const matches = this.getIndicesOf("hsl(", searchText, false);
            for (let x = 0; x < matches.length; x++) {
                //- Get Search range
                const str = matches[x] + 4;
                const end = matches[x] + 20;
                let hsl = searchText.substring(str, end);
                //- split into array and get each value
                const arrHSL = hsl.substring(0, hsl.indexOf(')')).split(',');
                [h, s, l] = arrHSL;
                const colorConv = new ColorConversion_1.ColorConversion();
                //- Convert to RGB
                const arrRGB = colorConv.HslToRgb(h, s, l);
                //- Convert RGB -> Hex
                const hex = colorConv.RgbToHex(arrRGB[0], arrRGB[1], arrRGB[2]);
                hexColors.push('#' + hex);
            }
            return [
                ...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())
            ];
        }
        /**
         * Finds RGB color values (ex: rgb(255,255,255) in current search text
         * @function
         * @param {string} searchText - The text to parse
         * @returns {string[]} An Array<string> containing the parsed hex colors
         */
        parseRGBColors(searchText) {
            let hexColors = [];
            let r;
            let g;
            let b;
            searchText = searchText.replace(new RegExp("rgba", "g"), "rgb");
            //- Find all '#' positions (start of hex color value)
            const matches = this.getIndicesOf("rgb(", searchText, false);
            for (let x = 0; x < matches.length; x++) {
                //- Get Search range
                const str = matches[x] + 4;
                const end = matches[x] + 20;
                let rgb = searchText.substring(str, end);
                const arrRGB = rgb.substring(0, rgb.indexOf(')')).split(',');
                [r, g, b] = arrRGB;
                const hex = new ColorConversion_1.ColorConversion().RgbToHex(r, g, b);
                hexColors.push('#' + hex);
            }
            return [
                ...new Set(hexColors.map(hc => hc.valueOf().toUpperCase()).sort())
            ];
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
            const matches = this.getIndicesOf("#", searchText, false);
            for (let x = 0; x < matches.length; x++) {
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
                    if (/^[0-9A-F]{6}$/i.test(hexColor6)) {
                        hexColors.push("#" + hexColor6);
                    }
                    else if (/^[0-9A-F]{3}$/i.test(hexColor3)) {
                        const hexColorChars = hexColor3.split('');
                        let hexVal = '';
                        hexColorChars.forEach((h) => hexVal += h + h);
                        hexColors.push("#" + hexVal);
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
         * Finds the indexes of a Search value in the provided string
         * @function
         * @param {string} SearchStr      - The value to Search for within the given string
         * @param {string} str            - The string to Search
         * @param {boolean} caseSensitive - True/False for case sensitivity
         * @returns {number[]} An Array<number> containing the position indexes of the hex color values
         */
        getIndicesOf(SearchStr, str, caseSensitive = true) {
            const SearchStrLen = SearchStr.length;
            if (SearchStrLen === 0) {
                return [];
            }
            let startIndex = 0;
            let index = 0;
            let indices = [];
            if (!caseSensitive) {
                str = str.toLowerCase();
                SearchStr = SearchStr.toLowerCase();
            }
            while ((index = str.indexOf(SearchStr, startIndex)) > -1) {
                indices.push(index);
                startIndex = index + SearchStrLen;
            }
            return indices;
        }
    }
    Palette.PaletteBuilder = PaletteBuilder;
    /**
     * @public
     * @class
     * @classdesc Contains the color formats used by the color palette
     * @memberof Palette
     */
    class PaletteColors {
        /**
         * @constructor
         */
        constructor() {
            /**
             * @summary Color Format
             * @description Represents four color values between 0-100%: Cyan, Magenta, Yellow, and Key(Black)
             * @type {Array<string>}
             */
            this.CMYK = [0, 0, 0, 0];
            /**
             * @summary Color Format
             * @description A string combining three (3) hexadecimal values (Ex: #1188FF) representing red (11),
             * @type {string}
             */
            this.Hex = "";
            /**
             * @summary Color Format
             * @description Represents three values; Hue (0-359), Saturation (0-100%), and Lightness (100%)
             * @type {Array<number>}
             */
            this.HSL = [0, 0, 0];
            /**
             * @summary Color Format
             * @description Represents three colors values between 0-255: Red. Green, and Blue
             * @type {Array<number>}
             */
            this.RGB = [0, 0, 0];
            /**
             * @summary Color Value
             * @description Red portion of the RGB color format
             * @type {number}
             */
            this.Red = 0;
            /**
             * @summary Color Value
             * @description Green portion of the RGB color format
             * @type {number}
             */
            this.Green = 0;
            /**
             * @summary Color Value
             * @description Blue portion of the RGB color format
             * @type {number}
             */
            this.Blue = 0;
            /**
             * @summary Color Formula
             * @description Derived value of the RGB color format used to order colors by luminance. The value is a product of the
             * formula: Math.sqrt(.241 * Red + .691 * Green + .068 * Blue)
             * @type {number}
             */
            this.Luminosity = 0;
            /**
             * @summary Color Value
             * @description Hue portion of the HSL color format
             * @type {number}
             */
            this.Hue = 0;
            /**
             * @summary Color Value
             * @description Saturation portion of the HSL color format
             * @type {number}
             */
            this.Saturation = 0;
            /**
             * @summary Color Value
             * @description Light portion of the HSL color format
             * @type {number}
             */
            this.Light = 0;
            /**
             * @summary Color Value
             * @description Cyan portion of the CMYK color format
             * @type {number}
             */
            this.Cyan = 0;
            /**
             * @summary Color Value
             * @description Magenta portion of the CMYK color format
             * @type {number}
             */
            this.Magenta = 0;
            /**
             * @summary Color Value
             * @description Yellow portion of the CMYK color format
             * @type {number}
             */
            this.Yellow = 0;
            /**
             * @summary Color Value
             * @description Black portion of the CMYK color format
             * @type {number}
             */
            this.Black = 0;
        }
        /**
         * Creates the color formats (Hexadecimal, RGB, HSL, CMYK) used to create the color palette and assigns the
         * constituent properties of each format.
         * @param {string} hexValue - Value used to create the color formats
         */
        createColorFormats(hexValue) {
            if (RegExp(/^#[0-9A-F]{6}$/i).test(hexValue)) { //- Valid Hexadecimal
                const ColorConvert = new ColorConversion_1.ColorConversion();
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
            }
            else {
                Helpers_1.Helpers.outputError(new Error(`Invalid Hex value ${hexValue}`));
            }
        }
    }
    Palette.PaletteColors = PaletteColors;
})(Palette = exports.Palette || (exports.Palette = {}));
//# sourceMappingURL=Palette.js.map