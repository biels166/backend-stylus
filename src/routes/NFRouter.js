const express = require('express')
const router = express.Router()
const NFController = require('../controller/NFController')
const NFValidation = require('../middlewares/NFValidations')
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')

router.post('/', 
    NFValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.ADICIONAR_CLIENTE
    ]),
     NFController.register)

router.post('/getNFByClient',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
    ]),
    NFController.list)

router.put('/:id',
    NFValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.EDITAR_CLIENTE
    ]),
    NFController.update)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.REMOVER_CLIENTE,
    ]),
    NFController.delete)

module.exports = router