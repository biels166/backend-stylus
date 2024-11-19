const { model } = require('mongoose')
const UserModel = require('../model/UserModel')

class UserController {
    async register(req, res) {
        const user = new UserModel(req.body)
        await user
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        await UserModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listUser(req, res) {
        await UserModel.find({ _id: { '$ne': null } })
            .sort('name')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getUserById(req, res) {
        await UserModel.findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getUserByEmail(req, res) {
        await UserModel.find({ 'email': req.params.email })
            .then(response => {
                if (response.length > 0) {
                    return res.status(200).json(response[0])
                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getUserByName(req, res) {
        await UserModel.find({ _id: { '$ne': null } })
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
        await UserModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ status: 'Usuário removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new UserController()