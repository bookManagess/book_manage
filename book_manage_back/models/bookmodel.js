var mongoose = require('../db_con')
const uuid = require("uuid");

//图书表
var bookschema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1,
    },
    name: {
        type: String,
        trim: true,
        required: [true, '必须要有书名']//数据必须传入
    },
    author: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    number: {
        type: Number,
        trim: true,
        min: 0,//书的数量不能小于0
        required: [true, '必须要有数量']
    },
    status: {
        type: String,
        enum: ['up', 'down'],
        default: 'up',//up表示上架，down表示下架
    },
    url: {
        type: String,
        default: '../../assets/image/book_list/下载.jpg',
    }
}, { _id: false })

//静态方法
bookschema.statics.findname = (id, name) => {
    this.find({ "_id": id }, (err, data) => {
        name(err, data)
    })
}

var bookModel = mongoose.model('Book', bookschema, 'books')

module.exports = bookModel;//暴露模块