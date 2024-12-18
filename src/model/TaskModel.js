const mongoose = require('../config/database')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: Boolean, required: true },
    state: { type: String },
    description: { type: String },
})

module.exports = mongoose.model('Task', TaskSchema)