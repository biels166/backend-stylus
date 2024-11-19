const { model } = require('mongoose')
const QuoteModel = require('../model/QuoteModel')

class QuoteController {
    async register(req, res) {
        let date = new Date()
        req.body.createdAt = date

        let day = date.getDate().toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getUTCFullYear().toString().slice(2)

        let quoteCounter = 0

        await QuoteModel.find({ _id: { '$ne': null } })
            .then(response => {
                if (response.length > 0) {
                    let last = response[response.length - 1]
                    let lastSequencial = parseInt(last.sequential)

                    quoteCounter = lastSequencial === 0 ? 1 : (lastSequencial + 1)
                }
                else {
                    req.body.sequential = 1
                    quoteCounter = 1
                }
            })

        req.body.number = `${quoteCounter}${day}${month}${year}`

        let totalLoss = 0
        let totalValue = 0
        let calculated = 0
        let calculatedFinal = 0

        req.body.materials.forEach(element => {
            totalLoss += (element.quantityItens * element.value)
        });

        req.body.products.forEach(element => {
            totalValue += (element.quantityItens * element.value)
        });

        calculated = totalValue - totalLoss
        calculatedFinal = totalValue

        if (req.body.discount > 0 || req.body.tax > 0) {
            let taxes = req.body.tax - req.body.discount
            let totalTax = 1 + taxes

            calculated *= totalTax
            calculatedFinal *= totalTax
        }

        calculated += req.body.deliveryTax
        calculatedFinal += req.body.deliveryTax

        req.body.calculatedValue = calculated
        //Apenas enquanto não há front
        req.body.finalValue = calculatedFinal

        const quote = new QuoteModel(req.body)
        await quote
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        let date = new Date()
        req.body.updatedAt = date

        let totalLoss = 0
        let totalValue = 0
        let calculated = 0
        let calculatedFinal = 0

        req.body.materials.forEach(element => {
            totalLoss += (element.quantityItens * element.value)
        });

        req.body.products.forEach(element => {
            totalValue += (element.quantityItens * element.value)
        });


        calculated = totalValue - totalLoss
        calculatedFinal = totalValue

        if (req.body.discount > 0 || req.body.tax > 0) {
            let taxes = req.body.tax - req.body.discount
            let totalTax = 1 + taxes

            calculated *= totalTax
            calculatedFinal *= totalTax
        }

        calculated += req.body.deliveryTax
        calculatedFinal += req.body.deliveryTax

        req.body.calculatedValue = calculated
        //Apenas enquanto não há front
        req.body.finalValue = calculatedFinal


        await QuoteModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async updateStatusToCancel(req, res) {
        let date = new Date()
        req.body.updatedAt = date
        req.body.canceledAt = date
        req.body.status = "Cancelada"


        await QuoteModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async updateStatusToAccept(req, res) {
        let date = new Date()
        req.body.updatedAt = date
        req.body.acceptedAt = date
        req.body.status = "Aprovada"

        await QuoteModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        await QuoteModel.find({ _id: { '$ne': null } })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new QuoteController()