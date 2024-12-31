const BatchMaterialModel = require("../model/BatchMaterialModel")
const ItemCategoryModel = require("../model/ItemCategoryModel")
const CategoryModel = require("../model/CategoryModel")

class StockController {
    async listStockControl(req, res) {
        try {
            //Obtendo os itens das categorias de materiais
            const supplierCategories = await CategoryModel
                .find({ _id: { '$ne': null }, isMaterialCategory: true }).sort('code')

            let options = {}

            options = supplierCategories.map(category => ({
                ...options,
                'categoryCode': category.code
            }))

            const total = await ItemCategoryModel
            .countDocuments({ $or: [...options] }).sort('itemCode')
            const pages = 1

            const itens = await ItemCategoryModel
                .find({ $or: [...options] }).sort('itemCode')

            console.log(itens)

            //obtendo lotes
            const batches = await BatchMaterialModel
                .find({ _id: { '$ne': null } }).sort('batch')

            //agrupando os lotes por item
            let stockControl = []

            stockControl = itens.map(item => ({
                description: `${item.itemCode} - ${item.name}`,
                itemCode: item.itemCode,
                name: item.name,
                counterBatches: batches?.filter(b => b.itemId === item.itemCode).length,
                quantityConsumed: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.consumed, 0),
                quantityReserved: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.reserved, 0),
                quantityAvailable: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.total, 0)
            }))

        //    stockControl = stockControl.filter(s => s.counterBatches > 0)

            return res.status(200).json({
                total,
                pages,
                stockControl
            })
        }
        catch (error) {
            console.log(error)
            return res.status(522).json({ error: 'Ocorreu um erro inesperado' })
        }
    }
}

module.exports = new StockController()