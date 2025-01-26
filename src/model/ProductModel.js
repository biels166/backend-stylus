const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    product: { type: String, required: true },
    value: { type: Number, required: true },
    obs: { type: String },
    isProduct: { type: Boolean, required: true }
})

module.exports = mongoose.model('Product', ProductSchema)