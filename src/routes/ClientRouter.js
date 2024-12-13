const express = require('express')
const { env } = require('node:process')
const router = express.Router()
const ClientController = require('../controller/ClientController')
const ClientValidation = require('../middlewares/ClientValidation')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')

router.post('/',
    ClientValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.ADICIONAR_CLIENTE
    ]),
    ClientController.register)

router.put('/:id',
    ClientValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.EDITAR_CLIENTE
    ]),
    ClientController.update)

router.post('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
    ]),
    ClientController.list)

router.post('/filterByName',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
    ]),
    ClientController.getClientsByName)

router.get('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
    ]),
    ClientController.getClientById)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.REMOVER_CLIENTE,
    ]),
    ClientController.delete)

module.exports = router