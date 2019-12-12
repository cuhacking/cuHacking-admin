const express = require('express')
const router = express.Router()

const ApplicationController = require('../controllers/applicationController.js')

router.put('/', ApplicationController.upload)

module.exports = router
