const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const UserValidation = require('../middlewares/UserValidation')
const EmailValidation = require('../middlewares/EmailValidation')

router.post('/', UserValidation, UserController.register)
router.put('/:id', UserValidation, UserController.update)
router.get('/list', UserController.listUser)
router.get('/:id', UserController.getUserById)
router.get('/filter/email/:email', UserController.getUserByEmail)
router.get('/filter/name/:name', UserController.getUserByName)
router.delete('/:id', UserController.delete)

module.exports = router