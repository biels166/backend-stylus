const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    type: { type: String },
    name: { type: String, required: true },
    document: { type: String },
    email: { type: String },
    telephone: { type: String },
    cellphone: { type: String },
    street: { type: String },
    number: { type: String },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    complement: { type: String },
})

module.exports = mongoose.model('Client', ClientSchema)