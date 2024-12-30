const CategoryModel = require("../model/CategoryModel")

const CategoryValidation = async (req, res, next) => {
    const { name, code, isMaterialCategory } = req.body

    if (!name)
        return res.status(400).json({ error: 'O nome da categoria do material é de preenchimento obrigatório.' })
    else if (!code || code === 0)
        return res.status(400).json({ error: 'O código da categoria de preenchimento obrigatório.' })
    else if (isMaterialCategory === '' || isMaterialCategory === null || isMaterialCategory === undefined)
        return res.status(400).json({ error: 'O tipo da categoria de seleção é obrigatória.' })
    else {
        let exists = await CategoryModel.countDocuments(
            {
                $or: [
                    { 'name': name },
                    { 'code': code }
                ]
            })

        if (exists)
            return res.status(400).json({ error: 'Código ou nome já cadastrado.' })
    }

    next()
}

module.exports = CategoryValidation;

