const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    name: {type: String, required: true},
    document: {type: String, required: true},
    email: {type: String},
    telephone: {type: String},
    cellphone: {type: String},
    street: {type: String, required: true},
    number: {type: String, required: true},
    district: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    complement: {type: String}
})

module.exports = mongoose.model('Client', ClientSchema)