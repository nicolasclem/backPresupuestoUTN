require('dotenv').config()
const db = require('../../database/models');
const bcrypt =require ('bcryptjs')
const jwt = require('jsonwebtoken')


const controllerUsers = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      })
        if (user) {
            const passUSer = bcrypt.compareSync(password, user.password);
            if (passUSer) {
              
              
              const expireToken = 600;
              const token = jwt.sign(
                {
                  date: email,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: expireToken,
                }
              );
            return res.status(200).json({
                usuario: user,
                time: `su token expira en  ${expireToken / 60} min`,
                token:token

            })
            } else {
              return res.status(400).json({
                msg: "Contraseña incorrecta",
              });
            }
          } else {
            return res.status(400).json({
              msg: "usuario no registrado",
            });
          }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        msg:"algo salio mal"
      })
    }
  },

register:async (req, res) => {
    try {
        const user = await db.User.findOne({
          where: {
            email:req.body.email
          },
        })
        if(user) {
            return res.status(400).json({
            msg: "el mail esta en uso",
            error: 400,
            });

        } else {
            db.User.create({
            name:req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            })
        return res.status(200).json({
                msg: `cuenta creada usuario`,
                });
            }          
        }   catch(error){
            console.log(error);
            return res.status(400).json({
            msg:"algo salio mal"
            })
        }
        },

  // check
  checkToken:(req,res)=>{
  
    //metodo para validar el  tokken
    return res.status(200).json(req.params.token)
  },
  
};

module.exports =controllerUsers