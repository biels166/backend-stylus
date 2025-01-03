const BatchMaterialModel = require("../model/BatchMaterialModel")
const ItemCategoryModel = require("../model/ItemCategoryModel")
const CategoryModel = require("../model/CategoryModel")

class StockController {
    async listStockControl(req, res) {
        const { itemId, pageNumber, rowsPage } = req.body

        console.log('filtro recebido', req.body)

        try {
            //Obtendo os itens das categorias de materiais
            let materialFilter = { _id: { '$ne': null }, isMaterialCategory: true }

            if (itemId) {
                materialFilter = { ...materialFilter, code: itemId?.split(".")[0] }
            }

            const materialCategories = await CategoryModel
                .find(materialFilter).sort('code')

            let filterItem = { _id: { '$ne': null } }

            if (itemId) {
                filterItem = { ...filterItem, itemCode: itemId }
            }
            else {
                let options = {}

                options = materialCategories.map(category => ({
                    ...options,
                    'categoryCode': category.code
                }))

                filterItem = { $or: [...options] }
            }

            //obtendo lotes
            let filterBatch = { _id: { '$ne': null } }

            const batches = await BatchMaterialModel
                .find(filterBatch).sort('batch')

            const total = await ItemCategoryModel
                .countDocuments(filterItem).sort('itemCode')

            const pages = Math.ceil(total / rowsPage)

            const itens = await ItemCategoryModel
                .find(filterItem)
                .sort('itemCode')
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            //agrupando os lotes por item
            let stockControl = []

            stockControl = itens.map(item => ({
                description: `${item.itemCode} - ${item.name}`,
                itemCode: item.itemCode,
                categoryCode: parseInt(item.itemCode.split(".")[0]),
                name: item.name,
                counterBatches: batches?.filter(b => b.itemId === item.itemCode).length,
                quantityPurcashed: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.total, 0),
                quantityReserved: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.reserved, 0),
                quantityUsing: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.using, 0),
                quantityConsumed: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.consumed, 0),
                quantityAvailable: batches?.filter(b => b.itemId === item.itemCode).reduce((accumulator, b) => accumulator + b.available, 0)
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