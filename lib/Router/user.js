'use strict'

const Router = require('express').Router

let router = new Router()

router.get('/user', function (req, res) {
  res.send('GET user')
})

module.exports = router
