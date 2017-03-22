'use strict'

const path = require('path')
const util = require('util')

const Promise = require('bluebird')
const Sequelize = require('sequelize')
const Umzug = require('umzug')

const logger = require('./utils/logger')

exports.getSequelize = function getSequelize (config) {
  return new Promise(function (resolve, reject) {
    if (util.isUndefined(config)) {
      reject(new Error('config file is isUndefined'))
    }
    if (config.use_env_variable) {
      resolve(new Sequelize(process.env[config.use_env_variable]))
    }
    resolve(new Sequelize(config.database, config.username, config.password, config))
  })
}

exports.createMigrator = function createMigrator (sequelize) {
  let umzugOptions = {
    // The storage.
    // Possible values: 'json', 'sequelize', an argument for `require()`, including absolute paths
    storage: 'sequelize',

    // The options for the storage.
    // Check the available storages for further details.
    storageOptions: {
      sequelize: sequelize
    },

    // The logging function.
    // A function that gets executed everytime migrations start and have ended.
    logging: logger.info,

    // The name of the positive method in migrations.
    upName: 'up',

    // The name of the negative method in migrations.
    downName: 'down',

    migrations: {
      // The params that gets passed to the migrations.
      // Might be an array or a synchronous function which returns an array.
      params: [sequelize.getQueryInterface(), sequelize.Sequelize],
      // The path to the migrations directory.
      path: path.resolve(__dirname, '../model/migrations'),
      // The pattern that determines whether or not a file is a migration.
      pattern: /^\d+[\w-]+\.js$/,
      // A function that receives and returns the to be executed function.
      // This can be used to modify the function.
      wrap: function (fun) {
        if (fun.length === 3) {
          return Promise.promisify(fun)
        } else {
          return fun
        }
      }
    }
  }

  return new Umzug(umzugOptions)
}

function buildMigrationTaskQueue (pendingMigrations) {
  let taskQueue = []
  pendingMigrations.forEach(function (migration) {
    let result = /^(\d+[\w-]+)\.js$/.exec(migration.file)
    let migrationName = result[1]
    taskQueue.push({
      name: migrationName,
      path: migration.path
    })
  })
  return taskQueue
}

exports.runMigration = function runMigration (sequelize, migrator) {
  logger.debug('Fetch all pending migrations.')
  return migrator.pending().then(function (pendingMigrations) {
    if (pendingMigrations.length === 0) {
      return
    }
    logger.debug(`Have ${pendingMigrations.length} migrations.`)
    let taskQueue = buildMigrationTaskQueue(pendingMigrations)
    function migrationUp () {
      let task = taskQueue.shift()
      return migrator.up({to: task.name})
        .then(function () {
          logger.debug(`Executed Migration ${task.name} sucessfully.`)
        })
        .then(function () {
          if (taskQueue.length !== 0) {
            return migrationUp()
          }
        })
        .catch(function (err) {
          throw err
        })
    }
    return migrationUp().then(function () {
      logger.info('migration done.')
    }).catch(function (err) {
      throw err
    })
  })
}
