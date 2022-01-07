
//middle para control de rutas si el usuario no esta logeado
function authMiddleware (req, res, next){
    if (!req.session.userLogged){
        return res.redirect ('https://presupuesto-utn.herokuapp.com/')
       
    }
    next();
}

module.exports = authMiddleware;