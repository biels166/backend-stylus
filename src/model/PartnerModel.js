const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const PartnerSchema = new Schema({
    isSupplier: { type: Boolean },
    isOutsourced: { type: Boolean },
    categories: { type: String },
    type: { type: String, required: true },
    name: { type: String, required: true },
    document: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    cellphone: { type: String },
    street: { type: String },
    number: { type: String },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    complement: { type: String },
})

module.exports = mongoose.model('Partner', PartnerSchema)