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
            .sort('code')
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

    async listItensByCategory(req, res) {
        const { categoryCode, pageNumber, rowsPage } = req.body
        try {
            let filter = { _id: { '$ne': null } }

            if (categoryCode) {
                filter = { ...filter, categoryCode: { '$eq': categoryCode } }
            }

            const total = await ItemCategoryModel.countDocuments(filter)

            const pages = Math.ceil(total / rowsPage)

            await ItemCategoryModel.find(filter)
                .sort({ categoryCode: 1, code: 1 })
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

    async getItensByCategory(req, res) {
        let options = {}

        options = req.body.map(code => ({
            ...options,
            'categoryCode': code
        }))

        try {
            let filter = { $or: [...options] }

            const total = await ItemCategoryModel.countDocuments(filter)
            const pages = 1

            await ItemCategoryModel.find(filter)
                .sort('itemCode')
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

    async getAllSupplierItens(req, res) {
        try {
            const supplierCategories = await CategoryModel.find(
                {
                    _id: { '$ne': null },
                    isMaterialCategory: true
                }
            ).sort('code')

            let options = {}

            options = supplierCategories.map(category => ({
                ...options,
                'categoryCode': category.code
            }))

            let filter = { $or: [...options] }

            const total = await ItemCategoryModel.countDocuments(filter)
            const pages = 1

            await ItemCategoryModel.find(filter)
                .sort('itemCode')
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

    async getAllOutsourcedItens(req, res) {
        try {
            const outsourcedCategories = await CategoryModel.find(
                {
                    _id: { '$ne': null },
                    isMaterialCategory: false
                }
            ).sort('code')

            let options = {}

            options = outsourcedCategories.map(category => ({
                ...options,
                'categoryCode': category.code
            }))

            let filter = { $or: [...options] }

            const total = await ItemCategoryModel.countDocuments(filter)
            const pages = 1

            await ItemCategoryModel.find(filter)
                .sort('itemCode')
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

    async getByItemCode(req, res) {
        await ItemCategoryModel.find({ itemCode: req.params.itemCode })
            .then(async response => {
                if (response) {
                    return res.status(200).json(response[0])
                }
                else {
                    return res.status(404).json({ error: 'Item não encontrado' })
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new CategoryController()