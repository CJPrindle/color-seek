# Color Seek #

Version 0.1 | [Full Documentation (API)](https://cjprindle.github.io/color-seek).

## Overview ##

**Color Seek** allows you to build a color palette from a source file or URL. The source is scanned for valid
CSS color values and the results are formatted, purged of duplicates, and then sorted to produce the 
_Color Palette_. The palette can then be transformed into several predefined file formats for use in your projects.
In addition, a HTML page is created which displays the palette as a grid of swatches, with the colors displaying 
their value in each CSS format.


![Readme Image 1](./img/readme-1.png)

`Example: HTML Color Palette`

---

### CSS Color Formats ###

CSS currently accepts three formats for color specification.

| Format    | Example                      | Description                                                    |
|-----------|------------------------------|----------------------------------------------------------------|
| Hex       | `#1188FF`                    | Hexadecimals of Red (11), Green (88), Blue (FF)                |
| RGB       | `rgb(32, 128, 255)`          | Range for Red (0-255), Green (0-255), Blue (0-255)             |
| HSL       | `hsl(359, 25%, 100%)`        | Range for Hue (0-359), Saturation (0-100%), Lightness (0-100%) |

#### CMYK ####

_CMYK_ is a proposed color format for CSS4. It is well known outside of CSS and has been in use
for many years in printing and graphic design. It is included on the HTML output and will be a color format option
when/if it is included in CSS.

#### Named Colors ####

This version **does not** parse named colors. It is on the list of enhancements.


### Output File Types ###

A color palette can be rendered into several formats simultaneously. Along with CSS, SASS and LESS are available 
as output options. You may also choose the Gimp Color Palette format as well. An HTML file is always generated 
automatically regardless of what other options as selected.

#### File Formats ####

Each of the formats below can be generated when creating a palette.

| File Type | Description           |
|-----------|-----------------------|
| CSS       | Cascading Style Sheet |
| GPL       | Gimp Color Palette    |
| LESS      | Less Style Sheet      |
| SCSS      | Sass Style Sheet      |

---

## Using Color Seek ##

### Command Line ###

All interaction with **Color Seek** is through the Command Line Interface (CLI). All valid commands and switches are available via the help display.

#### Help ####

'colorseek -h' or 'colorseek --help' displays the available commands:

| Command                 | Description                                          |
|-------------------------|------------------------------------------------------|
| -i, --input [PATH]      | *The source file or url to search for color values   |
| -o, --output [DIRECTORY]| The file(s) output directory                         |
| -n, --name              | The output file(s) name (_do not add extension_)     |
| --css                   | Create a CSS rendering of the color palette          |
| --gpl                   | Create a Gimp Palette rendering of the color palette |
| --less                  | Create a LESS rendering of the color palette         |
| --sass                  | Create a SASS rendering of the color palette         |

***Required**

---

When no output directory is specified the current directory will to used. If no output name is specified the input file
name will be used.

All file types can be rendered by adding the corresponding command switch. If no output type is given only the HTML 
file will be generated.

### Examples ###

The following examples demonstrate various options available with **Color Seek**. 

**NOTE**: An HTML rendition of the color palette is **always** included.

#### Create CSS with Hex Colors from a Local File Source #### 

    $ colorseek -i /c/docs/MonokaiSharp.json -n Monokai-Sharp --css

The outcome is a CSS file located in the **Color Seek** directory named _Monokai-Sharp.css_

(**NOTE**: The input file is a [Visual Studio Code](https://code.visualstudio.com) color theme exported
to a JSON file.)

![readme-2](./img/readme-2.png)

`Example: CSS Output with Hex Color Values`

---

#### Create SASS with RGB Colors from a URL Source ####


    $ colorseek -i https://material.io/static/m2/css/main.min.css -n "Material Theme" --sass --rgb

Using a URL is identical to a file. **Color Seek** figures out the input type automatically. The --sass command switch 
creates a file named _Material Theme.scss__

RGB or HSL color formats require a command switch (--rgb or --hsl).

**NOTE**: Double quotes are required for command line entries with one or more spaces.

#### Create Multiple File Formats in a Specified Directory ####


    $ colorseek -i https://material.io/static/m2/css/main.min.css -o c:\\docs -n "Material Styles" --css --sass --less --rgb

Multiple file types can be created by adding them to the command line. However, only one color format may be assigned.

The '-o' ('--output') command switch specifies the output directory for each file generated. All files will have the 
name applied via the -n (--name) command switch or use the input source name if none is provided.

