const mongoose = require('../config/database')
const Schema = mongoose.Schema

const MaterialAuxSchema = new Schema({
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    quantityItens: { type: Number, required: true}
})

module.exports = mongoose.model('MaterialAux', MaterialAuxSchema)

const ProductAuxSchema = new Schema({
    material: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantityItens: { type: Number, required: true}
})

module.exports = mongoose.model('ProductAux', ProductAuxSchema)

const QuoteSchema = new Schema({
    createdAt: { type: Date},
    updatedAt: { type: Date},
    number: { type: String },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'ProductAux', required: true }],
    materials: [{ type: Schema.Types.ObjectId, ref: 'MaterialAux', required: true }],
    calculatedValue: { type: Number }, //Será enviado pelo front
    discount: { type: Number },
    tax: { type: Number },
    deliveryTax: { type: Number },
    deliveryDate: { type: Date },
    finalValue: { type: Number }, //Quando tiver o front será obrigatório
    //finalValue: { type: Number, required: true }, //Valor inserido manualmente pelo ADM após exibição dos calculos
    status: { type: String, default: "Em aprovação" },
    acceptedAt: { type: Date },
    canceledAt: { type: Date },
    obs: { type: String },
    sequential: { type: Number }
})

module.exports = mongoose.model('Quote', QuoteSchema)