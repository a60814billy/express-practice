'use strict'

const Controller = require('../Core/CoreController')
const r = require('../Core/PathDef')

module.exports = class UserController extends Controller {
  constructor () {
    super('User')
    this.get(this.getUser, '/')
  }
  getUser (res, req) {
    req.send('GET User')
  }
}
