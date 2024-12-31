const express = require('express')
const router = express.Router()
const { env } = require('node:process')
const { CheckPrivateRouter } = require('../middlewares/AuthValidation')
const CategoryController = require('../controller/CategoryController')
const CategoryValidation = require('../middlewares/CategoryValidation')
const ItemCategoryValidation = require('../middlewares/ItemCategoryValidation')

router.post('/',
    CategoryValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.ADICIONAR_MATERIAL
    ]),
    CategoryController.register)

router.get('/listCategories',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.ADICIONAR_MATERIAL
    ]),
    CategoryController.listCategories)

router.post('/item',
    ItemCategoryValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.ADICIONAR_MATERIAL
    ]),
    CategoryController.registerItem)

router.put('/item/:id',
    ItemCategoryValidation,
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.EDITAR_MATERIAL
    ]),
    CategoryController.updateItem)

router.delete('/item/:id',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
        env.REMOVER_MATERIAL
    ]),
    CategoryController.deleteItem)

router.post('/listItemByCategory',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    CategoryController.listItensByCategory)

router.post('/getItemByCategory',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    CategoryController.getItensByCategory)

router.get('/listAllSupplierItens',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    CategoryController.getAllSupplierItens)

router.get('/item/:itemCode',
    CheckPrivateRouter([
        env.ADMINISTRADOR,
        env.VISUALIZAR_MATERIAL,
    ]),
    CategoryController.getByItemCode)

module.exports = router
