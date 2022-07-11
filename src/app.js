const express=require('express')
const cors= require('cors');
const app=express()
const port=  process.env.PORT || 3003
const path = require('path');
const cookies = require ('cookie-parser');
const session = require ('express-session');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE


app.use(cors())



  //requerimos las rutas
const userRoute = require('./Routes and Controller/routers/userRouter')
const operationRoute = require('./Routes and Controller/routers/operationRouter');

// testeo de data tabla types
const typeRoute = require('./Routes and Controller/routers/typeRouter');

app.use(
    express.static(path.resolve(__dirname, '../public'))
);// rutas partiendo desde / public


app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use (session({ 
    secret: 'secreto',
    resave: false,
    saveUninitialized:false
}));


//utilizacion de cookies en aplicacion
app.use(cookies());



app.use('/',userRoute);
app.use('/operations',operationRoute);
app.use('/types',typeRoute);

//app.use('/api',apiRoute)





app.listen(port, ()=>console.log(` servidor corriendo en ${port} `) )