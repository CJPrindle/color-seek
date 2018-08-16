# Color Seek - Version 1.0 #

## Overview ##

**Color Seek** allows you to build a color palette from an existing file or Url. The specified file path or Url is 
opened and parsed for valid CSS color values. The resulting list of color values is formatted & sorted with duplicates
removed to create the _**Color Palette**_.  The palette is written to each of the specified file formats along with 
and Html page presenting the color palette as a grid of color swatches showing all three valid Css color formats in
addition to CMYK, a possible future addition.

### CSS Color Formats ###

CSS currently accepts three formats for color specification.

| Format    | Example                      | Description                                                  |
|-----------|------------------------------|--------------------------------------------------------------|
| Hex       | `#1188FF`                    | Hexadecimals of Red (11), Green (88), Blue (FF)              |
| RGB       | `rgb(32, 128, 255)`          | Range for Red (0-255), Green (0-255), Blue (0-255)           |
| HSL       | `hsl(359, 25, 100)`          | Range for Hue (0-359), Saturation (0-100), Lightness (0-100) |

### Possible CSS4 Color Formats ###

Proposals exist for additional color formats in CSS4. One, CMYK, is well known outside of CSS and has many years of 
use in printing and graphic design. Therefore, we've decided to add it as a bit of future-proofing.

| Format    | Example                      | Description                                   |
|-----------|------------------------------|-----------------------------------------------|
| CMYK      | `cmyk(100, 25, 50, 75)`      | Range of Cyan, Magenta, Yellow, Black (0-100) |


#### Named Colors ####

Another naming convention for color values is a _named color_. There are currently 140 color names available ranging
from _black_ to white. Color Seek looks for named colors and converts them to hexadecimal. The value is ignored if
the hexadecimal already exists.

### Output File Types ###

A color palette can be rendered into several formats simultaneously. Css along with Sass and Less, the two most popular
stylesheet extension formats, are output options Less An HTML version is generated automatically.

#### File Formats ####

Each of the formats below can be generated when creating a palette.

| File Type | Description               |
|-----------|---------------------------|
| CSS       | _Cascading Style Sheet_   |
| GPL       | _Gimp Color Palette_      |
| LESS      | _Less Style Sheet_        |
| SCSS      | _Sass Style Sheet_        |

## Using Color Seek ##

### Command Line ###

All interaction with Color Seek is through the Command Line Interface (CLI). All valid commands and switches are 
available via the help display.

#### Help ####

Typing 'colorseek -h' or 'colorseek --help' displays the command listings.

| Command                           | Description                                                           |
|-----------------------------------------------------------------------------------------------------------|
|  -c, --parse-css                  | Flag indicating css files will be searched when parsing a web page    | 
| -o, --output [DIRECTORY]          | The directory where the output file will be created                   |
| -n, --name                        | The name to use when creating the output files (No extension)         |
| -i, --input [FILE_PATH] or [URL]  | The source file or html page to parse for color values                |
| --css                             | Create a CSS version of the color palette                             |
| --gimp                            | Create a GPL (Gimp PaletteBuilder file) version of the color palette  |
| --html                            | Create a HTML version of the color palette                            |
| --less                            | Create a LESS version of the color palette                            |
| --scss                            | Create a SASS version of the color palette                            |