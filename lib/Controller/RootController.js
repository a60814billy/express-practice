'use strict'

const Controller = require('../Core/controller')

module.exports = class RootController extends Controller {
  constructor () {
    // set mount base path
    super('/')
    // set routing path
    this.get('/', this.getRoot)
  }
  getRoot (req, res) {
    res.render('index')
  }
}
