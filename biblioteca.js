const express = require('express');// inicia o package express
const router = express.Router(); //configura a 1 parte da rota
//const cors = require('cors'); //permite consumir a API no FrontEnd


const conectaBancoDeDados = require('./bancoDeDados') //ligando o arquivo ao banco de dados
conectaBancoDeDados()//chama a função banco de dados

const Livro = require('./livroModel')


const app = express(); // inicia o app
app.use(express.json())// Permite que o aplicativo receba dados no formato JSON
//app.use(cors()) 

const porta = 3000;

//get
async function mostraLivros(request, response) {
    try {
        const livrosDoBancoDeDados = await Livro.find()

        response.json(livrosDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }

}

//post
async function adicionaLivros(request, response) {
    const novoLivro = new Livro({
        titulo: request.body.titulo,
        imagem: request.body.imagem,
        autor: request.body.autor,
        categoria: request.body.categoria,
        avaliacao: request.body.avaliacao
    })
    try {
        const livroAdicionado = await novoLivro.save()
        response.status(201).json(livroAdicionado)
        } catch (erro) {
            console.log(erro)   
        }
}

//patch
async function editaLivros(request, response) {
    try {
        const livroEncontrado = await Livro.findById(request.params.id)
        if (request.body.nome) {
            livroEncontrado.titulo = request.body.titulo
        }
        if  (request.body.iamgem) {
            livroEncontrado.imagem = request.body.imagem
        }
        if (request.body.autor) {
            livroEncontrado.autor = request.body.autor
        }
        if (request.body.categoria) {
            livroEncontrado.categoria = request.body.categoria
        }
        if (request.body.avaliacao) {
            livroEncontrado.avaliacao = request.body.avaliacao
        }
        const livroAtulizadoNoBancoDeDados = await livroEncontrado.save()

        response.json(livroAtulizadoNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//delete
async  function deletaLivros(request, response) {
    try{
        await Livro.findById(request.params.id)
        response.json({mensagem:'Livro deletado com sucesso!'})
    } catch (erro) {
        console.log(erro)
    }
}

//configura as rotas
app.use(router.get('/biblioteca', mostraLivros))
app.use(router.post('/biblioteca', adicionaLivros))
app.use(router.patch('/biblioteca/:id', editaLivros))
app.use(router.delete('/biblioteca/:id', deletaLivros))

//porta
function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
}
app.listen(porta, mostraPorta) //servidor ouvindo a porta

