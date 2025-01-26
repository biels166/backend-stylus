const { mongoose } = require('../config/database')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String }],
    admnistrator: { type: Boolean },
})

module.exports = mongoose.model('User', UserSchema)