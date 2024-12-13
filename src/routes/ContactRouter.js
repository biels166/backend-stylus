const express = require('express')
const router = express.Router()
const ContactController = require('../controller/ContactController')
const ContactValidation = require('../middlewares/ContactValidation')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')
const { env } = require('node:process')

router.post('/',
    ContactValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.ADICIONAR_CLIENTE
    ]), 
    ContactController.register)

router.put('/:id',
    ContactValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.EDITAR_CLIENTE
    ]),
    ContactController.update)

router.post('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
    ]),
    ContactController.getContactsByClientId)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_CLIENTE,
        env.REMOVER_CLIENTE,
    ]),
    ContactController.delete)

module.exports = router