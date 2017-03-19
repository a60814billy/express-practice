'use strict'

const Router = require('express').Router

let router = new Router()

router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router
