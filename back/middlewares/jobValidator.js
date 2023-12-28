const {body, param , validationResult} = require('express-validator')

exports.addJobValidator = [
    body('title').notEmpty().withMessage('Job Title is required'),
    body('description').notEmpty().withMessage('Job Description is required'),
    body('company').notEmpty().withMessage('Company Name is required'),
    body('location').notEmpty().withMessage('Company Location is required')
];

exports.updateJobValidation = [
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