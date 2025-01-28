const QuoteModel = require('../model/QuoteModel')
const ClientModel = require('../model/ClientModel')
const { startOfDay, endOfDay } = require('date-fns')
const BatchMaterialModel = require('../model/BatchMaterialModel')
const currentDate = new Date()
class QuoteController {
    async register(req, res) {
        const day = currentDate.getDate().toString().padStart(2, '0')
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const year = currentDate.getUTCFullYear().toString().slice(2)

        //Buscar cotações geradas hoje
        let sequential = 1
        const generatedToday = await QuoteModel.find({
            createdAt: {
                '$gte': startOfDay(currentDate), '$lt': endOfDay(currentDate)
            }
        })

        if (generatedToday.length > 0) {
            const lastGeneratedToday = generatedToday[generatedToday.length - 1]?.sequential
            sequential = lastGeneratedToday + 1
        }

        const formatedSequential = sequential.toString().padStart(2, '0')

        req.body = {
            ...req.body,
            createdAt: currentDate,
            sequential: sequential,
            number: `${day}${month}${year}${formatedSequential}`,
        }

        const { status } = req.body

        if (status === "Em Aprovação") {
            let batchesToUpdate = req.body.materialList.map(material => {
                return {
                    batchId: material.batchId,
                    quantity: material.quantity
                }
            })

            await Promise.all(
                batchesToUpdate.map(async (batch) => {
                    let batchDB = await BatchMaterialModel.findOne({ 'batch': batch.batchId })

                    batchDB = {
                        ...batchDB.toObject(),
                        reserved: batchDB.reserved + batch.quantity,
                        available: batchDB.available - batch.quantity
                    }

                    await BatchMaterialModel.findOneAndUpdate(
                        { 'batch': batch.batchId }, batchDB
                    )
                })
            )
        }

        await new QuoteModel(req.body)
            .save()
            .then(response => {
                let created = ''

                if (status === 'Em Rascunho') created = 'Rascunho da cotação'
                if (status === 'Em Aprovação') created = 'Cotação'

                return res.status(200).json({
                    quote: response,
                    msg: `${created} ${response.number} criada com sucesso.`
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async updateOrConsolidateDraft(req, res) {
        const { _id, status } = req.body

        req.body.updatedAt = currentDate

        if (status === "Em Aprovação") {
            let batchesToUpdate = req.body.materialList.map(material => {
                return {
                    batchId: material.batchId,
                    quantity: material.quantity
                }
            })

            await Promise.all(
                batchesToUpdate.map(async (batch) => {
                    let batchDB = await BatchMaterialModel.findOne({ 'batch': batch.batchId })

                    batchDB = {
                        ...batchDB.toObject(),
                        reserved: batchDB.reserved + batch.quantity,
                        available: batchDB.available - batch.quantity
                    }

                    await BatchMaterialModel.findOneAndUpdate(
                        { 'batch': batch.batchId }, batchDB
                    )
                })
            )
        }

        await QuoteModel.findByIdAndUpdate({ '_id': _id }, req.body, { new: true })
            .then(response => {
                let created = ''

                if (response.status === 'Em Rascunho')
                    created = `Rascunho da cotação ${response.number} atualizada com sucesso.`
                if (response.status === 'Em Aprovação')
                    created = `Cotação ${response.number} criada com sucesso.`

                return res.status(200).json({
                    quote: response,
                    msg: created
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        const { number, status, filterChips, pageNumber, rowsPage } = req.body

        let filter = { _id: { '$ne': null } }

        try {
            if (number)
                filter = { ...filter, number: { $regex: number, $options: 'i' } }

            if (status)
                filter = { ...filter, status: status }

            const totalDrafts = await QuoteModel.countDocuments({
                ...filter,
                status: "Em Rascunho"
            })

            const totalPending = await QuoteModel.countDocuments({
                ...filter,
                status: "Em Aprovação"
            })

            const total = await QuoteModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            const quotesDB = await QuoteModel.find(filter)
                .sort(number, -1)
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            const quotes = await Promise.all(
                quotesDB.map(async (quote) => ({
                    ...quote.toObject(),
                    client: await ClientModel.findById(quote.client),
                }))
            );

            return await res.status(200).json({
                total,
                pages,
                quotes,
                totalDrafts,
                totalPending
            })
        }
        catch (error) {
            console.error('erro ao obter lista de cotações', error)
            return res.status(500).json(error)
        }
    }

    async discardDraft(req, res) {
        await QuoteModel.findByIdAndDelete({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json({
                    quote: response,
                    msg: 'Rascunho deletado com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async changeQuoteState(req, res) {
        const { _id } = req.body

        req.body.updatedAt = currentDate

        let batchesToUpdate = req.body.materialList.map(material => {
            return {
                batchId: material.batchId,
                quantity: material.quantity
            }
        })

        if (req.body.status === 'Cancelada') {
            req.body.canceledAt = currentDate

            await Promise.all(
                batchesToUpdate.map(async (batch) => {

                    let batchDB = await BatchMaterialModel.findOne({ 'batch': batch.batchId })

                    batchDB = {
                        ...batchDB.toObject(),
                        reserved: batchDB.reserved - batch.quantity,
                        available: batchDB.available + batch.quantity
                    }

                    await BatchMaterialModel.findOneAndUpdate(
                        { 'batch': batch.batchId }, batchDB
                    )
                })
            )
        }

        if (req.body.status === 'Aprovada') {
            req.body.acceptedAt = currentDate

            await Promise.all(
                batchesToUpdate.map(async (batch) => {

                    let batchDB = await BatchMaterialModel.findOne({ 'batch': batch.batchId })

                    batchDB = {
                        ...batchDB.toObject(),
                        reserved: batchDB.reserved - batch.quantity,
                        using: batchDB.using + batch.quantity
                    }

                    await BatchMaterialModel.findOneAndUpdate(
                        { 'batch': batch.batchId }, batchDB
                    )
                })
            )
        }

        await QuoteModel.findByIdAndUpdate({ '_id': _id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json({
                    quote: response,
                    msg: `Cotação ${response.number} ${response.status.toUpperCase()} com sucesso.`
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new QuoteController()