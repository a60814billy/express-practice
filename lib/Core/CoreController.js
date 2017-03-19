'use strict'

const Router = require('express').Router

module.exports = class CoreController {
  constructor (name) {
    this._baseName = name.toLowerCase()
    if (!this._baseName.startsWith('/')) {
      this._baseName = '/' + this._baseName
    }
    this._router = new Router()
  }
  all (method, path) {
    this._router.all(path, method)
  }
  get (method, path) {
    this._router.get(path, method)
  }
  post (method, path) {
    this._router.post(path, method)
  }
  put (method, path) {
    this._router.put(path, method)
  }
  delete (method, path) {
    this._router.delete(path, method)
  }
}
