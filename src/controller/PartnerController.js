const PartnerModel = require('../model/PartnerModel')
const ContactModel = require('../model/ContactModel')
const OfferedModel = require('../model/OfferedModel')

class PartnerController {
    async register(req, res) {
        await new PartnerModel({ ...req.body })
            .save()
            .then(response => {
                return res.status(200).json({
                    partner: response,
                    msg: 'Parceiro cadastrado com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        try {
            await PartnerModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json({
                        partner: response,
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
        const { name, partnerType, filterChips, pageNumber, rowsPage } = req.body

        let filter = { _id: { '$ne': null } }

        try {

            if (name)
                filter = { ...filter, name: { $regex: name, $options: 'i' } }

            if (partnerType === 'Fornecedores')
                filter = { ...filter, isSupplier: { '$eq': true } }

            if (partnerType === 'Terceiros')
                filter = { ...filter, isOutsourced: { '$eq': true } }

            if (filterChips && filterChips?.length > 0) {
                let options = {}

                options = filterChips?.map(code => ({
                    ...options,
                    categories: { $regex: code, $options: 'i' }
                }))

                filter = { ...filter, $or: [...options] }
            }

            const total = await PartnerModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            const partners = await PartnerModel.find(filter)
                .sort('name')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            return await res.status(200).json({
                total,
                pages,
                partners
            })
        }
        catch (error) {
            console.error('erro ao obter lista de parceiros', error)
            return res.status(500).json(error)
        }
    }

    async delete(req, res) {
        const { id } = req.params
        await PartnerModel.findByIdAndDelete(id)
            .then(async response => {
                await ContactModel.deleteMany({ personId: { '$eq': id } })

                return res.status(200).json({ message: 'Parceiro removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getPartnerById(req, res) {
        await PartnerModel.findById(req.params.id)
            .then(async response => {
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Parceiro não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getSuppliers(req, res) {

        let filter = {
            _id: { '$ne': null },
            isSupplier: { '$eq': true },
            categories: { $regex: req.params.category, $options: 'i' }
        }

        try {
            const total = await PartnerModel.countDocuments(filter)

            const pages = 1

            const partners = await PartnerModel.find(filter)
                .sort('name')

            return await res.status(200).json({
                total,
                pages,
                partners
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async getOutsourced(req, res) {
        let filter = {
            _id: { '$ne': null },
            isOutsourced: { '$eq': true },
            categories: { $regex: req.params.category, $options: 'i' }
        }

        try {
            const total = await PartnerModel.countDocuments(filter)

            const pages = 1

            const partners = await PartnerModel.find(filter)
                .sort('name')

            return await res.status(200).json({
                total,
                pages,
                partners
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async registerOffered(req, res) {
        await new OfferedModel({ ...req.body })
            .save()
            .then(response => {
                return res.status(200).json({
                    offered: response,
                    msg: 'Cadastrado com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async updateOffered(req, res) {
        try {
            await OfferedModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json({
                        offered: response,
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

    async listOffered(req, res) {
        const { partnerId, name, pageNumber, rowsPage } = req.body

        let filter = { _id: { '$ne': null } }

        if (partnerId) {
            filter = {...filter, partnerId: { '$eq': partnerId }}
        }

        if (name) {
            filter = {...filter, name: { '$eq': name }}
        }

        try {
            const total = await OfferedModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            const offered = await OfferedModel.find(filter)
                .sort('name')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            return await res.status(200).json({
                total,
                pages,
                offered
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async deleteOffered(req, res) {
        const { id } = req.params
        await OfferedModel.findByIdAndDelete(id)
            .then(async response => {
                await ContactModel.deleteMany({ personId: { '$eq': id } })

                return res.status(200).json({ message: 'Removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new PartnerController()