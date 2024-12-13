const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController')
const ProductValidation = require('../middlewares/ProductValidation')
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')

router.post('/',
    ProductValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PRODUTO,
        env.ADICIONAR_PRODUTO
    ]),
    ProductController.register)

router.put('/:id',
    ProductValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PRODUTO,
        env.EDITAR_PRODUTO
    ]),
    ProductController.update)

router.get('/list',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PRODUTO,
    ]),
    ProductController.list)

router.get('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PRODUTO,
    ]),
    ProductController.getProductById)

router.get('/filter/description/:product',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PRODUTO,
    ]),
    ProductController.getProductByName)

router.delete('/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_PRODUTO,
        env.REMOVER_PRODUTO
    ]),
    ProductController.delete)

module.exports = router