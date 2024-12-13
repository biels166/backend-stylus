const ContactValidation = async (req, res, next) => {
    if (!req.body.clientId)
        return res.status(500).json({ error: 'É necessário que o contato esteja vinculado com um cliente.' })
    else if (!req.body.name)
        return res.status(400).json({ error: 'O Nome é de preenchimento obrigatório.' })
    else if (!req.body.telephone && !req.body.cellphone)
        return res.status(400).json({ error: 'Informe pelo menos um número para contato telefonico.' })
    
    next()
}

module.exports = ContactValidation;