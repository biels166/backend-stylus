const ServiceOrderModel = require('../model/ServiceOrderModel')

const ServiceOrderValidation = async (req, res, next) => {
    const { client, products, materials, finalValue, isManual, deliveryDate } = req.body

    if (isManual) {
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
    }
    next()
}

module.exports = ServiceOrderValidation;