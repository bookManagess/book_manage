const User = require('./models/usermodel')
const book = require('./models/bookmodel')
const book_record = require('./models/book_recordmodel')
const { emit } = require('./models/book_recordmodel')

// User.find({_id:'007'},(res,data)=>{
//     console.log(data)
// });//获取用户账号对应数据

//图书表
// var bookschema = mongoose.Schema({
//     _id:String,
//     name:String,
//     author:String,
//     type:String,
//     number:Number
// })

//查询数据
// User.find({},(err,data)=>{
//     if(err){
//         console.log(err)
//         return;
//     }
//     console.log(data)
// })//用户表

// book.find({},(err,data)=>{
//     if(err){
//         console.log(err)
//         return;
//     }
//     console.log("ss"+data)
// })//图书表

//增加操作
// var b = new book({
//     _id:'0002',
//     name:'福尔摩斯探案集',
//     author:'柯南道尔',
//     type:'推理',
//     number:5
// })
// //执行增加
// b.save((err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('成功')
// })

//更新操作
// book.update(
//     {'name':"福尔摩斯探案集"},
//     {'number':"15"},
//     (err,data)=>{
//         if(err){
//             return console.log(err);
//         }
//         console.log('成功')
//     }
// )

//删除数据
// book.deleteOne({'name':"福尔摩斯探案集"},(err,res)=>{
//     if(err){
//         return console.log(err)
//     }
//     console.log('成功')
// })

// or操作
// book.find({
//     $or: [
//         {name:'龙族'},
//         {author: '吴承恩'}
//     ]
// },(err,data) => {
//     console.log(data)
// })

// 数量比较
// book.find({
//     number: {$lte: 15,$gte: 11}
// },(err,data) => {
//     console.log(data)
// })

// limited留下几条数据，skip跳过几条数据:用于分页
// book.find({},(err,data) => {
//     console.log(data)
// }).limit(2).skip(2)


// 排序,1：顺序，-1：逆序
// book.find({},(err,data) => {
//     console.log(data)
// }).sort({'_id':-1})

//统计江南书的总量
// book.mapReduce(
//     () => { emit(this.name), this.number },
//     (key, values) => { return Array.sum.values },
//     {
//         query: { author: "江南" },
//         out: 'book_total'
//     })

// 投影查询
// book.find({},{name:1},(err,data) => {
//     console.log(data)
// })

// 不等于 ne,等于 in
// book.find({name:{$ne:"龙族",$in:"福尔摩斯"}},(err,data) => {
//     console.log(data)
// })

// or
// book.find({'$or':[{name:"龙族"},{name:"福尔摩斯"}]},(err,data) => {
//     console.log(data)
// })

// 存在
// book.find({ name: { $exists: true } }, function (error, data) {
//     //查询所有存在name属性的文档
//     console.log(data)
// });

// // limit，skip限制
// book.find({},null,{limit:3},function(err,data){
//     console.log(data);
// });
// book.find({},null,{skip:4},function(err,docs){
//     console.log(docs);
// });

// book.find({},null,{sort:{_id:-1}},function(err,docs){
//     //查询所有数据，并按照age降序顺序返回数据docs
//     console.log(docs)
//   });

// 创造实例方法
// var mongoose = require('mongoose');
// var saySchema = new mongoose.Schema({name : String});
// saySchema.method('say', function () {
//   console.log('Trouble Is A Friend');
// })
// var say = mongoose.model('say', saySchema);
// var lenka = new say();
// lenka.say(); //Trouble Is A Friend

// 静态方法
// var mongoose = require("mongoose");
// var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
// var TestSchema = new mongoose.Schema({
//     name : { type:String },
//     age  : { type:Number, default:0 },
//     email: { type:String, default:"" },
//     time : { type:Date, default:Date.now }
// });
 
// TestSchema.static('findByName', function (name, callback) {
//     return this.find({ name: name }, callback);
// });
 
// var TestModel = db.model("test1", TestSchema );
// TestModel.findByName('tom', function (err, docs) {
//  //docs所有名字叫tom的文档结果集
// });

// 模糊查询
// const reg = new RegExp('龙','i')
// book.find({name:{$regex:/龙/}},(err,data) => {
//     console.log(data[1])
// })







