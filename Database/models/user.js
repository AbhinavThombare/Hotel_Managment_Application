const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    mobile:{
        type:Number,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

UserSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, 'thisishoteldatabase')
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token;

} 

UserSchema.statics.findCredential = async function (email, password) {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error(message = 'User Not Found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    // console.log(isMatch)
    if (!isMatch) {
        throw new Error(message = 'Password Not Match')
    }
    return user
}

//middleware for saving password in hash value
UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User