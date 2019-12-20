const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController.js')

router.get('/', UserController.getAll)
router.get('/:uuid', UserController.getByUuid)
// router.post('/', UserController.applyBackup)
// router.post('/script', UserController.runScript)

module.exports = router
