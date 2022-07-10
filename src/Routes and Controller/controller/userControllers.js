require('dotenv').config()
const db = require('../../database/models');
const bcrypt =require ('bcryptjs')
const jwt = require('jsonwebtoken')




const { validationResult} = require('express-validator');







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
              req.session.userLogged = user;

              const expireToken = 420;
              const token = jwt.sign(
                {
                  date: email,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: expireToken,
                }
              );
            //   if (req.body.remember) {
            //     res.cookie("userEmail", req.session.userLogged.email, {
            //         maxAge: 1000 * 500,
            //       }).send("cookie login");
            //   }
            return res.status(200).json({
                msg: `bienvenido usuario: ${user.name}`,
                time: `su token expira en  ${expireToken / 60} min`,
                token: token,
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
   console.log(req.body);
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
                data: user,
                msg: `cuenta creada usuario: ${user.name}`,
                status: 200,
                });
            }          
        }   catch(error){
            console.log(error);
            return res.status(400).json({
            msg:"algo salio mal"
            })
        }
        },
  // proces de Logout  ----
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports =controllerUsers