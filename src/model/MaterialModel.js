const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const MaterialModel = new Schema({
    categoryId: { type: String, required: true },
    itemId: { type: String, required: true },
    batch: { type: String },
    quantity: { type: Number, required: true },
    quantityReference: { type: Number, required: true },
    type: { type: String, required: true }, //ROLO, PACOTE, ETC....
    typeReference: { type: String, required: true }, //MTS, PCT, KG, FOLHAS
    totalCost: { type: Number, required: true },
    costPerItem: { type: Number, required: true }, //valor unitário
    observations: { type: String, default: "" },
    supplierId: { type: String },
    purchasedIn: { type: Date, required: true }
})

module.exports = mongoose.model('Material', MaterialModel)