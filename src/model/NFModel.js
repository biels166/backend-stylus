const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const NFSchema = new Schema({
    number: { type: String, required: true },
    date: { type: Date, required: true },
    value: { type: Number, required: true },
    serviceOrder: { type: String },
    clientId: { type: String },
    obs: { type: String }
})

module.exports = mongoose.model('NF', NFSchema)