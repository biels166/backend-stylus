const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const QuoteProductSchema = new Schema({
    productId: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    total: { type: Number }
})
module.exports = mongoose.model('QuoteProduct', QuoteProductSchema)

const QuoteServiceSchema = new Schema({
    serviceId: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    total: { type: Number }
})
module.exports = mongoose.model('QuoteService', QuoteServiceSchema)

const QuoteMaterialsSchema = new Schema({
    itemCode: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    batchId: { type: String, required: true },
    batchValue: { type: Number, required: true },
})
module.exports = mongoose.model('QuoteMaterials', QuoteMaterialsSchema)

const QuotePartnerServicesSchema = new Schema({
    itemCode: { type: String, required: true },
    service: { type: String, required: true },
    value: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    outsourcedId: { type: String, required: true },
    outsourcedName: { type: String, required: true },
})
module.exports = mongoose.model('QuotePartnerServices', QuotePartnerServicesSchema)

const QuoteSchema = new Schema({
    number: { type: String },
    budgetLink: { type: String },
    budgetDocId: { type: String },
    sequential: { type: Number },
    status: { type: String, default: "Em Aprovação" },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    acceptedAt: { type: Date },
    canceledAt: { type: Date },
    deliveryDate: { type: Date },
    discount: { type: Number },
    urgencyRate: { type: Number },
    deliveryRate: { type: Number },
    productsValue: { type: Number },
    servicesValue: { type: Number },
    materialsCost: { type: Number },
    partnerServicesCost: { type: Number },
    totalWithoutRate: { type: Number },
    totalWithRate: { type: Number },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    productList: [{ type: QuoteProductSchema, ref: 'QuoteProductSchema' }],
    serviceList: [{ type: QuoteServiceSchema, ref: 'QuoteServiceSchema' }],
    materialList: [{ type: QuoteMaterialsSchema, ref: 'QuoteMaterials' }],
    partnerServiceList: [{ type: QuotePartnerServicesSchema, ref: 'QuotePartnerServices' }],
})

module.exports = mongoose.model('Quote', QuoteSchema)