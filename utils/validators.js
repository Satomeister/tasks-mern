const { body } = require('express-validator/check')

module.exports = {
    signup: [
        body('name').trim().isLength({ min: 3, max: 30 }).withMessage('invalid name'),
        body('email').normalizeEmail().isEmail().withMessage('invalid email'),
        body('password').isAlphanumeric().isLength({ min: 6 }).withMessage('invalid password, must be minimum of 6 chars'),
        body('confirm').custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
    ],
    signin: [
        body('email').normalizeEmail().isEmail().withMessage('invalid email'),
        body('password').isLength({ min: 6 }).withMessage('invalid password, must be minimum of 6 chars')
    ]
}