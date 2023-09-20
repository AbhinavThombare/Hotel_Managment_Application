const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async(req,res,next) => {
    const token = req.params.token

    const decoded = jwt.verify(token,'thisishoteldatabase')

    const user = await User.findOne({_id:decoded._id, 'tokens.token':token})

    if(!user){
        return new Error('Please Autheticate!')
    }

    req.user = user;
    req.token = token;

    next()
}

module.exports = auth