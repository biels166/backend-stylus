const ContactModel = require('../model/ContactModel')

class ContactController {
    async register(req, res) {
        await new ContactModel({ ...req.body })
            .save()
            .then(response => {
                return res.status(200).json({
                    contact: response,
                    msg: 'Contato cadastrado com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        try {
            await ContactModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json({
                        contact: response,
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

    async getContactsByClientId(req, res) {
            const { clientId, pageNumber, rowsPage } = req.body
    
            try {
                const total = await ContactModel.countDocuments({ clientId: { '$eq': clientId } })
                const pages = Math.ceil(total / rowsPage)
    
                const contacts = await ContactModel.find({ clientId: { '$eq': clientId } })
                    .sort('name')
                    .skip((pageNumber * rowsPage))
                    .limit(rowsPage)
    
                return await res.status(200).json({
                    total,
                    pages,
                    contacts
                })
            }
            catch (error) {
                return res.status(500).json(error)
            }
    }

    async delete(req, res) {
       await ContactModel.findByIdAndDelete(req.params.id)
            .then(response => {

                return res.status(200).json({ message: 'Contato removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new ContactController()
