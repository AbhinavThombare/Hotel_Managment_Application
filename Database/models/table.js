const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
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

const Table = mongoose.model('Table',tableSchema)

module.exports = Table