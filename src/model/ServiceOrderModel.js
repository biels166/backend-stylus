const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const MaterialSOAuxSchema = new Schema({
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    quantityItens: { type: Number, required: true }
})

module.exports = mongoose.model('MaterialSOAux', MaterialSOAuxSchema)

const ProductSOAuxSchema = new Schema({
    material: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantityItens: { type: Number, required: true }
})

module.exports = mongoose.model('ProductSOAux', ProductSOAuxSchema)

const ServiceOrderSchema = new Schema({
    createdAt: { type: Date },
    number: { type: String },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'ProductSOAux', required: true }],
    materials: [{ type: Schema.Types.ObjectId, ref: 'MaterialSOAux', required: true }],
    calculatedValue: { type: Number }, //Será enviado pelo front
    discount: { type: Number },
    tax: { type: Number },
    deliveryTax: { type: Number },
    deliveryDate: { type: Date },
    deliveredAt: { type: Date },
    finalValue: { type: Number }, //Quando tiver o front será obrigatório
    //finalValue: { type: Number, required: true }, //Valor inserido manualmente pelo ADM após exibição dos calculos
    status: { type: String, default: "Em execução" },
    obs: { type: String },
    isManual: { type: Boolean },
    sequential: { type: Number }
})

module.exports = mongoose.model('ServiceOrder', ServiceOrderSchema) 