const mongoose = require('mongoose')
require('dotenv').config()

async function conectabancoDeDados(){
    try {
        console.log('Conexão com banco de dados iniciou')

    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conexão com banco de dados feita com sucesso')
    } catch (erro){
        console.log(erro)
    }
}

module.exports = conectabancoDeDados

//mongoose é uma biblioteca que faz o meio de campo entre o MongoDB (bando de dados na nuvem) e o projeto JS.
