const mongoose = require('mongoose')
const { env } = require('node:process')

let connectionString = ""
let connectionType = ""
let succes_On_Create_Connection_String = false

for (let i = 1; i <= 10; i++) {
    if (env.ENVCONFIG === "PRD") {
        connectionString = `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_SECRET}@${env.CLUSTER_STYLUS}`
        connectionType = "mongodb+srv"
        succes_On_Create_Connection_String = true
        break
    }
    else if (env.ENVCONFIG === "DEV") {
        connectionString = env.LOCALHOST
        connectionType = "mongodb"
        succes_On_Create_Connection_String = true
        break
    }
    else {
        console.log(`Configurando ambiente ${i}....`)
        
        const setEnvironmentConfig = require('./environment.js')
        setEnvironmentConfig()
    }
}

if (succes_On_Create_Connection_String) {
    mongoose.connect(connectionString)
        .then(console.log(`Conexão ${connectionType}`))
        .catch(erro => console.error("Erro ao conectar: ", erro))
}
else {
    throw new Error("Ocorreu um erro ao criar Connection String.")
}

async function connectDB() {
    if (!succes_On_Create_Connection_String) {
        throw new Error('Ocorreu um erro ao criar Connection String.');
    }

    try {
        console.log(`🟢 Conexão ${mongoose.connection.readyState} estabelecida com sucesso!`)
    } catch (error) {
        console.error('🔴 Erro ao conectar: ', error)
        process.exit(1)
    }
}

module.exports = {mongoose, connectDB}
