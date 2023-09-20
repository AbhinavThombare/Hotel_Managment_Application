const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/hotel-database';

mongoose.set("strictQuery", false);
mongoose.connect(connectionURL,{ useNewUrlParser: true },(error,client) => {
    if(error) {
        return console.log('Unable to connect database')
    }
    console.log(`MongoDB connected : ${connectionURL}`);
})