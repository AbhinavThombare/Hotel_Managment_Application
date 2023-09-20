const mongoose = require('mongoose')

const DishesSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
        trim: true
    },
    Dish_Name: {
        type: String,
        required: true,
        trim: true

    },
    Price: {
        type: String,
        required: true,
        trim: true

    }
})

DishesSchema.methods.addDish = async function () {
    try {
        const dish = this;
        
        // console.log(dish)
        // await dish.save()
        // return dish;
        return dish
    } catch (error) {
        return error
    }
}

const Dish = mongoose.model('Dish', DishesSchema)


module.exports = Dish;

