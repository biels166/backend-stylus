const ProductModel = require('../model/ProductModel')

const ProductValidation = async (req, res, next) => {
    const { product, value, isProduct } = req.body

    if (!product)
        return res.status(400).json({ error: 'O Produto é de preenchimento obrigatório.' })
    else if (!value)
        return res.status(400).json({ error: 'O Valor é de preenchimento obrigatório.' })
    else if (value.toString().replace(/[0-9.,]+/g, "").length > 0) 
        return res.status(400).json({ error: 'O Valor informado é inválido.' })
    else if (isProduct === undefined)
        return res.status(500).json({ error: 'Favor informar o tipo do produto.' })

    next()
}

module.exports = ProductValidation;