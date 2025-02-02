const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const BatchMaterialModel = new Schema({
    batch: { type: String, required: true },
    total: { type: Number, required: true },
    reserved: { type: Number },
    using: { type: Number },
    consumed: { type: Number },
    available: { type: Number },
    totalCost: { type: Number, required: true },
    costPerItem: { type: Number, required: true },
    itemId: { type: String }
})

module.exports = mongoose.model('Batch', BatchMaterialModel)