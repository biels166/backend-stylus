const express = require('express')
const router = express.Router()
const ClientController = require('../controller/ClientController')
const ClientValidation = require('../middlewares/ClientValidation')

router.post('/', ClientValidation, ClientController.register)
router.put('/:id', ClientValidation, ClientController.update) 
router.get('/list', ClientController.list) 
router.get('/filter/name/:name', ClientController.getClientByName) 
router.get('/:id', ClientController.getClientById) 
router.delete('/:id', ClientController.delete) 

module.exports = router