'use strict'

const Controller = require('../Core/Controller')

module.exports = class UserController extends Controller {
  constructor () {
    // set mount base path
    super('User')
    // set routing path
    this.get('/', this.getUser) // => /user/
    this.get('/:userid', this.getSingleUSer) // => /user/:id
  }
  getUser (res, req) {
    req.send('GET User')
  }
  getSingleUSer (res, req) {
    req.send('GET 1 User')
  }
}
