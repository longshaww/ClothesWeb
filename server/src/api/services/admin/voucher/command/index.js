class Command {
    constructor() {}
    async execute(command) {
        return await command.execute();
    }
}

module.exports = Command;
