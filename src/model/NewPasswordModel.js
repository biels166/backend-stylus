const mongoose = require('../config/database')
const Schema = mongoose.Schema

const NewPasswordSchema = new Schema({
    email: {type: String, required: true},
    codeValidation: {type: String},
    password: {type: String},
    confirmPassword: {type: String},
    operationId: {type: Number}
})

module.exports = mongoose.model('NewPasswordSolicitation', NewPasswordSchema)