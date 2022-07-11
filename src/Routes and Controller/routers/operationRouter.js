const express =require('express');
const router =express.Router();
const controller = require ('../controller/operationControllers')

/*********************API***************************** */

router.get('/api',controller.show)


router.get('/api/:id',controller.show2)


router.post('/api', controller.create)

 router.put('/api/:id', controller.edit)

router.delete('/api/:id', controller.del)





module.exports =router;