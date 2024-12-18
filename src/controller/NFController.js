const { model } = require('mongoose')
const NFModel = require('../model/NFModel')

class NFController {
    async register(req, res) {
        await new NFModel({ ...req.body })
            .save()
            .then(response => {
                return res.status(200).json({
                    nf: response,
                    msg: 'NFe cadastrada e vínculada com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        const { clientId, pageNumber, rowsPage } = req.body

        try {
            const total = await NFModel.countDocuments({ clientId: { '$eq': clientId } })
            const pages = Math.ceil(total / rowsPage)

            const nfs = await NFModel.find({ clientId: { '$eq': clientId } })
                .sort({ date: -1 })
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            return await res.status(200).json({
                total,
                pages,
                nfs
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            await NFModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json({
                        nf: response,
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
        await NFModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ message: 'NF removida com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new NFController()