const express = require('express')
const router = express.Router()
const ServiceOrderController = require('../controller/ServiceOrderController')
const ServiceOrderValidation = require('../middlewares/ServiceOrderValidation')
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')

router.post('/manual',
    ServiceOrderValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS,
        env.ADICIONAR_OS
    ]),
    ServiceOrderController.manualRegister)

router.put('/:id',
    ServiceOrderValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS,
        env.EDITAR_OS
    ]),
    ServiceOrderController.update)

router.put('/status/complete/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS,
        env.EDITAR_OS
    ]),
    ServiceOrderController.updateStatusToComplete)

router.get('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS
    ]),
    ServiceOrderController.list)

router.get('/late',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS
    ]),
    ServiceOrderController.late)

router.get('/today',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS
    ]),
    ServiceOrderController.today)

router.get('/week',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS
    ]),
    ServiceOrderController.week)

router.get('/month',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_OS
    ]),
    ServiceOrderController.month)

module.exports = router