const mongoose = require('../config/database')
const Schema = mongoose.Schema

const CategoryModel = new Schema({
    code: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String}
})

module.exports = mongoose.model('Category', CategoryModel)
