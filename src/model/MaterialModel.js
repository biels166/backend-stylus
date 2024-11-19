const mongoose = require('../config/database')
const Schema = mongoose.Schema

const MaterialModel = new Schema({
    code: {type: String},
    materialCode: {type: Number, required: true},
    itemCode: {type: Number},
    material:  {type: String, required: true},
    type: {type: String}, //ROLO, PACOTE, ETC....
    referenceQtd: {type: Number, required: true},
    referenceType: {type: String, required: true}, //MTS, PCT, KG, L, FOLHAS
    materialValue: {type: Number, required: true},
    itemValue: {type: Number}, //valor unitário
    value: {type: Number},
    quantity: {type: Number, required: true},
    format: {type: String, required: true},
    obs: {type: String, default: ""}
})

module.exports = mongoose.model('MAterial', MaterialModel)