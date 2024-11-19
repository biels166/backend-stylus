const express = require('express')
const router = express.Router()
const MaterialController = require('../controller/MaterialController')
const MaterialValidations = require('../middlewares/MaterialValidation')
const MaterialUpdateValidations = require('../middlewares/MaterialUpdateValidation')

router.post('/', MaterialValidations, MaterialController.register)
router.put('/:id', MaterialUpdateValidations, MaterialController.updatePrincing)
router.get('/', MaterialController.list)
router.post('/filter/list', MaterialController.getMaterialListByCustomFilter)
router.get('/:id', MaterialController.getMaterialById)
router.get('/filter/code', MaterialController.getMaterialByCode)
router.get('/list/filter/materialCode', MaterialController.getMaterialListByCode)
router.get('/filter/materialName', MaterialController.getMaterialByName)
router.delete('/:id', MaterialController.delete)

router.get('/list/optCodeMat', MaterialController.listCodeMat)
router.get('/list/optItemCode', MaterialController.listItemCode)
router.get('/list/optType', MaterialController.listType)


module.exports = router