const { model } = require('mongoose')
const MaterialModel = require('../model/MaterialModel')

class MaterialController {
    async register(req, res) {
        let body = req.body
        body.itemValue = body.materialValue / body.referenceQtd
        body.value = body.itemValue / body.quantity

        await MaterialModel.find({ 'materialCode': req.body.materialCode })
            .then(response => {
                if (response.length > 0) {
                    let last = response[response.length - 1]
                    body.itemCode = parseInt(last.itemCode) + 1
                    body.code = `${body.materialCode}.${body.itemCode}`
                }
                else {
                    body.itemCode = 1
                    body.code = `${body.materialCode}.${body.itemCode}`
                }
            })

        const material = new MaterialModel(req.body)
        await material
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async updatePrincing(req, res) {
        let body = req.body
        body.itemValue = body.materialValue / body.referenceQtd
        body.value = body.itemValue / body.quantity

        await MaterialModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .sort('code')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listCodeMat(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .distinct('materialCode')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listItemCode(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .distinct('itemCode')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listType(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .distinct('type')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getMaterialById(req, res) {
        await MaterialModel.findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Material não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getMaterialByCode(req, res) {
        await MaterialModel.find({ 'code': req.body.code })
            .then(response => {
                if (response.length > 0) {
                    return res.status(200).json(response[0])
                }
                else {
                    return res.status(404).json({ error: 'Material não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getMaterialListByCode(req, res) {
        await MaterialModel.find({ 'materialCode': req.body.materialCode })
            .then(response => {
                if (response.length > 0) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Material não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getMaterialByName(req, res) {
        await MaterialModel.find({ 'material': req.body.material })
            .then(response => {
                if (response.length > 0) {
                    return res.status(200).json(response[0])
                }
                else {
                    return res.status(404).json({ error: 'Material não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
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

    async getMaterialListByCustomFilter(req, res) {
        await MaterialModel.find({ _id: { '$ne': null } })
            .then(response => {
                if (response.length > 0) {
                    let resp = response

                    if (req.body.material !== "" && resp.length > 0) {
                        resp = response.filter(i => i.material.toLowerCase().includes(req.body.material.toLowerCase()))
                    }

                    if (req.body.materialCode > 0 && resp.length > 0) {
                        resp = resp.filter(i => i.materialCode == req.body.materialCode)
                    }

                    if (req.body.itemCode > 0 && resp.length > 0) {
                        resp = resp.filter(i => i.itemCode == req.body.itemCode)
                    }

                    if (req.body.type !== "" && resp.length > 0) {
                        resp = resp.filter(i => i.type.toLowerCase().includes(req.body.type.toLowerCase()))
                    }

                    return res.status(200).json(resp)
                }
                else {
                    return res.status(404).json({ error: 'Material não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new MaterialController()