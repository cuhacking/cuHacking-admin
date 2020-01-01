const express = require('express')
const router = express.Router()

const ApplicationController = require('../controllers/applicationController.js')

router.post('/', ApplicationController.admit)
router.get('/review', ApplicationController.getSubmittedAppication)
router.post('/review', ApplicationController.reviewApplication)
router.post('/legacy', ApplicationController.upload)

module.exports = router
