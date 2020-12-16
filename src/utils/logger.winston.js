/* eslint-disable no-unused-vars */

const appRoot = require('app-root-path');
const winston = require('winston');

const { format, createLogger, transports } = require('winston');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.simple(),
        format.printf(info => `-- ${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        // new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
    write(message, encoding) {
        logger.info(message);
    }
};
module.exports = logger;
