const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController.js')

router.get('/', UserController.getByQuery)
router.get('/:uuid', UserController.getByUuid)
// router.post('/', UserController.applyBackup)

module.exports = router
