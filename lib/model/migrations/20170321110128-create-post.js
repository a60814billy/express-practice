'use strict'

const path = require('path')
const async = require('async')
const Promise = require('bluebird')

module.exports = {
  up: function (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize
    return sequelize.transaction().then(function (t) {
      return queryInterface.createTable('Posts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, {transaction: t})
      .then(function () {
        const Post = sequelize.import(path.resolve(__dirname, '../models/post.js'))
        return Promise.promisify(async.times)(100, function (n, next) {
          Post.create({
            title: '' + n,
            content: 'Hello, ' + n
          }, {transaction: t})
          .then(function (post) {
            next(null, post)
          })
        })
      })
      .then(function () {
        return t.commit()
      })
      .catch(function (err) {
        t.rollback()
        throw err
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Posts')
  }
}
