const express = require("express")//iniciando express
const router = express.Router()//primeira parte da rota
const cors = require('cors')//pacote cors para liberar para front end

const conectabancoDeDados = require('./bancoDeDados')//ligando ao arquivo bancoDeDados
conectabancoDeDados()//chama funcao que conecta bancoDeDados

const Roupa = require('./roupaModel')

const app = express()//iniciando o app
app.use(express.json())//tratando as requisicoes para que trafeguem no formato Json
app.use(cors())

const porta = 3333//criando porta

//GET
async function mostraRoupa(request, response){

    try{
        const roupasSalvasBD = await Roupa.find() 

        response.json(roupasSalvasBD)
    }catch (erro){
        console.log(erro)
    }
}
//POST
async function criaRoupa(request,response) {
    const novaRoupa = new Roupa({
        descricao: request.body.descricao,
        tamanho: request.body.tamanho,
        valor: request.body.valor,
        foto: request.body.foto
        })
    try{
        const roupaNova = await novaRoupa.save()
        response.status(201).json(roupaNova)
    }catch (erro){
    console.log(erro)
    }
}

//PATCH
async function corrigeRoupa(request, response) {
    try{
        const roupaEncontrada = await Roupa.findById(request.params.id)

        if (request.body.descricao) {
            roupaEncontrada.descricao = request.body.descricao
        }
    
        if (request.body.tamanho) {
            roupaEncontrada.tamanho = request.body.tamanho
        }
        if (request.body.valor) {
            roupaEncontrada.valor = request.body.valor
        }
        if (request.body.foto) {
            roupaEncontrada.foto = request.body.foto
        }

        const roupaAtualizada = await roupaEncontrada.save()
        response.json(roupaAtualizada)

    }catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaRoupa(request, response) {

    try{
        await Roupa.findByIdAndDelete(request.params.id)
        response.json({message:'Item deletado com sucesso!'})

    }catch(erro){
        console.log(erro)
    }    
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/roupas', mostraRoupa))//rota GET
app.use(router.post('/roupas', criaRoupa))//rota POST
app.use(router.patch('/roupas/:id', corrigeRoupa))//rota PATCH
app.use(router.delete('/roupas/:id', deletaRoupa))//rota DELETE
app.listen(porta, mostraPorta)//ouvir porta