const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { connectDB } = require('./config/database');

const server = express()

//Configura o express para trabalhar com cors e interpretar json
server.use(cors())
server.use(express.json())

server.listen(process.env.PORT || 3000, () => {
    console.log("API ONLINE")
})

const AuthRoutes = require('./routes/AuthRouter')
server.use('/auth', AuthRoutes)

const DocumentRoutes = require('./routes/DocumentRouter')
server.use('/document', DocumentRoutes)

const TaskRoutes = require('./routes/TaskRouter')
server.use('/task', TaskRoutes)

const SendMailRoutes = require('./routes/SendMailRouter')
server.use('/mail', SendMailRoutes)

const UserRoutes = require('./routes/UserRouter')
server.use('/user', UserRoutes)

const CategoryRoutes = require('./routes/CategoryRouter')
server.use('/category', CategoryRoutes)

const MaterialRoutes = require('./routes/MaterialRouter')
server.use('/material', MaterialRoutes)

const StockControlRoutes = require('./routes/StockRouter')
server.use('/stockControl', StockControlRoutes)

const BatchRoutes = require('./routes/BatchMaterialRouter')
server.use('/batch', BatchRoutes)

const ClientRoutes = require('./routes/ClientRouter')
server.use('/client', ClientRoutes)

const PartnerRoutes = require('./routes/PartnerRouter')
server.use('/partner', PartnerRoutes)

const ContactRoutes = require('./routes/ContactRouter')
server.use('/contacts', ContactRoutes)

const ProductRoutes = require('./routes/ProductRouter')
server.use('/product', ProductRoutes)

const QuoteRoutes = require('./routes/QuoteRouter')
server.use('/quote', QuoteRoutes)

const ServiceOrderRoutes = require('./routes/ServiceOrderRouter')
server.use('/serviceorder', ServiceOrderRoutes)

const NFRoutes = require('./routes/NFRouter')
server.use('/nf', NFRoutes)

connectDB().then(() => {
    console.log('connectDB concluida');
})