const { model } = require('mongoose')
const ServiceOrderModel = require('../model/ServiceOrderModel')
const {startOfDay, endOfDay, startOfWeek, endOfWeek, endOfMonth, startOfMonth} = require('date-fns')
const currentDate = new Date()

class ServiceOrderController {

    async manualRegister(req, res) {
        let date = new Date()
        req.body.createdAt = date

        let day = date.getDate().toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getUTCFullYear().toString().slice(2)

        let orderCounter = 0

        await ServiceOrderModel.find({ _id: { '$ne': null } })
            .then(response => {
                if (response.length > 0) {
                    let manuals = response.filter(i => i.number.startsWith('OSM'))
                    let lastNumber = manuals[manuals.length - 1].sequential

                    orderCounter = lastNumber === 0 ? 1 : (lastNumber + 1)
                }
                else {
                    req.body.sequential = 1
                    orderCounter = 1
                }
            })

        req.body.number = `OSM${orderCounter}${day}${month}${year}`

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

        const serviceOrder = new ServiceOrderModel(req.body)
        await serviceOrder
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async register(req, res) {
        let soBody = new ServiceOrderModel()

        soBody.createdAt = new Date()

        soBody.number =  `OS${req.body.number}`
        soBody.Sequential = req.body.sequential

        soBody.client = req.body.client
        soBody.materials = req.body.materials
        soBody.products = req.body.products

        soBody.discount = req.body.discount
        soBody.deliveryTax = req.body.delivetyTax
        soBody.deliveryDate = req.body.delivetyDate
        soBody.tax = req.body.tax
        soBody.calculatedValue = req.body.calculatedValue
        soBody.finalValue = req.body.finalValue
        soBody.obs = req.body.obs
        soBody.finalValue = req.body.finalValue
        .status = "Em execução"        

        const serviceOrder = new ServiceOrderModel(soBody)
        await serviceOrder
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

    async updateStatusToComplete(req, res) {
        let date = new Date()
        req.body.deliveredAt = date
        req.body.status = "Concluída"

        await ServiceOrderModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        await ServiceOrderModel.find({ _id: { '$ne': null } })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async late(req, res) {
        await ServiceOrderModel.find({ 'deliveryDate': { '$lt': currentDate } })
            .sort('deliveryDate')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

    async today(req, res) {
        await ServiceOrderModel.find({ 'deliveryDate': { '$gte': startOfDay(currentDate), '$lt': endOfDay(currentDate) } })
            .sort('deliveryDate')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

    async week(req, res) {
        await ServiceOrderModel.find({ 'deliveryDate': { '$gte': startOfWeek(currentDate), '$lt': endOfWeek(currentDate) } })
            .sort('deliveryDate')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

    async month(req, res) {
        await ServiceOrderModel.find({ 'deliveryDate': { '$gte': startOfMonth(currentDate), '$lt': endOfMonth(currentDate) } })
            .sort('deliveryDate')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }
}


module.exports = new ServiceOrderController()