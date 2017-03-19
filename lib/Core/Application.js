'use strict'

const logger = require('./Utils/logger')
const express = require('express')
const morgan = require('morgan')

const path = require('path')
const fs = require('fs')

const Controller = require('./CoreController')

module.exports = class Application {
  constructor () {
    this._logger = logger
    this._routers = {}
    this.expressApp = express()
    this.setUpApp()
  }
  setUpApp () {
    this.setLogger()
    this.setHtmlViewEngine()
  }

  setLogger () {
    this.app.use(morgan('combined', {
      stream: this.logger
    }))
  }

  setHtmlViewEngine () {
    this.app.engine('html', require('./htmlViewEngine'))
  }

  setControllerPath (path) {
    this._controllerPath = path
  }

  setViewPath (path) {
    this._viewPath = path
  }

  setStaticPath (path) {
    this._staticPath = path
  }

  get app () {
    return this.expressApp
  }

  get logger () {
    return this._logger
  }

  mountController () {
    this.logger.debug('Mount Controller')
    if (fs.existsSync(this._controllerPath)) {
      let controllers = fs.readdirSync(this._controllerPath)
      for (let cont of controllers) {
        let c = require(path.join(this._controllerPath, cont))
        let ci = new c()
        if (ci instanceof Controller) {
          this.logger.debug(`Mount Path:${cont}`)
          this.app.use(ci._baseName, ci
          ._router)
        }
      }
    }
  }

  setView () {
    this.app.set('views', this._viewPath)
    this.app.set('view engine', 'html')
  }

  setStatic () {
    this.app.use(express.static(this._staticPath))
  }

  start () {
    this.mountController()
    this.setView()
    this.setStatic()
    this.logger.info('Server Start')
    this.expressApp.listen(3000)
  }
}
