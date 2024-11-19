const { model, default: mongoose } = require('mongoose')
const ClientModel = require('../model/ClientModel')

class ClientController {
    async register(req, res) {
        const client = new ClientModel(req.body)
        await client
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        await ClientModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        await ClientModel.find({ _id: { '$ne': null } })
            .sort('name')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getClientById(req, res) {
        await ClientModel.findById(req.params.id)
            .then(response => {
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

    async getClientByName(req, res) {
        await ClientModel.find({ _id: { '$ne': null } })
            .sort('name')
            .then(response => {
                if (response.length > 0) {
                    if (req.params.name === '')
                        return res.status(200).json(response)
                    else {
                        let resp = response.filter(i => i.name.toLowerCase().includes(req.params.name.toLowerCase()))

                        return res.status(200).json(resp)
                    }
                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await ClientModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ status: 'Cliente removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new ClientController()