const MaterialModel = require('../model/MaterialModel')

const MaterialUpdateValidations = async (req, res, next) => {
    if (!req.body.material)
        return res.status(400).json({ error: 'O material é de preenchimento obrigatório.' })
    else if (!req.body.code)
        return res.status(400).json({ error: 'O código do material é de preenchimento obrigatório.' })
    else if (!req.body.referenceQtd)
        return res.status(400).json({ error: 'A quantidade de referência é de preenchimento obrigatório.' })
    else if (!req.body.referenceType)
        return res.status(400).json({ error: 'O tipo de referência do material é de preenchimento obrigatório.' })
    else if (!req.body.materialValue)
        return res.status(400).json({ error: 'O valor pago no material é de preenchimento obrigatório.' })
    else if (!req.body.quantity)
        return res.status(400).json({ error: 'A quantidade de material útil é de preenchimento obrigatório.' })
    else if (!req.body.format)
        return res.status(400).json({ error: 'O formato do material é de preenchimento obrigatório.' })
        
    next()
}

module.exports = MaterialUpdateValidations;