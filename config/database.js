// importar o mongoose
const mongoose = require('mongoose')
//script de conexão
const conn = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://userLR:loginregistro@cluster0.9prnz.mongodb.net/test')
}

//exportar as informações para acesso externo
module.exports = conn