const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')

router.post('/login', AuthController.AuthLogin)
router.post('/generateTokenByEmail', AuthController.GenerateTokenByEmail)

module.exports = router