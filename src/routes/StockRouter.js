const express = require('express')
const router = express.Router()
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')
const { env } = require('node:process')
const StockController = require('../controller/StockController')

router.post('/listStockControl',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    StockController.listStockControl)

module.exports = router
