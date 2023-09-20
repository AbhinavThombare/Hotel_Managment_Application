const express = require('express')
const router = express.Router()
const date = require('date-and-time')
const Table = require('../models/table')
const Dish = require('../models/dishes')
const AllData = require('../models/AllDataTables')

router.post('/api/table/addtable', async (req, res) => {
    try {
        var table = req.body.table;
        const dish = await Dish.find({})
        const sum = []

        // For calculating Unit Price with Quantity
        table.Dishes.forEach(i => {
            dish.forEach(j => {
                if (j.Dish_Name === i.dish) {
                    const up = j.Price;
                    i.unit_price = up
                    const tup = i.quantity * up;
                    i.price = tup
                    sum.push(i.price)
                }
            });
        });
        const allsum = sum.reduce((a, b) => a + b, 0);
        table.Total_Price = allsum;
        const data = await Table.findOneAndUpdate({ tableNo: table.tableNo }, { Dishes: table.Dishes, Total_Price: table.Total_Price }, { new: true })


        // for new Entry
        if (!data) {
            const addtable = new Table(table)
            await addtable.save()
        }
        return res.status(200).send()

    } catch (error) {
        console.log(error)
    }
})

router.get('/api/table/tables', async (req, res) => {
    try {
        const tableData = await Table.find({})
        return res.status(200).send(tableData)
    } catch (error) {
        return res.status(400).send()
    }
})

router.delete('/api/table/deleteTable/:tableId', async (req, res) => {
    const tableId = req.params.tableId;
    await Table.findByIdAndDelete({ _id: tableId })
    return res.status(200).send()
})

router.post('/api/allDataTables/Tables', async (req, res) => {
    const tableData = req.body.tableData;
    const now = new Date()
    tableData.Date = date.format(now, 'YYYY-MM-DD')

    const tableId = tableData._id
    await Table.findByIdAndDelete({ _id: tableId })

    const newTableData = new AllData(tableData)

    await newTableData.save()
    return res.status(200).send()

})

router.get('/api/alldata/totalAmount/:start_date/:end_date', async (req, res) => {
    const start_date = req.params.start_date;
    const end_date = req.params.end_date
    const allData = await AllData.find({ Date: { $gte: start_date, $lte: end_date } })
    return res.status(200).send(allData)
})


module.exports = router