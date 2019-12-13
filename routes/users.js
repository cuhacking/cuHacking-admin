const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController.js')

router.get('/', UserController.getAll)
// router.post('/', UserController.applyBackup)
// router.post('/script', UserController.runScript)

module.exports = router
