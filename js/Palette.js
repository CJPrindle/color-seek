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
    Palette.namedColors = [
        { key: "Black", value: "#000000" },
        { key: "Navy", value: "#000080" },
        { key: "Darkblue", value: "#00008B" },
        { key: "Mediumblue", value: "#0000CD" },
        { key: "Blue", value: "#0000FF" },
        { key: "Darkgreen", value: "#006400" },
        { key: "Green", value: "#008000" },
        { key: "Teal", value: "#008080" },
        { key: "Darkcyan", value: "#008B8B" },
        { key: "Deepskyblue", value: "#00BFFF" },
        { key: "Darkturquoise", value: "#00CED1" },
        { key: "Mediumspringgreen", value: "#00FA9A" },
        { key: "Lime", value: "#00FF00" },
        { key: "Springgreen", value: "#00FF7F" },
        { key: "Aqua", value: "#00FFFF" },
        { key: "Cyan", value: "#00FFFF" },
        { key: "Midnightblue", value: "#191970" },
        { key: "Dodgerblue", value: "#1E90FF" },
        { key: "Lightseagreen", value: "#20B2AA" },
        { key: "Forestgreen", value: "#228B22" },
        { key: "Seagreen", value: "#2E8B57" },
        { key: "Darkslategray", value: "#2F4F4F" },
        { key: "Limegreen", value: "#32CD32" },
        { key: "Mediumseagreen", value: "#3CB371" },
        { key: "Turquoise", value: "#40E0D0" },
        { key: "Royalblue", value: "#4169E1" },
        { key: "Steelblue", value: "#4682B4" },
        { key: "Darkslateblue", value: "#483D8B" },
        { key: "Mediumturquoise", value: "#48D1CC" },
        { key: "Indigo", value: "#4B0082" },
        { key: "Darkolivegreen", value: "#556B2F" },
        { key: "Cadetblue", value: "#5F9EA0" },
        { key: "Cornflowerblue", value: "#6495ED" },
        { key: "Mediumaquamarine", value: "#66CDAA" },
        { key: "Dimgray", value: "#696969" },
        { key: "Slateblue", value: "#6A5ACD" },
        { key: "Olivedrab", value: "#6B8E23" },
        { key: "Slategray", value: "#708090" },
        { key: "Lightslategray", value: "#778899" },
        { key: "Mediumslateblue", value: "#7B68EE" },
        { key: "Lawngreen", value: "#7CFC00" },
        { key: "Chartreuse", value: "#7FFF00" },
        { key: "Aquamarine", value: "#7FFFD4" },
        { key: "Maroon", value: "#800000" },
        { key: "Purple", value: "#800080" },
        { key: "Olive", value: "#808000" },
        { key: "Skyblue", value: "#87CEEB" },
        { key: "Lightskyblue", value: "#87CEFA" },
        { key: "Blueviolet", value: "#8A2BE2" },
        { key: "Darkred", value: "#8B0000" },
        { key: "Darkmagenta", value: "#8B008B" },
        { key: "Saddlebrown", value: "#8B4513" },
        { key: "Darkseagreen", value: "#8FBC8F" },
        { key: "Lightgreen", value: "#90EE90" },
        { key: "Mediumpurple", value: "#9370DB" },
        { key: "Darkviolet", value: "#9400D3" },
        { key: "Palegreen", value: "#98FB98" },
        { key: "Darkorchid", value: "#9932CC" },
        { key: "Yellowgreen", value: "#9ACD32" },
        { key: "Sienna", value: "#A0522D" },
        { key: "Brown", value: "#A52A2A" },
        { key: "Darkgray", value: "#A9A9A9" },
        { key: "Lightblue", value: "#ADD8E6" },
        { key: "Greenyellow", value: "#ADFF2F" },
        { key: "Paleturquoise", value: "#AFEEEE" },
        { key: "Lightsteelblue", value: "#B0C4DE" },
        { key: "Powderblue", value: "#B0E0E6" },
        { key: "Firebrick", value: "#B22222" },
        { key: "Darkgoldenrod", value: "#B8860B" },
        { key: "Mediumorchid", value: "#BA55D3" },
        { key: "Rosybrown", value: "#BC8F8F" },
        { key: "Darkkhaki", value: "#BDB76B" },
        { key: "Gray", value: "#BEBEBE" },
        { key: "Silver", value: "#C0C0C0" },
        { key: "Mediumvioletred", value: "#C71585" },
        { key: "Indianred", value: "#CD5C5C" },
        { key: "Peru", value: "#CD853F" },
        { key: "Chocolate", value: "#D2691E" },
        { key: "Tan", value: "#D2B48C" },
        { key: "Lightgrey", value: "#D3D3D3" },
        { key: "Thistle", value: "#D8BFD8" },
        { key: "Orchid", value: "#DA70D6" },
        { key: "Goldenrod", value: "#DAA520" },
        { key: "Palevioletred", value: "#DB7093" },
        { key: "Crimson", value: "#DC143C" },
        { key: "Gainsboro", value: "#DCDCDC" },
        { key: "Plum", value: "#DDA0DD" },
        { key: "Burlywood", value: "#DEB887" },
        { key: "Lightcyan", value: "#E0FFFF" },
        { key: "Lavender", value: "#E6E6FA" },
        { key: "Darksalmon", value: "#E9967A" },
        { key: "Violet", value: "#EE82EE" },
        { key: "Palegoldenrod", value: "#EEE8AA" },
        { key: "Lightcoral", value: "#F08080" },
        { key: "Khaki", value: "#F0D58C" },
        { key: "Aliceblue", value: "#F0F8FF" },
        { key: "Honeydew", value: "#F0FFF0" },
        { key: "Azure", value: "#F0FFFF" },
        { key: "Sandybrown", value: "#F4A460" },
        { key: "Wheat", value: "#F5DEB3" },
        { key: "Beige", value: "#F5F5DC" },
        { key: "Whitesmoke", value: "#F5F5F5" },
        { key: "Mintcream", value: "#F5FFFA" },
        { key: "Ghostwhite", value: "#F8F8FF" },
        { key: "Salmon", value: "#FA8072" },
        { key: "Antiquewhite", value: "#FAEBD7" },
        { key: "Linen", value: "#FAF0E6" },
        { key: "Lightgoldenrodyellow", value: "#FAFAD2" },
        { key: "Oldlace", value: "#FDF5E6" },
        { key: "Red", value: "#FF0000" },
        { key: "Fuchsia", value: "#FF00FF" },
        { key: "Magenta", value: "#FF00FF" },
        { key: "Deeppink", value: "#FF1493" },
        { key: "Orangered", value: "#FF4500" },
        { key: "Tomato", value: "#FF6347" },
        { key: "Hotpink", value: "#FF69B4" },
        { key: "Coral", value: "#FF7F50" },
        { key: "Darkorange", value: "#FF8C00" },
        { key: "Lightsalmon", value: "#FFA07A" },
        { key: "Orange", value: "#FFA500" },
        { key: "Lightpink", value: "#FFB6C1" },
        { key: "Pink", value: "#FFC0CB" },
        { key: "Gold", value: "#FFD700" },
        { key: "Peachpuff", value: "#FFDAB9" },
        { key: "Navajowhite", value: "#FFDEAD" },
        { key: "Moccasin", value: "#FFE4B5" },
        { key: "Bisque", value: "#FFE4C4" },
        { key: "Mistyrose", value: "#FFE4E1" },
        { key: "Blanchedalmond", value: "#FFEBCD" },
        { key: "Papayawhip", value: "#FFEFD5" },
        { key: "Lavenderblush", value: "#FFF0F5" },
        { key: "Seashell", value: "#FFF5EE" },
        { key: "Cornsilk", value: "#FFF8DC" },
        { key: "Lemonchiffon", value: "#FFFACD" },
        { key: "Floralwhite", value: "#FFFAF0" },
        { key: "Snow", value: "#FFFAFA" },
        { key: "Yellow", value: "#FFFF00" },
        { key: "Lightyellow", value: "#FFFFE0" },
        { key: "Ivory", value: "#FFFFF0" },
        { key: "White", value: "#FFFFFF" },
    ];
    /**
     * @public
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