'use strict'

const Router = require('express').Router

module.exports = class Controller {
  constructor (name) {
    this._baseName = name.toLowerCase()
    if (!this._baseName.startsWith('/')) {
      this._baseName = '/' + this._baseName
    }
    this._router = new Router()
  }
  all (path, method) {
    this._router.all(path, method)
  }
  get (path, method) {
    this._router.get(path, method)
  }
  post (path, method) {
    this._router.post(path, method)
  }
  put (path, method) {
    this._router.put(path, method)
  }
  delete (path, method) {
    this._router.delete(path, method)
  }
}
