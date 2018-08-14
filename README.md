# Color Seek - Version 1.0 #

## File and Url Sources ##

**Color Seek** allows you to build a color palette from an existing file or 
Url. The specified file path or Url is opened and parsed for valid CSS color 
values. The resulting list of values is formatted & sorted while duplicates 
are removed to create the _**Color Palette**_.  The palette is written to each
of the specified file formats along with and Html page presenting the color
palette as a grid of color swatches showing all three valid Css color formats.

### CSS Color Values ###
CSS accepts three formats for color specification. All color in the palette
are displayed with each format.

| Format    | Example                      | Description                                                                                                   |
|-----------|------------------------------|---------------------------------------------------------------------------------------------------------------|
| Hex       | `#FFFFFF`                    | Hexadecimals of Red (FF), Green (FF), Blue (FF)                                                               |
| RGB[a]    | `rgba(255, 255, 255, 1.0)`   | Range for Red (0-255), Green (0-255), Blue (0-255), _Alpha_* (0.0-1.0)                                        |
| HSL[a]    | `hsla(359, 100%, 100%, 1.0)` | Range for Hue (0-359), Percentage for Saturation (0-100%), Lightness (0-100%), Range for  _Alpha_* (0.0-1.0)  |

_*Alpha_ is short for **Alpha Channel**, which specifies the opacity of the 
color. An alpha value of zero (0) is totally transparent and one (1) is totally
opaque. The Alpha Channel value is _optional_ with the default set to one (1).

## Output File Types ##
A color palette may be rendered into several formats simultaneously. An HTML 
version is generated automatically.

### File Formats ###
Each of the formats below can be generated when creating a palette.

| File Type | Description               |
|-----------|---------------------------|
| CSS       | _Cascading Style Sheet_   |
| GPL       | _Gimp Color Palette_      |
| LESS      | _Less Style Sheet_        |
| SCSS      | _Sass Style Sheet_        |
 