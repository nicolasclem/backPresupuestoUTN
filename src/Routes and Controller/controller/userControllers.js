const db = require('../../database/models');
const path =require('path');

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
                    res.send(user)
                    if (user) {
                        const passUSer = bcrypt.compareSync(password, user.password)


                        if (passUSer) {
                            const expireToken = 420;
                            const token = jwt.sign({
                                data: email
                            }, process.env.JWT_SECRET, {
                                expiresIn: expireToken
                            })
                            if(req.body.remember){
                            
                                res.cookie('userEmail',req.session.userLogged.email,{maxAge:1000*500})
                            }
                            res.status(200).json({
                                msg: `bienvenido usuario: ${user.name}`,
                                time: `su token expira en  ${expireToken/60} min`,
                                token: token
                            })
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
    
    /*********************************************************** 
     * 
     * Testeando data
     * 
    ***************************************************************/
    show: (req,res)=>{
        db.User.findAll()
        .then(
            user=>{
            return  res.status(200).json({
                
                data: user,
                status: 200,
                })
            }
            
          
       )


    },
    
    showApi: (req, res) =>{
        db.User
            .findByPk(req.params.id)
            .then(user=>{
                
            return  res.status(200).json({
                detial:`http://localhost:3003/users/list/${req.params.id}`,
                data: user,
                status: 200
            })
        })
        .catch(error=>console.log(error))

    },
    /*********************************************************** 
     * 
     * 
     * -------------->  FIN   <---------------------
     * 
     * 
    ************************************************************* */
// Render base 
home:(req,res)=>{
    res.render("index")
},
register:(req,res)=>{

    res.render("register")
},

// proceso de registro
processRegister: function(req,res){
    try{
        const validation = validationResult(req);
        if(validation.errors.length > 0){
                return res.render("register",
                    {
                    errors:validation.mapped(),
                    oldData: req.body,
                    }
                );
        };
        db.User.findOne({
            where:{
                email:req.body.email,
            } 
        })
        .then((user)=>{
            if(user){
                    return res.render("register",{
                        errors:{
                            email:{
                                msg:   "email ya esta registrado",
                            },
                        },
                        oldData: req.body,
                })
            }else{                 
                db.User.create({                                    
                    name: req.body.name,
                    email: req.body.email,
                    password:bcrypt.hashSync(req.body.password, 8)
                        
                    })
                    .then(()=>
                    {res.redirect('/')
                })
                .catch(error=>console.log(error))
            }
        }).catch(error=>console.log(error))
}
catch(error ){console.log(error)}
    






},


//proceso de LOGIN.


processLogin: function (req, res) {
    try{
        const validation = validationResult(req);
        if(validation.errors.length > 0){
                return res.render("index",
                    {
                    errors:validation.mapped(),
                    oldData: req.body,
                    }
                );
        };
    
    db.User.findOne({
        where: {
            email: req.body.email
        }
    
    })
    .then (userToLogin => {
        
        if (userToLogin) {
            
            let passwordUser = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (passwordUser) {
            
                        req.session.userLogged = userToLogin
                    
                        if(req.body.remember){
                            
                        res.cookie('userEmail',req.session.userLogged.email,{maxAge:1000*500})
                        }
                        return res.redirect('/operations/table');
                        }else{
                            return res.render('index', {
                                errors: {
                                    password: {
                                        msg: 'La contraseña no coincide',
                                    }
                                }
                            })
                        }
        }
        }).catch(error=>console.log(error))
        
        }
        catch(error ){console.log(error)}
},
// proces de Logout  ----    
    logout: (req,res)=>{
        
        
    res.clearCookie('userEmail')
    req.session.destroy();

    return res.redirect('/')  
      }

}

module.exports =controllerUsers