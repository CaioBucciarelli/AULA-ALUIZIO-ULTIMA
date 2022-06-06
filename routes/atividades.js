const atividades = require('../models/atividades')

module.exports = (app)=>{
    app.post('/atividades',async(req,res)=>{
        //recuperando as informações digitadas
        var dados = req.body
        //exibindo o terminal
        // console.log(dados)
        //conectar com o database
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulario no database
        var salvar = await new atividades({
            data:dados.data,
            disciplina:dados.disciplina,
            tipo:dados.tipo,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            usuarios:dados.id
        }).save()

        //buscar os documentos na coleção atividades desse usuário
        var buscar = await atividades.find({usuarios:dados.id})
        console.log(buscar)
        res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
    })

    //exluir atividades
    app.get("/excluir",async(req,res)=>{
        //recuperar o paramentro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({
            _id:id
        })
        //voltar para a página atividades
        // res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
        res.send("Atividades Excluída!")


    })
}