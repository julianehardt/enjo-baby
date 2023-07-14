const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraRoupa(request, response){
    response.json({
        descricao: 'Macacão Carters',
        tamanho: 'tam2',
        valor: 'R$20,00',
        foto: 'foto da roupa'
    })

}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/roupas', mostraRoupa))
app.listen(porta, mostraPorta)