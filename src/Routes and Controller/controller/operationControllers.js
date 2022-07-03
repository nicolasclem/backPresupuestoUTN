const db = require("../../database/models");

const { validationResult} = require('express-validator');


const operations ={
    
    // render formulario de creacion de operacion
    createForm: (req,res)=>{            
            let types = db.Type.findAll()
    
            Promise
            .all([types])
            .then(
                function(responses){
                    let types = responses[0];
                   
                    return res.render('createForm',{types})
                })
                .catch(error=>console.log(error))
        },
// crear operacion
    storage: async (req,res)=>{
        let types = await db.Type.findAll();
        let users = await db.User.findAll();
        try{
            // const validation = validationResult(req);
            // if(validation.errors.length > 0){
            //         return res.render("createForm",
            //             {
            //             errors:validation.mapped(),
            //             oldData: req.body,
            //             types,
            //             users
            //             }
            //         );
            // };
        
            db.Operation.create(
                {
                    
                    description:req.body.description,
                    amount: req.body.amount,
                    date:req.body.date,
                    id_type:req.body.type,
                    id_user:req.session.userLogged.id
                    
            
                    
                },{include:[{association:'types'},{association:'users'}]
            })
            .then(()=>
            {res.redirect ("/operations/table")}
            )
                .catch(e=>console.log(e))
            }
            catch(error ){console.log(error)}
       
        },
    // elimino operacion
    destroy: function(req,res){
        db.Operation.destroy({   
            include:[{association:'types'},{association:'users'}],
            where:{id : req.params.id}  
        })
        .then(()=>
            res.redirect("/operations/table")
            )
            .catch(error=>console.log(error))
    },


    
    //render formulario Edit
    edit: (req,res)=>{
        
        
    let operations = db.Operation.findByPk(
        req.params.id)
            
        Promise
        .all([operations])
        .then(
            function(responses){
                    
                let operations = responses[0];
                return res.render('editForm',{operations})
                }
                )
                .catch(error=>console.log(error))       
    },
            
// metodo para editar operacion
    editPost: function (req,res){
       
        db.Operation.findByPk(
            req.params.id)
           

        .then(() =>
            {
                db.Operation.update(
                {                                    
                    description:req.body.description,
                    amount: req.body.amount,
                    date:req.body.date,              
                },
                {
                    where: {id : req.params.id}
                })
                .then(()=>
                {res.redirect("/operations/table")}
                )
                .catch(error=>console.log(error))
        }).catch(error=>console.log(error))
   
    
    },
                        
    // render detalle de operacion en tabla                    
    detail: (req,res)=>{
                            
                            
    db.Operation.findAll({
        include:[{association: 'types'}, {association: 'users'}]
    })
    .then(operations=>{

        
        
        res.render('table',{operations, user:req.session.userLogged})
    }).catch(error=>console.log(error)); 
    },
                        


/******************************************************************** */
 show:(req,res)=>{    
     db.Operation
     .findAll({include:[{association:'types'},{association:'users'}]
 })
     .then(operations =>{
    
         return  res.status(200).json({
         operations    
         })
     })
         .catch(error => console.log(error))
 },
 storageApi2: async (req,res)=>{
        let types = await db.Type.findAll();
        let users = await db.User.findAll();
        db.Operation.create(
            {
                
                description:req.body.description,
                amount: req.body.amount,
                date:req.body.date,
                id_type:req.body.type,
                id_user:req.session.userLogged.id
                
        
                
            },{include:[{association:'types'},{association:'users'}]
        })
        .then(()=>
        {res.send ("creando")}
        )
    
},
/****************************************************************************** 
 * 
 * 
 * 
 * 
 * 
 * 
 * API
 * 
 * 
 * 
***********************************************************************************/
storageApi: (req,res)=>{
        db.Operation.create(
            {
                
                description:req.body.description,
                amount: req.body.amount,
                date:req.body.date,
                id_type:req.body.type,
                id_user:114// hardcodeado hasta implementar  registro desde cliente ... realizar  registro desde http://localhost:3003/
                
        
                
            },{include:[{association:'types'},{association:'users'}]
        })
        .then(() =>{
            
           res.send("creado")
        })
            .catch(e=>console.log(e))
        
    },

   
                
    // metodo para editar operacion
        editPostApi: function (req,res){
           
            db.Operation.findByPk(
                req.params.id)
               
    
            .then(() =>
                {
                    db.Operation.update(
                    {                                    
                        description:req.body.description,
                        amount: req.body.amount,
                        date:req.body.date,              
                    },
                    {
                        where: {id : req.params.id}
                    })
                    .then(()=>
                    {res.send("editado")}
                    )
                    .catch(error=>console.log(error))
            }).catch(error=>console.log(error))
       
        
        
        },
        destroyApi: function(req,res){
            db.Operation.destroy({   
                include:[{association:'types'},{association:'users'}],
                where:{id : req.params.id}  
            })
            .then(()=>
                console.log("eliminado")
                )
                .catch(error=>console.log(error))
        },

        /***************************
         * *********************
         * *****************
         * **************
         * ***********
         * ********
         * ******
         * ****
         * **
         * *
         */


         showDos: async (req, res) => {
            const operations = await db.Operation.findAll({include:[{association:'types'},{association:'users'}]})
            if (operations.length > 0) {
                try {
    
                    const alloperations = operations.map(operation => {
                        operation = {
                            description: operation.dataValues.description,
                            amount: operation.dataValues.amount,
                            date: operation.dataValues.date,
                            id_type :operation.dataValues.id_type,
                            id_user:operation.dataValues.id_user
                        }
                        return operation;
                    })
                    res.status(200).json({
                        data: alloperations,
                        msg: "operaciones  encontradas!!"
                    })
    
                } catch (error) {
                    console.log(error)
                }
            } else {
                res.status(400).json({
    
                    msg: "Base de Datos sin Operaciones!"
                })
            }
    
        },
        create: (req, res) => {
            db.Operation.create({
                                    include: [{
                                        association: 'characters'
                                    }, {
                                        association: 'genres'
                                    }],
                                    ...req.body,
                                })
                                .then(operation => {
                                    return res.status(200).json({
                                        data: operation,
                                        status: 200,
                                        msg: 'operacion creada'
                                    })
                                }).catch(error => console.log(error))
        },
        del: async (req, res) => {
            const operationDelete = await db.Operation.destroy({
                where: {
                    id: req.params.id
                }
            })
            try {
                operationDelete ?
                    res.status(200).json({
                        delete: 'Operacion! borrada',
                        status: 200,
                    }) :
                    res.status(400).json({
                        msg: "no se encuentra la Operacion!",
                        status: 400
                    })
    
            } catch (error) {
                console.log(error);
            }
        },
        edit: async (req, res) => {
    
            const operationToEdit = await db.Operation.findByPk(req.params.id)
    
            try {
                if ( operationToEdit) {
                    operationToEdit.update({
    
                        description:req.body.description!= undefined ? req.body.description : operationToEdit.description,
                        amount: req.body.amount!= undefined ? req.body.amount : operationToEdit.amount,
                        date:req.body.date != undefined ? req.body.date : operationToEdit.date,
                            
                        })
                        .then(operation => {
                            return res.status(200).json({
                                data: operation,
                                status: 200,
                                msg: 'operacion editada'
                            })
                        }).catch(error =>
                            res.status(400).json({
                                status: 400,
                                msg: `no se logro editar ${error}`
                            }))
                } else {
                    res.status(400).json({
                        status: 400,
                        msg: `no se encontro la operacion`
                    })
                }
    
            } catch (error) {
                console.log(error);
            }
    
        },


}
module.exports = operations;
