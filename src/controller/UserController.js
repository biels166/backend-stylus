const { model } = require('mongoose')
const UserModel = require('../model/UserModel')
const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')
const { env } = require('node:process')
const ProtectRoles = require('../utils/ProtectRoles')
const ExtractRoles = require('../utils/ExtractRoles')

class UserController {
    async register(req, res) {
        try {
            const { name, password, email, user, callFromFront } = req.body

            const passwordEntered = !callFromFront ? password : CryptoJS.AES.decrypt(password, env.SCRT_INTEGRATION).toString(CryptoJS.enc.Utf8)

            const salt = await bcrypt.genSalt(12)
            const passwordhash = await bcrypt.hash(passwordEntered, salt)

            if (callFromFront) {
                const primitiveRoles = ExtractRoles(req.body.roles)
                req.body.roles = primitiveRoles
            }

            await new UserModel({
                ...req.body, name, user, email, password: passwordhash
             }).save()
                .then(response => {
                    return res.status(200).json({
                        user: response,
                        msg: 'Usuário cadastrado com sucesso.'
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

    async update(req, res) {
        try {
            if (req.body.callFromFront) {
                const primitiveRoles = ExtractRoles(req.body.roles)
                req.body.roles = primitiveRoles
            }

            await UserModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true }, '-password')
                .then(response => {
                    return res.status(200).json({
                        user: response,
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

    async listUser(req, res) {
        const { pageNumber, rowsPage } = req.body

        try {
            const total = await UserModel.countDocuments()
            const pages = Math.ceil(total / rowsPage)

            const usersFromDB = await UserModel.find({ _id: { '$ne': null } }, '-password')
                .sort('name')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            const users = await Promise.all(
                usersFromDB.map(async (user) => ({
                    ...user.toObject(),
                    roles: await ProtectRoles(user.roles),
                }))
            );

            return await res.status(200).json({
                total,
                pages,
                users
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async getUserById(req, res) {
        await UserModel.findById(req.params.id, '-password')
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
        await UserModel.find({ 'email': req.params.email }, '-password')
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
        const { name, pageNumber, rowsPage } = req.body
        try {
            const total = await UserModel.countDocuments({
                name: { $regex: name, $options: 'i' }
            })

            const pages = Math.ceil(total / rowsPage)

            const usersFromDB = await UserModel.find({
                name: { $regex: name, $options: 'i' }
            }, '-password')
                .sort('name')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            const users = await Promise.all(
                usersFromDB.map(async (user) => ({
                    ...user.toObject(),
                    roles: await ProtectRoles(user.roles),
                }))
            );

            return await res.status(200).json({
                total,
                pages,
                users
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async delete(req, res) {
        await UserModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ message: 'Usuário removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listEmails(req, res) {
        await UserModel.find({ _id: { '$ne': null } })
            .sort('name')
            .then(response => {
                return res.status(200).json(response.map(i => i.email))
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}

module.exports = new UserController()