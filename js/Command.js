"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * @classdesc Represents all valid console switches
*/
class Command {
    /**
     * Sets the commands for the application
     * @param argument - The valid switch value(s) for this command
     * @param description - A description of the command
    */
    constructor(argument, description) {
        this.Argument = argument;
        this.Description = description;
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map