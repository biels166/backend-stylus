const { model } = require('mongoose')
const MaterialModel = require('../model/MaterialModel')
const BatchMaterialModel = require('../model/BatchMaterialModel')
const ItemCategoryModel = require('../model/ItemCategoryModel')

class MaterialController {
    async register(req, res) {
        try {
            const { itemId, categoryId, quantity, quantityReference, costPerItem, totalCost } = req.body
            let body = req.body

            let batches = await MaterialModel.countDocuments({ itemId: itemId })
            let batchCounter = batches + 1
            let newBatch = `${body.itemId.replace(".", "")}${batchCounter.toString().padStart(3, "0")}`

            //Criando lote
            let totalQuantity = 0
            switch (categoryId.toString()) {
                case '100':
                    totalQuantity = quantityReference * quantity * 8
                    break;

                case '200':
                case '400':
                    totalQuantity = quantityReference * quantity
                    break;

                case '300':
                    totalQuantity = quantity
                    break;

                default:
                    totalQuantity = quantity
                    break;
            }

            await new BatchMaterialModel({
                batch: newBatch,
                total: totalQuantity,
                using: 0,
                reserved: 0,
                consumed: 0,
                available: totalQuantity,
                costPerItem: costPerItem,
                totalCost: totalCost,
                itemId: itemId
            }).save()

            //vínculando lote ao item para performance de filtro

            let item = await ItemCategoryModel.find({ itemCode: itemId })
            item = item[0]

            if (!item.batches) item = { ...item, batches: newBatch }
            else {
                let newString = `${item.batch} ${newBatch}`
                item = { ...item, batches: newString }
            }

            await ItemCategoryModel.updateOne({ ...item }, { new: true })

            body = {
                ...body,
                batch: newBatch
            }

            await new MaterialModel(body)
                .save()
                .then(response => {
                    return res.status(200).json({
                        material: response,
                        msg: 'Registro da compra de material cadastrado com sucesso.'
                    })
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            console.log('erro ao criar lote', error)
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }

    async updatePrincing(req, res) {
        try {
            const { materialValue, referenceQtd, quantity } = req.body

            await MaterialModel.findByIdAndUpdate(
                { '_id': req.params.id },
                {
                    ...req.body,
                    itemValue: materialValue / referenceQtd,
                    value: (materialValue / referenceQtd) / quantity,
                },
                { new: true }
            )
                .then(response => {
                    return res.status(200).json({
                        material: response,
                        msg: 'Atualizações salvas com sucesso.'
                    })
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }

    async delete(req, res) {
        await MaterialModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ status: 'Material removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getMaterialListByFilter(req, res) {
        const { supplierId, itemId, batch, pageNumber, rowsPage } = req.body
        try {
            let filter = { _id: { '$ne': null } }

            if (itemId) {
                filter = { ...filter, itemId: itemId }
            }

            if (supplierId) {
                filter = { ...filter, supplierId: supplierId }
            }

            if (batch) {
                filter = { ...filter, batch: { $regex: batch, $options: 'i' } }
            }

            const total = await MaterialModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            await MaterialModel.find(filter)
                .sort('itemId')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)
                .then(response => {
                    if (response.length > 0) {
                        return res.status(200).json({
                            total,
                            pages,
                            materials: response
                        })
                    }
                    else {
                        return res.status(404).json({ error: 'Material não encontrado' })
                    }
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            console.log(error)
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }


    async listCodeMat(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .distinct('materialCode')
            .then(response => {
                return res.status(200).json({
                    options: response
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listType(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .distinct('type')
            .then(response => {
                return res.status(200).json({
                    options: response
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}

module.exports = new MaterialController()