const ClientValidation = async (req, res, next) => {
    if (!req.body.name)
        return res.status(400).json({ error: 'O Nome é de preenchimento obrigatório.' })
    else if (!req.body.telephone && !req.body.cellphone)
        return res.status(400).json({ error: 'Informe pelo menos um número para contato telefônico.' })
    else if (req.body.document){
        let docOnlyNumber = req.body.document.replace(/\D/g, '')
        let doclength = docOnlyNumber.length

        if (doclength !== 11 && doclength !== 14) 
            return res.status(400).json({ error: 'Documento inválido.' })
    }

    next()
}

module.exports = ClientValidation;