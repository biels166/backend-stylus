const { model } = require('mongoose')
const ServiceOrderModel = require('../model/ServiceOrderModel')
const ClientModel = require('../model/ClientModel')
const BatchMaterialModel = require('../model/BatchMaterialModel')
const { startOfDay, endOfDay, startOfWeek, endOfWeek, endOfMonth, startOfMonth } = require('date-fns')
const GenerateOrderStatusStyle = require('../utils/GenerateOrderStatusStyle')
const currentDate = new Date()
const tomorrow = new Date().setDate(currentDate.getDate() + 1)
class ServiceOrderController {
    async list(req, res) {
        const { number, status, pageNumber, rowsPage, dateFilter } = req.body

        let filter = { _id: { '$ne': null } }

        try {
            if (number)
                filter = { ...filter, number: { $regex: number, $options: 'i' } }

            if (status)
                filter = { ...filter, status: status }

            const todayFilter = { deliveryDate: { '$gte': startOfDay(currentDate), '$lt': endOfDay(currentDate) } }
            const tomorrowFilter = { deliveryDate: { '$gte': startOfDay(tomorrow), '$lt': endOfDay(tomorrow) } }
            const thisWeekFilter = { deliveryDate: { '$gte': startOfWeek(currentDate), '$lt': startOfWeek(currentDate) } }
            const lateFilter = { deliveryDate: { '$lt': currentDate }, status: 'Em Execução' }

            if (status !== 'Concluída') {
                switch (dateFilter) {
                    case 'Hoje':
                        filter = { ...filter, ...todayFilter }
                        break

                    case 'Essa Semana':
                        filter = { ...filter, ...thisWeekFilter }
                        break

                    case 'Amanhã':
                        filter = { ...filter, ...tomorrowFilter }
                        break

                    case 'Atrasada':
                        filter = { ...filter, ...lateFilter }
                        break

                    default:
                        filter = { ...filter }
                        break
                }
            }

            const totalToday = await ServiceOrderModel.countDocuments(todayFilter)
            const totalTomorrow = await ServiceOrderModel.countDocuments(tomorrowFilter)
            const totalThisWeek = await ServiceOrderModel.countDocuments(thisWeekFilter)
            const totalLate = await ServiceOrderModel.countDocuments(lateFilter)

            const total = await ServiceOrderModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            const serviceOrdersDB = await ServiceOrderModel.find(filter)
                .sort({ number: -1 })
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            const serviceOrders = await Promise.all(
                serviceOrdersDB.map(async (order) => ({
                    ...order.toObject(),
                    client: await ClientModel.findById(order.client),
                    stateStyle: GenerateOrderStatusStyle(order)
                }))
            );

            return await res.status(200).json({
                total,
                pages,
                serviceOrders,
                totalToday,
                totalTomorrow,
                totalThisWeek,
                totalLate
            })
        }
        catch (error) {
            console.error('erro ao obter lista de ordens de serviço', error)
            return res.status(500).json(error)
        }
    }


    async register(req, res) {
        const { number, status, acceptedAt } = req.body

        req.body.number = `OS-${number}`
        req.body.quoteNumber = number
        req.body.quoteStatus = status
        req.body.status = "Em Execução"
        req.body.createdAt = new Date(acceptedAt)

        const serviceOrder = new ServiceOrderModel(req.body)
        await serviceOrder
            .save()
            .then(response => {
                return res.status(200).json({
                    order: response,
                    msg: `Ordem de Serviço ${response.number} criada com sucesso.`
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async completeOrder(req, res) {
        const { deliveryDate, materialList, _id } = req.body

        req.body.deliveryDate = new Date(deliveryDate)
        req.body.status = "Concluída"

        let batchesToUpdate = materialList.map(material => {
            return {
                batchId: material.batchId,
                quantity: material.quantity,
                quantityUsed: material.quantityUsed,
                rest: material.quantity - material.quantityUsed
            }
        })

        await Promise.all(
            batchesToUpdate.map(async (batch) => {
                let batchDB = await BatchMaterialModel.findOne({ 'batch': batch.batchId })

                batchDB = {
                    ...batchDB.toObject(),
                    using: batchDB.using - batch.quantity,
                    consumed: batchDB.consumed + batch.quantityUsed,
                    available: batchDB.available + batch.rest
                }

                await BatchMaterialModel.findOneAndUpdate(
                    { 'batch': batch.batchId }, batchDB
                )
            })
        )

        await ServiceOrderModel.findByIdAndUpdate({ '_id': _id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json({
                    order: response,
                    msg: `Ordem de serviço ${response.number} ${response.status.toUpperCase()} com sucesso.`
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}


module.exports = new ServiceOrderController()