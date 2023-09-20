const express = require('express')
const router = express.Router()
const Dish = require('../models/dishes')


router.post('/api/dish/add', async (req, res) => {
    try {
        // const returnDish = await dish.addDish()
        const dish = new Dish(req.body.dish)
        const dishdatabase = await Dish.findOne({ Dish_Name: dish.Dish_Name })

        if (dishdatabase) {
            throw Error('Dish Already Exists!')
        }
        await dish.save();
        return res.status(200).send()
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.get('/api/dish/alldisges',async(req,res) => {
    const dishes =await Dish.find({})
    // console.log(dishes)

    return res.status(200).send({dishes})
})

router.put('/api/dish/updatedish',async(req,res) => {
    const updatedish = Dish(req.body.dish)
    const dish = await Dish.findOneAndUpdate({_id:updatedish._id},{
        Category:updatedish.Category,
        Dish_Name:updatedish.Dish_Name,
        Price:updatedish.Price
    })
    if(!dish){
        return res.status(400).send('Dish is not found')
    }
    await dish.save()
    return res.status(200).send()
})

router.delete('/api/dish/delete/:dishid',async(req,res) => {
    const dishID = req.params.dishid
    await Dish.findByIdAndDelete(dishID)
    return res.status(200).send()
})

module.exports = router