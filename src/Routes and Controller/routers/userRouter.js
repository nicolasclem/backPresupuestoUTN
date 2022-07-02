const express =require('express');
const router =express.Router();
const controller = require ('../controller/userControllers')
const{validationRegister,validationLogin} = require('../../middleware/validation')
const guestMiddleware = require('../../middleware/guestMiddleware')

    //render de fomularios usuarios

    router.get('/',guestMiddleware,controller.show)
    
    router.get('/register',guestMiddleware,controller.register)



    //proceso  login  y register

    router.post('/',validationLogin,controller.login);
    
    router.post('/register',validationRegister,controller.processRegister);


//proceso  logout
    router.get('/logout', controller.logout);

/****************************************************API */


router.post('/login',controller.login);


    module.exports =router;