const mongoose = require('mongoose')

const roupaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    tamanho: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('roupa', roupaSchema)