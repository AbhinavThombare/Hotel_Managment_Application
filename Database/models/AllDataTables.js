const mongoose = require('mongoose')

const allDataSchema = new mongoose.Schema({
    Date:{
        type:Date,
        required:true
    },
    tableNo:{
        type:Number,
        required:true
    },
    Dishes:[{
        dish:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        unit_price:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    Total_Price:{
        type:Number,
        required:true
    }
})

const AllData = mongoose.model('AllData',allDataSchema)

module.exports = AllData