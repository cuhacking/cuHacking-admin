const express = require('express')
const router = express.Router()

const StatsController = require('../controllers/statsController.js')

router.get('/', StatsController.calculate)

module.exports = router
