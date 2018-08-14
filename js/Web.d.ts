/**
 * Contains classes concerns with web access
 * @namespace
 */
export declare namespace Web {
    /**
     * @class
     * @classdesc Provides access to HTML and/or CSS files to parse for color values
     * */
    class Http {
        /**
         * Connects to the provided Url and parses the text data
         * @function
         * @param {string}  url - The Url to parse
         * @param {Function} callback - The callback function for further processing
        */
        getUrlData(url: string, callback: Function): Promise<any>;
    }
}
