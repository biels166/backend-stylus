const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String},
    email: {type: String},
    telephone: {type: String},
    cellphone: {type: String},
    personId: {type: String, required: true},
})

module.exports = mongoose.model('Contact', ContactSchema)