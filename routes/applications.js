const express = require('express')
const router = express.Router()

const ApplicationController = require('../controllers/applicationController.js')

router.post('/legacy', ApplicationController.upload)

module.exports = router
