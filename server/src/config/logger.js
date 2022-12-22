const winston = require('winston');
const path = require('path');
const { format } = require('path');
class Logger {
    _logger;
    static _instance;
    constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: path.join(__dirname, '../logs.log'),
                    level: 'info',
                }),
            ],
        });
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Logger();
        return this._instance;
    }

    get logger() {
        return this._logger;
    }
}

module.exports = Logger;
