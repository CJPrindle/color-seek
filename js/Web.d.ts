/**
 * @namespace
 * @name - Web
 * @description - Contains classes for web access
 */
export declare namespace Web {
    /**
     * @class
     * @name - Http
     * @classdesc - Provides access to HTML and/or CSS files to parse for color values
     * */
    class Http {
        /**
         * @function
         * @name - getUrlData
         * @param {string} - The Url to parse
         * @param {Function} - The callback function for further processing
         */
        getUrlData(url: string, callback: any): Promise<void>;
    }
}
