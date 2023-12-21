const {body , validationResult} = require('express-validator')

exports.registerValidation = [ 
    body('username').notEmpty().withMessage('User Name required'),
    body('email') .notEmpty().isEmail().withMessage('Email must be a valid email and is required'),
    body('password').notEmpty().withMessage('Password required')
];

exports.loginValidation = [ 
    body('email') .notEmpty().isEmail().withMessage('Email must be a valid email and is required'),
    body('password').notEmpty().withMessage('Password required')
];

exports.validate = (req,res,next)=> {

    const errors = validationResult(req);
    if (errors.isEmpty()){
        return next();
    }
    return res.status(400).json({errors:errors.array()})
};