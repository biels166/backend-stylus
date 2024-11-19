const express = require('express')
const cors = require("cors")

const server = express()
server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("API ONLINE")
})

const UserRoutes = require('./routes/UserRouter')
server.use('/user', UserRoutes)

const MaterialRoutes = require('./routes/MaterialRouter')
server.use('/material', MaterialRoutes)

const ClientRoutes = require('./routes/ClientRouter')
server.use('/client', ClientRoutes)

const ProductRoutes = require('./routes/ProductRouter')
server.use('/product', ProductRoutes)

const QuoteRoutes = require('./routes/QuoteRouter')
server.use('/quote', QuoteRoutes)

const ServiceOrderRoutes = require('./routes/ServiceOrderRouter')
server.use('/serviceorder', ServiceOrderRoutes)

const NFRoutes = require('./routes/NFRouter')
server.use('/nf', NFRoutes)