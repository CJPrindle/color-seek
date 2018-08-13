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
/// <reference path="Parse.d.ts" />
/// <reference path="File.d.ts" />
/// <reference path="Web.d.ts" />
export {};
