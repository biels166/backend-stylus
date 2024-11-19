const QuoteModel = require('../model/QuoteModel')

const QuoteValidation = async (req, res, next) => {
    const { client, products, materials, finalValue, deliveryDate } = req.body

    if (!client)
        return res.status(400).json({ error: 'É necessátio informar o cliente.' })
    else if (!products || products.length === 0)
        return res.status(400).json({ error: 'É necessátio informar pelo menos um produto/serviço.' })
    else if (!materials || materials.length === 0)
        return res.status(400).json({ error: 'É necessátio informar pelo menos um material/custo' })
    /*Retornar quando tiver o front
    else if (!finalValue)
        return res.status(400).json({ error: 'É necessátio informar o valor final da cotação' })
*/else if (deliveryDate < new Date())
        return res.status(400).json({ error: 'Informe uma data de entrega futura.' })

    next()
}

module.exports = QuoteValidation;