export class ColorConversion {
   // R,G,B values to a hexadecimal color string
   RGBtoHEX(r: number, g: number, b: number) {
      const bin = r << 16 | g << 8 | b;

      return (
         function (h: string) {
            return new Array(7 - h.length).join("0") + h
         })(bin.toString(16).toUpperCase())
   }

   // hexadecimal color string to R,G,B
   HEXtoRGB(hex: string) {
      hex = hex.replace(/[^0-9a-f]/gi, '');
      const hexValue = parseInt(hex, 16);

      const r = hexValue >> 16;
      const g = hexValue >> 8 & 0xFF;
      const b = hexValue & 0xFF;

      return [r, g, b];
   }

   // R,G,B values to binary string
   RGBtoBIN(r: number, g: number, b: number) {
      const bin = r << 16 | g << 8 | b;
      return (
         function (h: string) {
            return new Array(25 - h.length).join("0") + h
         })(bin.toString(2))
   }

   // 24 bit binary color to R,G,B
   BINtoRGB(bin: string) {
      const pbin = parseInt(bin, 2);
      const r = pbin >> 16;
      const g = pbin >> 8 & 0xFF;
      const b = pbin & 0xFF;

      return [r, g, b];
   }

   // R,G,B values to H,S,L
   RGBtoHSL(r: number, g: number, b: number) {
      r /= 255;
      g /= 255;
      b /= 255;

      let h = 0;
      let s = 0;
      let l = 0;
      let d = 0;

      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);

      l = (max + min) / 2;

      if(max == min) {
         h = s = 0;
      } else {
         d = max - min;

         s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

         switch(max) {
            case r:
               h = (g - b) / d + (g < b ? 6 : 0);
               break;
            case g:
               h = (b - r) / d + 2;
               break;
            case b:
               h = (r - g) / d + 4;
               break;
         }

         h /= 6;
      }

