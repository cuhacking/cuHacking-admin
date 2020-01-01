const { createLogger, transports } = require('winston')
const { format } = require('logform')

// Uses npm levels (0-5 respectively): error, warn, info, verbose, debug, silly
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: '[[]HH:mm:ss.SSS[]]' }),
    format.printf(info => `${info.timestamp} ${info.level} - ${info.message}`)
  ),
  transports: [
    new transports.Console({
      // This is to silence the logger during Jest tests
      silent: process.argv.indexOf('--silent') >= 0
    })
  ]
})

const stringify = obj => JSON.stringify(obj, null, 2)

module.exports = { logger, stringify }
