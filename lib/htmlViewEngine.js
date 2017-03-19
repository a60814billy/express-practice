'use strict'

const fs = require('fs')

module.exports = function htmlViewEngine (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err))
    }
    return callback(null, content.toString())
  })
}
