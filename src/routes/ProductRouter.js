const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController')
const ProductValidation = require('../middlewares/ProductValidation')

router.post('/', ProductValidation , ProductController.register)
router.put('/:id', ProductValidation , ProductController.update)
router.get('/list', ProductController.list)
router.get('/:id', ProductController.getProductById)
router.get('/filter/description/:product', ProductController.getProductByName)
router.delete('/:id', ProductController.delete)

module.exports = router