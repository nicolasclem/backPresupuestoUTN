const express=require('express')
const cors= require('cors');
const app=express()
const port=  process.env.PORT || 3003
const path = require('path');
const cookies = require ('cookie-parser');

const session = require ('express-session');
const  userLoggedMiddleware =require('../src/middleware/userLoggedMiddleware')
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
//   });

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://front-utn.herokuapp.com/")
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested, Content-Type, Accept Authorization"
//     )
//     if (req.method === "OPTIONS") {
//       res.header(
//         "Access-Control-Allow-Methods",
//         "POST, PUT, PATCH, GET, DELETE"
//       )
//       return res.status(200).json({})
//     }
//     next()
//   })
//  app.use(cors())
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
app.use( cors({ credentials: true, origin: "https://front-utn.herokuapp.com" }) );
// const corsOptions = {
//     origin: ["https://presupuesto-utn.herokuapp.com/"],
//     preflightContinue:false,
//     credentials: true
//   }

// app.use(cors())

// app.use(cors({
//     origin: '*'
//     }));

// app.use(
//     cors({
//       origin: ["https://front-utn.herokuapp.com/"],
//       methods: ["GET", "POST", "DELETE","PUT"],
    
//     })

// const corsOptions = {origin: process.env.URL_FRONT || '*', credentials: true};

// app.use(cors(corsOptions));
//app.use(cors({ origin: "https://presupuesto-utn.herokuapp.com/", credentials: true }));// politica de seguirdad




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