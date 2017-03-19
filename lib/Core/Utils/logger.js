'use strict'

const winston = require('winston')

class Logger extends winston.Logger {
  write (chunk) {
    this.info(chunk)
  }
}

module.exports = new Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      timestamp: true,
      // handleExceptions: true
    })
  ],
  // exitOnError: false
})
