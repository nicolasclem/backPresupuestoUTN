const express=require('express')
const app=express()
const cors= require('cors');

const port=  process.env.PORT || 3003
const path = require('path');
const cookies = require ('cookie-parser');

const session = require ('express-session');
const  userLoggedMiddleware =require('../src/middleware/userLoggedMiddleware')
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

//requerimos las rutas
const userRoute = require('./Routes and Controller/routers/userRouter')
const operationRoute = require('./Routes and Controller/routers/operationRouter');

// testeo de data tabla types
const typeRoute = require('./Routes and Controller/routers/typeRouter');

const config = {
    application: {
        cors: {
            server: [
                {
                    Origin:'*', //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
}
};
// app.use(cors({
//     origin: '*'
//     }));

// app.use(
//     cors({
//       origin: "*",
//       methods: ["GET", "POST", "DELETE","PUT"],
//       credentials: true,
//       origin: true,
//     })
//   )
app.use(cors(
     config.application.cors.server
  ));// politica de seguirdad

app.use(
    express.static(path.resolve(__dirname, '../public'))
);// rutas partiendo desde / public


app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.json())
app.use(express.urlencoded({extended:false}))




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

//app.use('/api',apiRoute)





app.listen(port, ()=>console.log(` servidor corriendo en ${port} `) )