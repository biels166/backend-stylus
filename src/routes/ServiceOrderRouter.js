const express = require('express')
const router = express.Router()
const ServiceOrderController = require('../controller/ServiceOrderController')
const ServiceOrderValidation = require('../middlewares/ServiceOrderValidation')

router.post('/manual', ServiceOrderValidation, ServiceOrderController.manualRegister)
router.put('/:id', ServiceOrderValidation, ServiceOrderController.update)
router.put('/status/complete/:id', ServiceOrderController.updateStatusToComplete)
router.get('/list', ServiceOrderController.list)
router.get('/late', ServiceOrderController.late)
router.get('/today', ServiceOrderController.today)
router.get('/week', ServiceOrderController.week)
router.get('/month', ServiceOrderController.month)

module.exports = router