      return [
         this.round(h * 360, 0),
         this.round(s * 100, 0),
         this.round(l * 100, 0)];
   }

   // H,S,L values to R,G,B
   HSLtoRGB(h: number, s: number, l: number) {
      let r = 0;
      let g = 0;
      let b = 0;
      let m = 0;
      let c = 0;
      let x = 0;
      
      h = Number(String(h).replace(/[^0-9\.]/gi, ''));
      s = Number(String(s).replace(/[^0-9\.]/gi, ''));
      l = Number(String(l).replace(/[^0-9\.]/gi, ''));
      
      if(!isFinite(h)) h = 0;
      if(!isFinite(s)) s = 0;
      if(!isFinite(l)) l = 0;

      h /= 60;
      
      if(h < 0) { 
          h = 6 - (-h % 6); 
      }
      
      h %= 6;
      s = Math.max(0, Math.min(1, s / 100));
      l = Math.max(0, Math.min(1, l / 100));
      
      c = (1 - Math.abs((2 * l) - 1)) * s;
      x = c * (1 - Math.abs((h % 2) - 1));
      
      if(h < 1) {
         r = c; 
         g = x; 
         b = 0;
      } else if(h < 2) {
         r = x; 
         g = c; 
         b = 0;
      } else if(h < 3) {
         r = 0; 
         g = c; 
         b = x;
      } else if(h < 4) {
         r = 0; 
         g = x;
         b = c;
      } else if(h < 5) {
         r = x; 
         g = 0;
         b = c;
      } else {
         r = c;
         g = 0;
         b = x;
      }

      m = l - c / 2;

      return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)];
   }

   RGBtoHSV(r: number, g: number, b: number) {
      r = r / 255;
      g = g / 255;
      b = b / 255;

      const minVal = Math.min(r, g, b);
      const maxVal = Math.max(r, g, b);
      const delta = maxVal - minVal;

      let h = 0;
      let s = 0;
      let v = maxVal;

      if(delta == 0) {
         h = 0;
         s = 0;
      } else {
         s = delta / maxVal;

         const del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
         const del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
         const del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

         if(r == maxVal) {
            h = del_B - del_G;
         } else if(g == maxVal) {
            h = (1 / 3) + del_R - del_B;
         } else if(b == maxVal) {
            h = (2 / 3) + del_G - del_R;
         }

         if(h < 0) { h += 1; }
         if(h > 1) { h -= 1; }
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      v = Math.round(v * 100);

      return [h, s, v];
   }

   HSVtoRGB(h: number, s: number, v: number) {
      h = h / 360;
      s = s / 100;
      v = v / 100;

      let r: number = 0;
      let g: number = 0;
      let b: number = 0;

      if(s == 0) {
         r = v * 255;
         g = v * 255;
         b = v * 255;
      } else {
         let var_h = h * 6;
         let var_i = Math.floor(var_h);
         
         let var_1 = v * (1 - s);
         let var_2 = v * (1 - s * (var_h - var_i));
         let var_3 = v * (1 - s * (1 - (var_h - var_i)));

         let var_r = 0;
         let var_g = 0;
         let var_b = 0;

         if(var_i == 0) {
            var_r = v;
            var_g = var_3;
            var_b = var_1;
         } else if(var_i == 1) {
            var_r = var_2;
            var_g = v;
            var_b = var_1;
         } else if(var_i == 2) {
             var_r = var_1; 
             var_g = v; 
             var_b = var_3;
         } else if(var_i == 3) { 
             var_r = var_1;
             var_g = var_2;
             var_b = v;
         } else if(var_i == 4) { 
             var_r = var_3;
             var_g = var_1;
             var_b = v;
         } else { 
             var_r = v; 
             var_g = var_1; 
             var_b = var_2;
         };

         r = Math.round(var_r * 255);
         g = Math.round(var_g * 255);
         b = Math.round(var_b * 255);
      }

      return [r, g, b];
   }

   CMYKtoRGB(c: number, m: number, y: number, k: number) {
      c = c / 100;
      m = m / 100;
      y = y / 100;
      k = k / 100;

      let r = 1 - Math.min(1, c * (1 - k) + k);
      let g = 1 - Math.min(1, m * (1 - k) + k);
      let b = 1 - Math.min(1, y * (1 - k) + k);

      return [
         Math.round(r * 255),
         Math.round(g * 255),
         Math.round(b * 255)];
   }

   RGBtoCMYK(r: number, g: number, b: number) {
      r = r / 255;
      g = g / 255;
      b = b / 255;

      let k = Math.min(1 - r, 1 - g, 1 - b);
      let c = (1 - r - k) / (1 - k);
      let m = (1 - g - k) / (1 - k);
      let y = (1 - b - k) / (1 - k);

      return [
         Math.round(c * 100),
         Math.round(m * 100),
         Math.round(y * 100),
         Math.round(k * 100)];
   }

   round(value: any, decimals: any) {
      return Number(Math.round(eval(value + 'e' + decimals)) + 'e-' + decimals);
   }
}

   //blendColors(c0: string, c1: string, p: number) {
   //   const f = parseInt(c0.slice(1), 16);
   //   const t = parseInt(c1.slice(1), 16);
   //   const R1 = f >> 16;
   //   const G1 = f >> 8 & 0x00FF;
   //   const B1 = f & 0x0000F;
   //   const R2 = t >> 16;
   //   const G2 = t >> 8 & 0x00FF;
   //   const B2 = t & 0x0000FF;

   //   return `#${
   //      (
   //         0x1000000
   //         + (Math.round((R2 - R1) * p) + R1)
   //         * 0x10000
   //         + (Math.round((G2 - G1) * p) + G1)
   //         * 0x100
   //         + (Math.round((B2 - B1) * p) + B1)
   //      ).toString(16).slice(1)}`;
   //}

   //RGBlightness(r, g, b) {
   //   return (0.2126 * r + 0.7152 * g + 0.0722 * b);
   //}

   //colorLuminance(hex, lum) {
   //   console.log('new luminance');
   //   // validate hex string
   //   hex = String(hex).replace(/[^0-9a-f]/gi, '');
   //   if(hex.length < 6) {
   //      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
   //   }
   //   lum = lum || 0;
   //   // convert to decimal and change luminosity
   //   var rgb = "#", c, i;
   //   for(i = 0; i < 3; i++) {
   //      c = parseInt(hex.substr(i * 2, 2), 16);
   //      if(Math.min(Math.max(0, c + (c * lum)), 255) < (lum * -100)) {
   //         lum = lum * -1;
   //      }
   //      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
   //      rgb += ("00" + c).substr(c.length);
   //   }
   //   console.log(rgb);
   //   return rgb;
   //}
