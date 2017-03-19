'use strict'

const path = require('path')

const express = require('express')
const morgan = require('morgan')

const logger = require('./Utils/logger')

module.exports = class App {
  constructor () {
    this._logger = logger
    this._routers = {}
    this.expressApp = express()
    this.setUpApp()
  }

  setUpApp () {
    this.setLogger()
    this.setHtmlViewEngine()
    this.setRouter()
  }

  setRouter () {
    this._routers['user'] = require('./Router/user')
    this._routers['root'] = require('./Router/root')
  }

  setLogger () {
    this.app.use(morgan('combined', {
      stream: this.logger
    }))
  }

  setHtmlViewEngine () {
    this.app.engine('html', require('./htmlViewEngine'))
    this.app.set('views', path.join(__dirname, '..', 'public'))
    this.app.set('view engine', 'html')
    this.app.use(express.static(path.join(__dirname, '..', 'static')))
  }

  mountRouter () {
    Object.keys(this._routers).forEach(key => {
      if (Object.hasOwnProperty.call(this._routers, key)) {
        logger.debug(`Mount Router: ${key}`)
        this.app.use(this._routers[key])
      }
    })
  }

  get app () {
    return this.expressApp
  }

  get logger () {
    return this._logger
  }

  start () {
    this.logger.info('Mount All Router')
    this.mountRouter()
    this.logger.info('Server Start')
    this.expressApp.listen(3000)
  }
}
