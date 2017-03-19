'use strict'

const Controller = require('../Core/controller')
const User = require('../model/models').User

module.exports = class UserController extends Controller {
  constructor () {
    // set mount base path
    super('User')
    // set routing path
    this.get('/', this.getUser) // => /user/
    this.get('/add', this.getAddUser)
    this.get('/list', this.listUser)
    this.get('/:userid', this.getSingleUSer) // => /user/:id
  }
  getUser (res, req) {
    req.send('GET User')
  }
  getAddUser (res, req) {
    User.create().then(function (user) {
      req.send(user)
    })
  }
  listUser (res, req) {
    User.findAll().then(function (all) {
      req.send(all)
    })
  }
  getSingleUSer (res, req) {
  }
}
