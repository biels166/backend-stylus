const express = require('express')
const router = express.Router()
const MaterialController = require('../controller/MaterialController')
const MaterialValidations = require('../middlewares/MaterialValidation')
const MaterialUpdateValidations = require('../middlewares/MaterialUpdateValidation')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')
const { env } = require('node:process')

router.post('/',
    MaterialValidations,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.ADICIONAR_MATERIAL
    ])
    , 
    MaterialController.register)

router.put('/:id',
    MaterialUpdateValidations,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.EDITAR_MATERIAL
    ]),
    MaterialController.updatePrincing)

router.post('/listByFilter',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.getMaterialListByFilter)

router.get('/list/codeMaterial',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.listCodeMat)

router.get('/list/type',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.listType)

    router.delete('/:id',
        CheckPrivateRouter([
            env.ADMINISTRADOR,
            env.VISUALIZAR_MATERIAL,
            env.REMOVER_MATERIAL,
        ])
        , MaterialController.delete)
        
module.exports = router