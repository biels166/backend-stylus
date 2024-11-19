const { model } = require('mongoose')
const NFModel = require('../model/NFModel')

class NFController {
    async register(req, res) {
        const user = new NFModel(req.body)
        await user
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        await NFModel.find({ clientId: { '$eq': req.params.id } })
            .then(response => {
                return res.status(200).json(response.sort((a,b) => b.date - a.date))
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}

module.exports = new NFController()