const express =require('express');
const router =express.Router();
const controller = require ('../controller/userControllers')




    //proceso  login  y register

    router.post('/',controller.login);
    
    router.post('/register',controller.register);



    router.get('/check/:token', controller.checkToken)




    module.exports =router;