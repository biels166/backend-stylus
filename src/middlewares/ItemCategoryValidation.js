const ItemCategoryModel = require("../model/ItemCategoryModel")

const ItemCategoryValidation = async (req, res, next) => {
    const { name, categoryCode } = req.body
    const id = req.params.id

    if (!name)
        return res.status(400).json({ error: 'O nome do item é de preenchimento obrigatório.' })

    if (!id) {
        if (!categoryCode || categoryCode === 0)
            return res.status(400).json({ error: 'A categoria do material é de seleção obrigatória.' })
        else {
            let exists = await ItemCategoryModel.countDocuments(
                {
                    name: name.trim(),
                    categoryCode: categoryCode
                }
            )

            if (exists > 0)
                return res.status(400).json({ error: 'Item já cadastrado para esta categoria.' })
        }
    }
    else {
        let exists = await ItemCategoryModel.countDocuments(
            {
                name: name.trim(),
                categoryCode: categoryCode,
                _id: { '$ne': id }
            }
        )

        if (exists > 0)
            return res.status(400).json({ error: 'Item já cadastrado para esta categoria.' })
    }
    next()
}

module.exports = ItemCategoryValidation;
