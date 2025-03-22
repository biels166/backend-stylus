const express = require('express')
const router = express.Router()
const ServiceOrderController = require('../controller/ServiceOrderController')
const ServiceOrderValidation = require('../middlewares/ServiceOrderValidation')
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')

router.post('/',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS,
        env.ADICIONAR_OS
    ]),
    ServiceOrderController.register)

router.post('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS
    ]),
    ServiceOrderController.list)

router.post('/completeOrder',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.EDITAR_OS
    ]),
    ServiceOrderController.completeOrder)

module.exports = router