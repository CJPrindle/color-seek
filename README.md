# Color Seek - Version 1.0 #

## Overview ##

**Color Seek** allows you to build a color palette from an existing file or Url. The specified file path or Url is 
opened and parsed for valid CSS color values. The resulting list of color values is formatted & sorted with duplicates
removed to create the _**Color Palette**_.  The palette is written to each of the specified file formats along with 
and Html page presenting the color palette as a grid of color swatches showing all three valid Css color formats in
addition to CMYK, a possible future addition.

---

### CSS Color Formats ###

CSS currently accepts three formats for color specification.

| Format    | Example                      | Description                                                  |
|-----------|------------------------------|--------------------------------------------------------------|
| Hex       | `#1188FF`                    | Hexadecimals of Red (11), Green (88), Blue (FF)              |
| RGB       | `rgb(32, 128, 255)`          | Range for Red (0-255), Green (0-255), Blue (0-255)           |
| HSL       | `hsl(359, 25, 100)`          | Range for Hue (0-359), Saturation (0-100), Lightness (0-100) |

#### Possible CSS4 Color Formats ####

Proposals exist for additional color formats in CSS4. One, _CMYK_, is well known outside of CSS and has many years of 
use  printing and graphic design. Therefore, we've decided to add it as a bit of future-proofing.

| Format    | Example                      | Description                                   |
|-----------|------------------------------|-----------------------------------------------|
| CMYK      | `cmyk(100, 25, 50, 75)`      | Range of Cyan, Magenta, Yellow, Black (0-100) |


#### Named Colors ####

Another naming convention for color values is a _named color_. There are currently 140 color names available ranging
from _black_ to white. **Color Seek** looks for named colors and converts them to hexadecimal. The value is ignored if
the hexadecimal value already exists.

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

---

## Using Color Seek ##

### Command Line ###

All interaction with **Color Seek** is through the Command Line Interface (CLI). All valid commands and switches are 
available via the help display.

#### Help ####

Typing 'colorseek -h' or 'colorseek --help' displays the command listing:

| Command                           | Description                                          |
|------------------------------------------------------------------------------------------|
| -i, --input [PATH] _**required**_ | The source file or url to search for color values    |
| -o, --output [DIRECTORY]          | The output file(s) directory                         |
| -n, --name                        | The output file(s) name (no extension)               |
| --css                             | Create a Css rendering of the color palette          |
| --gpl                             | Create a Gimp Palette rendering of the color palette |
| --less                            | Create a Less rendering of the color palette         |
| --scss                            | Create a Sass rendering of the color palette         |

When no output directory is specified the current directory will to used. If no output name is specified the input file
name will be used.

All output file types can be rendered or, if desired, none. An Html file displaying each color as a swatch (card) is
_always_ created and shown upon success.

### Examples ###

The following command line examples provide a thorough demonstration of **Color Seek** functionality.


    x:~$ colorseek -i ~/json/dracula.json -n Dracula --scss


This palette is based on a popular text editor theme. No output directory, output name, or file renditions was
specified.The result a Html page only as shown:

![Dracula Color Palette]('../images/dracula-palette.png')