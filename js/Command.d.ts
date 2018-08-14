/**
 * @class
 * @classdesc - Represents all valid switches for ColorFinder
*/
export declare class Command {
    /** The valid switch for this command */
    Argument: string;
    /** A description of the command */
    Description: string;
    /**
     * Sets the commands for the application
     * @param argument - The valid switch for this command
     * @param description - A description of the command
    */
    constructor(argument: any, description: any);
}
