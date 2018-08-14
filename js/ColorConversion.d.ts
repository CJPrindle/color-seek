export declare class ColorConversion {
    RGBtoHEX(r: number, g: number, b: number): string;
    HEXtoRGB(hex: string): number[];
    RGBtoBIN(r: number, g: number, b: number): string;
    BINtoRGB(bin: string): number[];
    RGBtoHSL(r: number, g: number, b: number): number[];
    HSLtoRGB(h: number, s: number, l: number): number[];
    RGBtoHSV(r: number, g: number, b: number): number[];
    HSVtoRGB(h: number, s: number, v: number): number[];
    CMYKtoRGB(c: number, m: number, y: number, k: number): number[];
    RGBtoCMYK(r: number, g: number, b: number): number[];
    round(value: any, decimals: any): number;
}
