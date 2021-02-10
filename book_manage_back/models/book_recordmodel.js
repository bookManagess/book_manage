var mongoose = require('../db_con')
var uuid = require('../node_modules/uuid/dist')

//借书记录表
var recordschema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1,
    },
    _v: {
        // 记录状态,0：未审核，1:已同意,2:已驳回
        type: String,
        default: "0",
    },
    book_name: {
        type: String,
        required: true
    },
    bor_user: {
        type: String,
        required: true
    },
    bor_date: {
        type: String,
        require: true,
    },
    re_date: {
        type: String,
        default: '0',
    }
}, { _id: false, versionKey: false })

var recordModel = mongoose.model('Book_record', recordschema, 'book_records')

module.exports = recordModel;//暴露模块