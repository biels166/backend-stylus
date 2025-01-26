const express = require('express')
const router = express.Router()
const { env } = require('node:process')
const DocumentController = require('../controller/DocumentController')

router.post('/generate', DocumentController.generatePDF)
router.get('/download/:id', DocumentController.downloadPDF)


module.exports = router
