const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const ServiceOrderProductSchema = new Schema({
    productId: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    total: { type: Number }
})
module.exports = mongoose.model('ServiceOrderProduct', ServiceOrderProductSchema)

const ServiceOrderServiceSchema = new Schema({
    serviceId: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    total: { type: Number }
})
module.exports = mongoose.model('ServiceOrderService', ServiceOrderServiceSchema)

const ServiceOrderMaterialsSchema = new Schema({
    itemCode: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantityUsed: { type: Number },
    totalCost: { type: Number, required: true },
    batchId: { type: String, required: true },
    batchValue: { type: Number, required: true },
})
module.exports = mongoose.model('ServiceOrderMaterials', ServiceOrderMaterialsSchema)

const ServiceOrderPartnerServicesSchema = new Schema({
    itemCode: { type: String, required: true },
    service: { type: String, required: true },
    value: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    outsourcedId: { type: String, required: true },
    outsourcedName: { type: String, required: true },
})
module.exports = mongoose.model('ServiceOrderPartnerServices', ServiceOrderPartnerServicesSchema)

const ServiceOrderSchema = new Schema({
    number: { type: String },
    status: { type: String, default: "Em Execução" },
    quoteNumber: { type: String }, 
    quoteStatus: { type: String, default: "Aprovada" }, 
    budgetLink: { type: String },
    budgetDocId: { type: String },
    createdAt: { type: Date },
    completedAt: { type: Date },
    deliveryDate: { type: Date },
    deliveredAt: { type: Date },
    paymentMethod: { type: String },
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
    productList: [{ type: ServiceOrderProductSchema, ref: 'ServiceOrderProduct' }],
    serviceList: [{ type: ServiceOrderServiceSchema, ref: 'ServiceOrderService' }],
    materialList: [{ type: ServiceOrderMaterialsSchema, ref: 'ServiceOrderMaterials' }],
    partnerServiceList: [{ type: ServiceOrderPartnerServicesSchema, ref: 'ServiceOrderPartnerServices' }],
})

module.exports = mongoose.model('ServiceOrder', ServiceOrderSchema)