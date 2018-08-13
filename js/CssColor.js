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
/**
* @description Provides file read and write functionality
*/
class CssColor {
    constructor() {
        this.RGB = {
            R: 0, G: 0, B: 0
        };
        this.HSB = {
            H: 0, S: '', B: ''
        };
        this.Hex = '';
    }
    //constructor(r: number, g: number, b: number);
    //constructor(h: number, s: string, b: string);
    //constructor(hex: string, a?: number) {
    //   //let thisa = hex;
    //}
    setHexColor(hex) {
    }
    setHSBColor(h, s, b, a = 1) {
    }
    setRGBColor(r, g, b, a = 1) {
    }
    get Alpha() {
        return this.alpha;
    }
}
exports.CssColor = CssColor;
//# sourceMappingURL=CssColor.js.map