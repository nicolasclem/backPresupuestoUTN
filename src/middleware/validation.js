const { body } = require ('express-validator');

// middle de validaciones de forms desde express 
const validation={

validationRegister : [
  
    body('name').notEmpty().withMessage('Debes poner un nombre'),

    body('email')
        .notEmpty().withMessage('El campo no puede estar vacío').bail()
        .isEmail().withMessage('Debés escribir un formato de email válido'),
    body('password')
        .notEmpty().withMessage('El campo no puede estar vacío').bail()
        .isLength({ min: 5}).withMessage('La contraseña debe tener mas de 5 caracteres')
    ],

validationLogin :[

    body('email').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isEmail().withMessage('Debés escribir un formato de email válido'),
    body('password').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({ min: 5}).withMessage('La contraseña debe tener mas de 5 caracteres')
    
],

validationCreate :[

    body('description').notEmpty().withMessage('El campo no puede estar vacío'),    
    body('amount').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isNumeric().withMessage('La contraseña debe tener mas de 5 caracteres'),
    body('date').notEmpty().withMessage('El campo no puede estar vacío')

]


}
module.exports = validation;