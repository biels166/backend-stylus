const MaterialValidations = async (req, res, next) => {
    if (!req.body.categoryId) {
        return res.status(500).json({ error: 'O ID da categoria é obrigatório.' });
    } else if (!req.body.itemId) {
        return res.status(500).json({ error: 'O ID do item é obrigatório.' });
    } else if (!req.body.quantity) {
        return res.status(400).json({ error: 'A quantidade do material é obrigatória.' });
    } else if (!req.body.quantityReference) {
        return res.status(400).json({ error: 'A quantidade de referência é obrigatória.' });
    } else if (!req.body.type) {
        return res.status(400).json({ error: 'O tipo do material é obrigatório.' });
    } else if (!req.body.typeReference) {
        return res.status(400).json({ error: 'O tipo de referência é obrigatório.' });
    } else if (!req.body.totalCost) {
        return res.status(400).json({ error: 'O custo total do material é obrigatório.' });
    } else if (!req.body.costPerItem) {
        return res.status(400).json({ error: 'O custo por unidade é obrigatório.' });
    } else if (!req.body.purchasedIn) {
        return res.status(400).json({ error: 'A data de compra do material é obrigatória.' });
    }

    next()
}

module.exports = MaterialValidations
