const express = require('express')
const router = express.Router()
const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')

router.post('/list', TaskController.list)
router.post('/', TaskValidation, TaskController.register)
router.put('/:id', TaskValidation, TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router