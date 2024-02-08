const mongoose =  require('mongoose')

const LivroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    imagem: {type: String, required: true},
    autor: { type: String, required: true},
    categoria: {type: String, require: true},
    avaliacao: {type: String, require: true}
})

module.exports = mongoose.model('livro', LivroSchema)