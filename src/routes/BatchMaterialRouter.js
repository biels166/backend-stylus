const express = require('express')
const router = express.Router()
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')
const BatchMaterialController = require('../controller/BatchMaterialController')

router.get('/:batch',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    BatchMaterialController.getBatch)

    router.post('/options',
        CheckPrivateRouter([
            env.ADMINISTRADOR,
            env.VISUALIZAR_MATERIAL,
        ]),
        BatchMaterialController.listBatchesOptions)

    module.exports = router
