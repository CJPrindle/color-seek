/**
 * @class
 * @classdesc Represents all valid console switches
*/
export declare class Command {
    /** The valid switch for this command */
    Argument: string;
    /** A description of the command */
    Description: string;
    /**
     * Sets the commands for the application
     * @param argument - The valid switch value(s) for this command
     * @param description - A description of the command
    */
    constructor(argument: any, description: any);
}
