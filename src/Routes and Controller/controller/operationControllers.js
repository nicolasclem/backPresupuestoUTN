const db = require("../../database/models");

//const { validationResult} = require('express-validator');


const operations ={
    
    show: async(req,res)=>{
        await db.Operation.findAll({include:[{association:'types'},{association:'users'}]
    })
    .then((operations)=>{
        return  res.status(200).json({
            data: operations,
            status:200
        })

    }) 
    .catch(error => console.log(error))
    
    },
    edit: async (req,res)=>{

        await db.Operation.findByPk(req.params.id)
        .then(() =>
                {
                    db.Operation.update(
                    {   
                      
                        description:req.body.description,
                        date:req.body.date,
                        amount: req.body.amount,
                        id_type:req.body.type             
                    },
                    {
                        where: {id : req.params.id}
                    })
        .then(()=>
                res.send( "editado")
        )
        }).catch(error=>console.log(error))
        },

        create: async (req,res)=>{
            await db.Operation.create(
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
        del:async(req,res)=>{
            db.Operation.destroy({   
                include:[{association:'types'},{association:'users'}],
                where:{id : req.params.id}  
            })
            .then(()=>
                res.send("eliminado")
                )
                .catch(error=>console.log(error))
        }
        

        

    }

module.exports = operations;
