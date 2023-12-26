const {body, param , validationResult} = require('express-validator')

exports.updateUserValidation = [
    body().custom((value, { req }) => {
        if (Object.keys(req.body).length === 0) {
            throw new Error('must at least fill one input');
        }
        return true;
    }),
];


exports.validate = (req,res,next)=> {

    const errors = validationResult(req);
    if (errors.isEmpty()){
        return next();
    }
    return res.status(400).json({errors:errors.array()})
};