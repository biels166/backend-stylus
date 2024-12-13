const { model, default: mongoose } = require('mongoose')
const ClientModel = require('../model/ClientModel')
const ContactModel = require('../model/ContactModel')
const NFModel = require('../model/NFModel')

class ClientController {
    async register(req, res) {
        await new ClientModel({ ...req.body })
            .save()
            .then(response => {
                return res.status(200).json({
                    user: response,
                    msg: 'Cliente cadastrado com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        try {
            await ClientModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true }, '-password')
                .then(response => {
                    return res.status(200).json({
                        client: response,
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

    async list(req, res) {
        const { pageNumber, rowsPage } = req.body

        try {
            const total = await ClientModel.countDocuments()
            const pages = Math.ceil(total / rowsPage)

            const clients = await ClientModel.find({ _id: { '$ne': null } })
                .sort('name')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            return await res.status(200).json({
                total,
                pages,
                clients
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async getClientById(req, res) {
        await ClientModel.findById(req.params.id)
            .then(async response => {
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Cliente não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getClientsByName(req, res) {
        const { name, pageNumber, rowsPage } = req.body
        try {
            const total = await ClientModel.countDocuments({
                name: { $regex: name, $options: 'i' }
            })

            const pages = Math.ceil(total / rowsPage)

            const clients = await ClientModel.find({
                name: { $regex: name, $options: 'i' }
            })
                .sort('name')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            return await res.status(200).json({
                total,
                pages,
                clients
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async delete(req, res) {
        const {id} = req.params
        await ClientModel.findByIdAndDelete(id)
        .then(async response => {
            await ContactModel.deleteMany({ clientId: { '$eq': id } })
            await NFModel.deleteMany({ clientId: { '$eq': id } })

            return res.status(200).json({ message: 'Cliente removido com sucesso' })
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}
}

module.exports = new ClientController()