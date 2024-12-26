const { model } = require('mongoose')
const MaterialModel = require('../model/MaterialModel')

class MaterialController {
    async register(req, res) {
        try {
            const { materialValue, referenceQtd, quantity, materialCode } = req.body

            const db = await MaterialModel.find({ 'materialCode': materialCodee })

            let itemCode = db > 0 ? parseInt([db.length - 1].itemCode) + 1 : 1

            const material = new MaterialModel({
                ...req.body,
                itemValue: materialValue / referenceQtd,
                value: (materialValue / referenceQtd) / quantity,
                itemCode,
                code: `${materialCode}.${itemCode}`
            })
            await material
                .save()
                .then(response => {
                    return res.status(200).json({
                        material: response,
                        msg: 'Insumo cadastrado com sucesso.'
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
        const { material, materialCode, type, pageNumber, rowsPage} = req.body
        try {
            let filter = { _id: { '$ne': null } }

            if (material) {
                filter = { ...filter, material: { $regex: material, $options: 'i' } }
            }

            if (materialCode) {
                filter = { ...filter, materialCode: { 'eq': materialCode } }
            }

            if (type) {
                filter = { ...filter, type: { 'eq': type } }
            }

            const total = await MaterialModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            await MaterialModel.find(filter)
            .sort('materialCode')
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