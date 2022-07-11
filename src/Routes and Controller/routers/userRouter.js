const express =require('express');
const router =express.Router();
const controller = require ('../controller/userControllers')




    //proceso  login  y register

    router.post('/',controller.login);
    
    router.post('/register',controller.register);


//proceso  logout
    router.get('/logout', controller.logout);

/****************************************************API */


router.post('/login',controller.login);


    module.exports =router;