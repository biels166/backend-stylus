const mongoose = require('../config/database')
const Schema = mongoose.Schema

const BatchMaterialModel = new Schema({
    batch: {type: String, required: true},
    quantity: {type: Number, required: true},
    reserved: {type: Number},
    consumed: {type: Number},
    total: {type: Number},
    itemId: {type: String}
})

module.exports = mongoose.model('Batch', BatchMaterialModel)