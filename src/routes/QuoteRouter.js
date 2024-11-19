const express = require('express')
const router = express.Router()
const QuoteContoller = require('../controller/QuoteController')
const QuoteValidation = require('../middlewares/QuoteValidation')

router.post('/', QuoteValidation, QuoteContoller.register)
router.put('/:id', QuoteValidation, QuoteContoller.update) 
router.put('/status/cancel/:id', QuoteContoller.updateStatusToCancel) 
router.put('/status/accept/:id', QuoteContoller.updateStatusToAccept) 
router.get('/list', QuoteContoller.list) 

module.exports = router