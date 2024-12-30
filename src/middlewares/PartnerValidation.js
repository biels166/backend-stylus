const PartnerValidation = async (req, res, next) => {
    if (!req.body.document)
        return res.status(400).json({ error: 'O Documento é de preenchimento obrigatório.' })
    else if (!req.body.name)
        return res.status(400).json({ error: 'O Nome é de preenchimento obrigatório.' })
    else if (!req.body.phone && !req.body.cellphone)
        return res.status(400).json({ error: 'Informe pelo menos um número para contato telefônico.' })
    else if (!req.body.isSupplier && !req.body.isOutsourced)
        return res.status(500).json({ error: 'Informe o vínculo com o parceiro.' })
    else if (!req.body.categories && req.body.categories?.length === 0)
        return res.status(400).json({ error: 'Informar ao menos uma categoria para o parceiro.' })
    else {
        let docOnlyNumber = req.body.document.replace(/\D/g, '')
        let doclength = docOnlyNumber.length

        if (doclength !== 11 && doclength !== 14)
            return res.status(400).json({ error: 'Documento inválido.' })
    }

    next()
}

module.exports = PartnerValidation;