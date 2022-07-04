
const db = require('../../database/models');
const bcrypt =require ('bcryptjs')
const jwt = require('jsonwebtoken')




const { validationResult} = require('express-validator');







const controllerUsers ={


    login: (req, res) => {

        const {
            email,
            password
        } = req.body;
        try {
            db.User.findOne({
                    where: {
                        email
                    }
                })
                .then(user => {
                   
                    if (user) {
                        const passUSer = bcrypt.compareSync(password, user.password)
                       

                       if (passUSer) {


                        req.session.userLogged = user


                            // const expireToken = 420;
                            // const token = jwt.sign({
                            //     data: email
                            // }, process.env.JWT_SECRET, {
                            //     expiresIn: expireToken
                            // })
                            if(req.body.remember){
                            
                                res.cookie('userEmail',req.session.userLogged.email,{maxAge:1000*500})
                            }
                        res.status(200).json({
                            msg: `bienvenido usuario ${user.name}`

                        })
                        return res.redirect('/home');
                            //  res.status(200).json({
                            //     msg: `bienvenido usuario: ${user.name}`,
                            //     time: `su token expira en  ${expireToken/60} min`,
                            //     token: token
                            // })
                        } else {
                            res.status(400).json({
                                msg: 'Contraseña incorrecta'
                        })

                        }

                    } else {
                        return res.status(400).json({
                            msg: 'usuario no registrado'

                        })

                     }

                }).catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }


    },

    register: (req, res) => {
        const {
            name,
            email,
            password
        } = req.body;
        try {
            db.User.findOne({
                    where: {
                        email
                    }
                })
                .then((user) => {
                    if (user) {
                        return res.status(400).json({
                            msg: 'el mail esta en uso',
                            error: 400,
                        })
                    } else {
                        db.User.create({
                                name,
                                email,
                                password: bcrypt.hashSync(password, 8),
                            })
                            .then(user => {
                                return res.status(200).json({
                                    data: user,
                                    msg: `cuenta creada usuario: ${user.name}`,
                                    status: 200,
                                })
                            }).catch(error => console.log(error))
                    }
                }).catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    },
// proces de Logout  ----    
    logout: (req,res)=>{
        
        
    res.clearCookie('userEmail')
    req.session.destroy();

    return res.redirect('/')  
      }

}

module.exports =controllerUsers