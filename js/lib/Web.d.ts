/**
 * Contains classes pertaining to the web
 * @namespace
 */
export declare namespace Web {
    /**
     * public
     * @class
     * @classdesc Provides access to HTML and/or CSS files to parse for color values
     * @memberof Web
     */
    class Http {
        /**
         * Default Constructor
         * @constructor
         */
        constructor();
        /**
        * Connects to the provided Url and parses the text data
        * @function
        * @param {string}  url       - The Url to parse
        * @param {Function} callback - The callback function for further processing
        */
        getUrlData(url: string, callback: Function): Promise<any>;
    }
}
