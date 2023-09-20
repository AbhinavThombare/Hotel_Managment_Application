const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const auth = require('../middleware/auth')

const User = require('../models/user')

router.post('/api/user/register', async (req, res) => {
    const user = new User(req.body.data)
    try {
        const token = await user.generateToken()
        if(!token){
            return new Error('Registration Not Done, Due to Server Error!')
        }
        return res.status(200).send({token})
    } catch (error) {
        console.log(error)
        return res.status(400).send()
    }
})

router.post('/api/user/login', async (req, res) => {
    const email = req.body.userdata.email;
    const password = req.body.userdata.password;
    try {
        const user = await User.findCredential(email, password)
        const token = await user.generateToken()
        if (user) {
            // console.log(res.header('auth-token'))
            return res.status(200).send({ token });
        }
    } catch (error) {
        // console.log(error)
        return res.status(400).send(error.message)
    }
})

router.post('/api/user/logout/:token', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router