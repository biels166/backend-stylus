const OfferedModel = require("../model/OfferedModel")

const OfferedValidation = async (req, res, next) => {
    if (!req.body.partnerId)
        return res.status(400).json({ error: 'O produto ou serviço oferecido deve ser relacionado com um parceiro.' })
    else if (!req.body.name)
        return res.status(400).json({ error: 'O Nome é de preenchimento obrigatório.' })
    else if (!req.body.value || req.body.value === 0)
        return res.status(400).json({ error: 'O Valor é de preenchimento obrigatório.' })
    else if (req.params.id) {
        let exists = await OfferedModel.countDocuments(
            {
                name: req.body.name,
                partnerId: { '$eq': req.body.partnerId },
                _id: { '$ne': req.params.id}

            })

        if (exists)
            return res.status(400).json({ error: 'Produto ou serviço oferecido já cadastrado para este parceiro.' })
    }
    next()
}

module.exports = OfferedValidation;