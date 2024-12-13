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

router.get('/',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL
    ]),
    MaterialController.list)

router.post('/filter/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.getMaterialListByCustomFilter)

router.get('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.getMaterialById)

router.get('/filter/code',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.getMaterialByCode)

router.get('/list/filter/materialCode',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.getMaterialListByCode)

router.get('/filter/materialName',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.getMaterialByName)

router.get('/list/optCodeMat',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.listCodeMat)

router.get('/list/optItemCode',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    MaterialController.listItemCode)

router.get('/list/optType',
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