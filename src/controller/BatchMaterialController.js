const BatchMaterialModel = require("../model/BatchMaterialModel")

class BatchController {
    async getBatch(req, res) {
        await BatchMaterialModel.find({ batch: req.params.batch })
            .then(async response => {
                if (response) {
                    return res.status(200).json(response[0])
                }
                else {
                    return res.status(404).json({ error: 'Lote não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listBatchesOptions(req, res) {
        await BatchMaterialModel.find({ _id: { '$ne': null } })
            .sort('batch')
            .then(async response => {
                console.log(response)
                if (response) {
                    return res.status(200).json(response)
                }
                else {
                    return res.status(404).json({ error: 'Lote não encontrado' })
                }
            })
            .catch(error => {
                console.error(error)
                return res.status(500).json(error)
            })
    }
}

module.exports = new BatchController()