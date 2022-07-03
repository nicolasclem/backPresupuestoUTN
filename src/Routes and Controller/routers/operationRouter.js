const express =require('express');
const router =express.Router();
const controller = require ('../controller/operationControllers')
//const authMiddleware = require('../../middleware/authMiddleware')
//const {validationCreate}= require('../../middleware/validation')



// router.get('/table',authMiddleware,controller.detail)


// router.get('/create',authMiddleware,controller.createForm)

// router.post ('/create',validationCreate,controller.storage)



// router.get ('/edit/:id',authMiddleware, controller.edit)
// router.post ('/edit/:id', controller.editPost)
    


// router.post('/del/:id', controller.destroy)


/*********************API***************************** */

router.get('/api',controller.show)


router.post('/api', controller.create)

 router.put('/api/:id', controller.edit)

router.delete('/api/:id', controller.del)





module.exports =router;