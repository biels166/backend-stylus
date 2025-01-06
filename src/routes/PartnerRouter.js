const express = require('express')
const { env } = require('node:process')
const router = express.Router()
const PartnerController = require('../controller/PartnerController')
const PartnerValidation = require('../middlewares/PartnerValidation')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')
const OfferedValidation = require('../middlewares/OfferedValidation')

router.post('/',
    PartnerValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
        env.ADICIONAR_PARCEIRO
    ]),
    PartnerController.register)

router.put('/:id',
    PartnerValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
        env.EDITAR_PARCEIRO
    ]),
    PartnerController.update)

router.post('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
    ]),
    PartnerController.list)

router.get('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
    ]),
    PartnerController.getPartnerById)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
        env.REMOVER_PARCEIRO,
    ]),
    PartnerController.delete)

router.get('/suppliers/:category',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.ADICIONAR_MATERIAL
    ]),
    PartnerController.getSuppliers)

router.get('/outsourced/:category',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.ADICIONAR_COTACAO
    ]),
    PartnerController.getOutsourced)

router.post('/offered/',
    OfferedValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
        env.ADICIONAR_PARCEIRO
    ]),
    PartnerController.registerOffered)

router.put('/offered/:id',
    OfferedValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
        env.EDITAR_PARCEIRO
    ]),
    PartnerController.updateOffered)

router.post('/offered/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
    ]),
    PartnerController.listOffered)

router.delete('/offered/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PARCEIRO,
        env.REMOVER_PARCEIRO,
    ]),
    PartnerController.deleteOffered)

module.exports = router