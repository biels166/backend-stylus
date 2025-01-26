const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const OfferedSchema = new Schema({
    partnerId: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    observation: { type: String }
})

module.exports = mongoose.model('Offered', OfferedSchema)