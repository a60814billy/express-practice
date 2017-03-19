'use strict'

const Application = require('./Core').Application
const path = require('path')
const model = require('./model/models')

module.exports = class App extends Application {
  constructor () {
    super()
    this.setControllerPath(path.join(__dirname, 'controller'))
    this.setViewPath(path.join(__dirname, 'view'))
    this.setStaticPath(path.join(__dirname, '..', 'statc'))
  }
  start () {
    this.logger.debug('App.start()')
    let superStart = super.start.bind(this)
    model.sequelize.sync().then(function () {
      superStart()
    })
  }
}
