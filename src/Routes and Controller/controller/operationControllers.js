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
            const validation = validationResult(req);
            if(validation.errors.length > 0){
                    return res.render("createForm",
                        {
                        errors:validation.mapped(),
                        oldData: req.body,
                        types,
                        users
                        }
                    );
            };
        
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
            data: operations,
            status:200
        })
    })
        .catch(error => console.log(error))
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
                id_user:1// hardcodeado hasta implementar  registro desde cliente ... realizar  registro desde http://localhost:3003/
                
        
                
            },{include:[{association:'types'},{association:'users'}]
        })
        .then(() =>{
            
            console.log("creado")
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
        }
}
module.exports = operations;
