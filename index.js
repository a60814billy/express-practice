'use strict'

const path = require('path')
const util = require('util')

const logger = require('./lib/core/utils/logger')

const env = process.NODE_ENV || 'development'
const config = require('./lib/config/config.json')[env]

function runApp () {
  const App = require('./lib')

  let app = new App()
  app.start()
}

if (util.isUndefined(config)) {
  throw new Error('Fail to load config file')
}

if (config.db.auto_migration) {
  const AutoMigration = require('hackmd-auto-migration')
  let autoMigration = new AutoMigration({
    migrations: {
      path: path.resolve(__dirname, './lib/model/migrations')
    },
    logging: logger,
    db: config.db
  })
  autoMigration.run().then(function () {
    runApp()
  }).catch(function (err) {
    throw err
  })
} else {
  runApp()
}
