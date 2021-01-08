var mongoose = require('../db_con')

var courseSchema = mongoose.Schema({
    _id: {
        type: String,
        required: [true,'you must tell us your course_id'],
    },
    name: {
        type: String,
        required: [true,'you must tell us your course_name'],
    },
    school: {
        type: String,
        required: [true,'you must tell us your school'],
    },
    // 学院
    academy: {
        type: String,
        required: [true,'you must tell us your academy'],
    },
    // 专业
    profession: {
        type: String,
        required: [true,'you must tell us your prefession'],
    },
},{_id:false})


var courseModel = mongoose.model('Course',courseSchema,'course')

module.exports = courseModel;//暴露模块