const db = require("../../database/models");
const path = require("path");

// testeat de  datos en tabla type

const controllerType ={

    show: (req,res)=>{
        db.Type.findAll()
        .then(
            type=>{
            return  res.status(200).json({
                data:type,
                status: 200,
                })
            }
            
          
       )


    }




}

module.exports = controllerType;