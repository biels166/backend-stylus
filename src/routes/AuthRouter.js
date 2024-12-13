const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const {CheckPrivateRouter} = require('../middlewares/AuthValidation')

router.post('/login', AuthController.AuthLogin)
router.post('/generateTokenByEmail', AuthController.GenerateTokenByEmail)


module.exports = router