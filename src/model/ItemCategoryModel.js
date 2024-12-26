const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ItemCategoryModel = new Schema({
    name: {type: String, required: true},
    code: {type: Number},
    itemCode:  {type: String},
    categoryCode: {type: Number, required: true},
})

module.exports = mongoose.model('ItemCategory', ItemCategoryModel)