const { Router } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/user')
const List = require('../models/list')
const { validationResult } = require('express-validator')
const { signup: signupValidation, signin: signinValidation } = require('../utils/validators')

const router = Router()

router.post('/signup', signupValidation, async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password, name } = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({ message: 'user with this email is already exists' })
        } else {

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await new User({
                email,
                password: hashedPassword,
                name,
                lists: [],
                general: {},
                important: {}
            })

            const general = await new List({
                title: 'General',
                user: user._id
            })

            general.save()

            const important = await new List({
                title: 'Important',
                user: user._id
            })
            important.save()

            user.setDefaultLists(general._id, important._id)

            user.save()
            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.status(201).json({ token })
        }
    } catch (e) {
        return res.status(500).json({ message: 'something went wrong', error: e.message })
    }
})

router.post('/signin', signinValidation, async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'user does not exists' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'incorrect password' })

        const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token })

    } catch (e) {
        return res.status(500).json({ message: 'something went wrong', error: e.message  })
    }
})

module.exports = router
