const Grid = require('mongoose-gridfs');
const { mongoose, connectDB } = require('../config/database');

let GridFSBucketModel = null;

// Aguarda a conexão antes de criar o modelo
async function initializeGridFS() {
    await connectDB(); // Aguarda a conexão com o MongoDB

    if (!GridFSBucketModel) {
        console.log('🟢 Inicializando modelo do GridFS...');
        GridFSBucketModel = Grid.createModel({
            modelName: 'Document',
            connection: mongoose.connection, // Conexão agora garantida
        });
    }
}

async function getGridFSModel() {
    if (!GridFSBucketModel) {
        await initializeGridFS();
    }
    console.log(GridFSBucketModel)
    
    return GridFSBucketModel;
}

module.exports = { getGridFSModel };
