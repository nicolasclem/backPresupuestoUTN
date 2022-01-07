const express=require('express')
const app=express()

const port=3003
const path = require('path');
const cors= require('cors')
const cookies = require ('cookie-parser');

const session = require ('express-session');
const  userLoggedMiddleware =require('../src/middleware/userLoggedMiddleware')
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

//requerimos las rutas
const userRoute = require('./Routes and Controller/routers/userRouter')
const operationRoute = require('./Routes and Controller/routers/operationRouter');

// testeo de data tabla types
const typeRoute = require('./Routes and Controller/routers/typeRouter');



app.use(cors())// politica de seguirdad

app.use(
    express.static(path.resolve(__dirname, '../public'))
);// rutas partiendo desde / public


app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// nuestro motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use (session({ 
    secret: ' secreto',
    resave: false,
    saveUninitialized:false
}));
//utilizacion de cookies en aplicacion
app.use(cookies());

// middle de aplicacion
app.use(userLoggedMiddleware);

app.use('/',userRoute);
app.use('/operations',operationRoute);
app.use('/types',typeRoute);





app.listen(port, ()=>console.log(` servidor corriendo en ${port} `) )