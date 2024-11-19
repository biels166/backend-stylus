const mongoose = require('mongoose')
require('dotenv').config()

let url = ""

if (process.env.ENVCONFIG === "PRD") {
    const user = process.env.MONGO_DB_USER
    const secret = process.env.MONGO_DB_SECRET

    url = `mongodb+srv://${user}:${secret}@clusterstylus.tfhgf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterStylus`
}
else
    url = 'mongodb://localhost:27017/stylus'


mongoose.connect(url)

module.exports = mongoose