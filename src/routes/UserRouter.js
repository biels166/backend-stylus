const express = require('express')
const { env } = require('node:process')
const router = express.Router()
const UserController = require('../controller/UserController')
const UserValidation = require('../middlewares/UserValidation');
const { CheckPrivateRouter } = require('../middlewares/AuthValidation');

router.post('/',
    UserValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO,
        env.ADICIONAR_USUARIO
    ]),
    UserController.register)

router.put('/:id',
    UserValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO,
        env.EDITAR_USUARIO
    ]),
    UserController.update)

router.post('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO
    ]),
    UserController.listUser)

router.get('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO
    ]),
    UserController.getUserById)

router.get('/filter/email/:email',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO
    ]),
    UserController.getUserByEmail)

router.post('/filterByName',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO
    ]),
    UserController.getUserByName)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_USUARIO,
        env.REMOVER_USUARIO
    ]),
    UserController.delete)

    router.get('/email/list',
        CheckPrivateRouter([
            env.ADMINISTRADOR,
        ]),
        UserController.listEmails)

module.exports = router