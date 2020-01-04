const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController.js')

router.get('/', UserController.optimizedGetByQuery)
router.get('/legacy', UserController.getByQuery)
router.get('/:uuid', UserController.getByUuid)

// DANGEROUS endpoints
// router.post('/script', UserController.runScript)
// router.post('/', UserController.applyBackup)

module.exports = router
