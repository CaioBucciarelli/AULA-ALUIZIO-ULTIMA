const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    //criar a rota para renderizar a view atividades
    app.get('/atividades',async(req,res)=>{
        //capturar o id da barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})
        //buscar todas as atividades desse usuário
        var buscar = await atividades.find({usuario:id})
        //console.log(buscar)
        res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:buscar})
    })

    //gravar as informações do formulário na collection atividades
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
            usuario:dados.id
        }).save()
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+dados.id)
    })

    //exluir atividades
    app.get("/excluir",async(req,res)=>{
        //recuperar o paramentro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({
            _id:id
        })
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+excluir.usuario)


    })
}