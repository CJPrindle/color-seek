export declare namespace Parse {
    /**
    * @description Represents all valid switches for ColorFinder
    */
    class Command {
        Argument: string;
        Description: string;
        constructor(argument: any, description: any);
    }
    /**
    * @description Provides methods to find color values in provided text
    */
    class Palette {
        Source: string;
        constructor(source?: string);
        /**
        * @description Creates a Html file containing the color palette
        */
        buildHtmlOutput(searchText: string): void;
        /**
        * @description Finds hex color values (#FFFFFF) in current search text
        * @param searchText
        * @returns string[] containing found hex colors
        */
        private findColors;
        private getIndicesOf;
    }
}
