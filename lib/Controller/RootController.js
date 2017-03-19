'use strict'

const Controller = require('../Core/CoreController')

module.exports = class RootController extends Controller {
  constructor () {
    super('/')
    this.get(this.getRoot, '/')
  }
  getRoot (req, res) {
    res.render('index')
  }
}
