const express = require('express')
const router = express.Router()
const NFController = require('../controller/NFController')
const NFValidation = require('../middlewares/NFValidations')

router.post('/', NFValidation, NFController.register)
router.get('/list/:id', NFController.list) 


module.exports = router