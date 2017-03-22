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

function autoMigration () {
  const migrationUtil = require('./lib/core/migration')
  const migrationFilePath = path.resolve(__dirname, './lib/model/migrations')

  logger.info('Starting database auto migration')
  logger.debug(`Migration Path: ${migrationFilePath}`)

  migrationUtil.getSequelize(config.db).then(function (sequelize) {
    sequelize.authenticate()
      .then(function () {
        logger.debug('Database connected.')
      })
      .then(function () {
        return migrationUtil.createMigrator(sequelize)
      })
      .then(function (migrator) {
        return migrationUtil.runMigration(sequelize, migrator)
      })
      .then(function () {
        runApp()
      })
      .catch(function (err) {
        if (err.message === 'SequelizeMeta schema not esixt.') {
          logger.info('SequlizeMeta not found.')
          return runApp()
        }
        throw err
      })
  })
}

if (util.isUndefined(config)) {
  throw new Error('Fail to load config file')
}

if (config.db.auto_migration) {
  autoMigration()
} else {
  runApp()
}
