const CategoryModel = require("../model/CategoryModel")
const ItemCategoryModel = require("../model/ItemCategoryModel")


class CategoryController {
    async register(req, res) {
        const { name, code } = req.body

        let body = {
            ...req.body,
            description: `${code} - ${name}`
        }

        await new CategoryModel(body)
            .save()
            .then(response => {
                return res.status(200).json({
                    category: response,
                    msg: 'Categoria de material cadastrada com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async listCategories(req, res) {
        await CategoryModel.find({ _id: { '$ne': null } })
            .then(response => {
                return res.status(200).json({
                    options: response
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async registerItem(req, res) {
        try {
            const { categoryCode } = req.body

            const itens = await ItemCategoryModel.find({ categoryCode: { '$eq': categoryCode } })
            let code = itens?.length === 0 ? 1 : parseInt(itens[itens?.length - 1].code) + 1

            let body = {
                ...req.body,
                code,
                itemCode: `${categoryCode}.${code}`
            }

            await new ItemCategoryModel(body)
                .save()
                .then(response => {
                    return res.status(200).json({
                        item: response,
                        msg: 'Item cadastrado com sucesso.'
                    })
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }

    async updateItem(req, res) {
        try {
            await ItemCategoryModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json({
                        item: response,
                        msg: 'Atualizações salvas com sucesso.'
                    })
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }

    async deleteItem(req, res) {
        await ItemCategoryModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ message: 'Item removido com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getItensByCategory(req, res) {
        const { categoryCode, pageNumber, rowsPage } = req.body
        try {
            let filter = { _id: { '$ne': null } }

            if (categoryCode) {
                filter = { ...filter, categoryCode: { '$eq': categoryCode } }
            }

            const total = await ItemCategoryModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            await ItemCategoryModel.find(filter)
                .sort('itemCode')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)
                .then(response => {
                    return res.status(200).json({
                        total,
                        pages,
                        itens: response
                    })
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }
}

module.exports = new CategoryController()