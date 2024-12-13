const express = require('express')
const router = express.Router()
const SendMailController = require('../controller/SendMailController')

router.post('/testmail', SendMailController.sendTestMail)
router.get('/createInbound', SendMailController.createInbound)


module.exports = router