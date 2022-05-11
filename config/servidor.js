//importar o express
const express = require('express')
//executar o express
const app = express()
//definir a porta de servidor local
const porta = 3535

//exportar o app e a porta
module.exports={app,porta}