const NFModel = require('../model/NFModel')

const NFValidation = async (req, res, next) => {
    if (!req.body.number)
        return res.status(400).json({ error: 'O número da NF é de preenchimento obrigatório.' })
    else if (!req.body.date)
        return res.status(400).json({ error: 'A data de emissão é de preenchimento obrigatório.' })
    else if (!req.body.value)
        return res.status(400).json({ error: 'O valor da NF é de preenchimento obrigatório.' })
    else if (!req.body.serviceOrder)
        return res.status(400).json({ error: 'A OS é de preenchimento obrigatório.' })
    else if (!req.body.clientId)
        return res.status(400).json({ error: 'É necessário víncular a Nf com um Client Id.' })

    next()
}

module.exports = NFValidation;