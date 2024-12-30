const ClientValidation = async (req, res, next) => {
    if (!req.body.document)
        return res.status(400).json({ error: 'O Documento é de preenchimento obrigatório.' })
    else if (!req.body.name)
        return res.status(400).json({ error: 'O Nome é de preenchimento obrigatório.' })
    else if (!req.body.street)
        return res.status(400).json({ error: 'O Endereço é de preenchimento obrigatório.' })
    else if (!req.body.number)
        return res.status(400).json({ error: 'O Número do endereço é de preenchimento obrigatório.' })
    else if (!req.body.district)
        return res.status(400).json({ error: 'O Bairro é de preenchimento obrigatório.' })
    else if (!req.body.state)
        return res.status(400).json({ error: 'O Estado (UF) é de preenchimento obrigatório.' })
    else if (!req.body.city)
        return res.status(400).json({ error: 'A Cidade é de preenchimento obrigatório.' })
    else if (!req.body.telephone && !req.body.cellphone)
        return res.status(400).json({ error: 'Informe pelo menos um número para contato telefônico.' })
    else {
        let docOnlyNumber = req.body.document.replace(/\D/g, '')
        let doclength = docOnlyNumber.length

        if (doclength !== 11 && doclength !== 14) 
            return res.status(400).json({ error: 'Documento inválido.' })
    }

    next()
}

module.exports = ClientValidation;