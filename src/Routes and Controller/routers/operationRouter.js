const express =require('express');
const router =express.Router();
const controller = require ('../controller/operationControllers')
const authMiddleware = require('../../middleware/authMiddleware')
const {validationCreate}= require('../../middleware/validation')



router.get('/table',authMiddleware,controller.detail)


router.get('/create',authMiddleware,controller.createForm)

router.post ('/create',validationCreate,controller.storage)



router.get ('/edit/:id',authMiddleware, controller.edit)
router.post ('/edit/:id', controller.editPost)
    


router.post('/del/:id', controller.destroy)


/*********************API***************************** */

router.get('/list',controller.show)


router.post('/list', controller.storageApi)

router.put('/list/:id', controller.editPostApi)

router.delete('/list/del/:id', controller.destroyApi)





module.exports =router;