const { body } = require('express-validator/check')

module.exports = {
    signup: [
        body('name').trim().isLength({ min: 3, max: 30 }).withMessage('name is invalid'),
        body('email').normalizeEmail().isEmail().withMessage('email is invalid'),
        body('password').isAlphanumeric().isLength({ min: 6 }).withMessage('password is invalid'),
        body('confirm').custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
    ],
    signin: [
        body('email').normalizeEmail().isEmail().withMessage('email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('password is invalid')
    ]
}