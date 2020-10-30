const { Router } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/user')
const { validationResult } = require('express-validator')
const { signup: signupValidation, signin: signinValidation } = require('../utils/validators')

const router = Router()

router.post('/signup', signupValidation, async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data'
            })
        }

        const { email, password, name } = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({ message: 'Such user is already exists' })
        } else {

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await new User({ email, password: hashedPassword, name })
            user.save()

            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.status(201).json({ token })
        }
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong', error: e.message })
    }
})

router.post('/signin', signinValidation, async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json(400).json({
                errors: errors.array(),
                message: 'invalid data'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'User does not exists' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'incorrect password' })

        const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token })

    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong', error: e.message  })
    }
})

module.exports = router
