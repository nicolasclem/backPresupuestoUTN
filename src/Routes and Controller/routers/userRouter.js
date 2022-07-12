const express =require('express');
const router =express.Router();
const controller = require ('../controller/userControllers')




    //proceso  login  y register

    router.post('/',controller.login);
    
    router.post('/register',controller.register);


//proceso  logout
router.get('/logout', controller.logout);

router.get('/check/:token', controller.checkToken)




    module.exports =router;