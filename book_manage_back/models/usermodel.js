var mongoose = require('../db_con')
//用户表
var Userschema = mongoose.Schema({
    _id:{
        type:String,
        required: [true, '请输入账号']
    },
    password:{
        type:String,
        required: [true, '请输入密码']
    },
    phone:{
        type:String,
        required: [true,'请输入电话号码']
    },//内部是可以指定默认参数的
    identify:{
        type:String,
        default:'0'//身份,1-管理员,2-普通用户
    }
},{_id:false})//去掉_id

const UserModel = mongoose.model('Usermodel',Userschema,'users')

module.exports = UserModel;//暴露模块