const mongoose = require('../config/database')
const Schema = mongoose.Schema

const PartnerSchema = new Schema({
    isSupplier: {type: Boolean},
    isOutsourced: {type: Boolean},
    categories: {type: String},
    type: {type: String, required: true},
    name: {type: String, required: true},
    document: {type: String, required: true},
    email: {type: String},
    phone: {type: String},
    cellphone: {type: String},
    street: {type: String, required: true},
    number: {type: String, required: true},
    district: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    complement: {type: String},
})

module.exports = mongoose.model('Partner', PartnerSchema)