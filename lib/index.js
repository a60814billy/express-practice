'use strict'

const Application = require('./Core').Application
const path = require('path')

module.exports = class App extends Application {
  constructor () {
    super()
    this.setControllerPath(path.join(__dirname, 'Controller'))
    this.setViewPath(path.join(__dirname, 'View'))
    this.setStaticPath(path.join(__dirname, '..', 'statc'))
  }
}
