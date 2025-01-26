const express = require('express')
const router = express.Router()
const QuoteContoller = require('../controller/QuoteController')
const QuoteValidation = require('../middlewares/QuoteValidation')
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')

router.post('/',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_COTACAO,
        env.ADICIONAR_COTACAO
    ]),
    QuoteContoller.register)

router.post('/updateOrConsolidateDraft',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_COTACAO,
        env.ADICIONAR_COTACAO
    ]),
    QuoteContoller.updateOrConsolidateDraft)

router.post('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_COTACAO,
    ]),
    QuoteContoller.list)

router.put('/changeState',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.ADICIONAR_COTACAO,
    ]),
    QuoteContoller.changeQuoteState)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.ADICIONAR_COTACAO
    ]),
    QuoteContoller.discardDraft)

/*
router.put('/:id',
    QuoteValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_COTACAO,
        env.EDITAR_COTACAO
    ]),
    QuoteContoller.update)

router.put('/status/cancel/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_COTACAO,
        env.EDITAR_COTACAO
    ]),
    QuoteContoller.updateStatusToCancel)

router.put('/status/accept/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_COTACAO,
        env.EDITAR_COTACAO
    ]),
    QuoteContoller.updateStatusToAccept)
*/


module.exports = router