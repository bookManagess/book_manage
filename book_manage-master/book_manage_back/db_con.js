const mongoose = require('mongoose')
const mongo_url = 'mongodb+srv://snnu:snnu1234@students.15z4j.mongodb.net/book_manage?retryWrites=true&w=majority'
// const mongo_url = 'mongodb+srv://snnu:snnu1234@students.15z4j.mongodb.net/<dbname>?retryWrites=true&w=majority'


mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
    mongoose.set('useFindAndModify', false)
    if (err) {
        console.log(err);
        return;
    }
    console.log("连接成功")
})

module.exports = mongoose