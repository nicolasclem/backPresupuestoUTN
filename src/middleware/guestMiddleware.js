
// middle para controlar rutas  si el usuario esta logeado
function guestMiddleware (req, res, next){
    if (req.session.userLogged){
        return res.redirect ('https://presupuesto-utn.herokuapp.com/operations/table')
        
    }
    next();
}

module.exports = guestMiddleware;