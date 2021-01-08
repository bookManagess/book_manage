const User = require('../models/usermodel')
const Book = require('../models/bookmodel')
const Book_record = require('../models/book_recordmodel')
const mongoose = require("mongoose");
exports.number = async (req,res) => {
    User.find({_id:'007'},(res,ss)=>{
    console.log(ss)
});
    const data = await Book.aggregate([
    {
        $lookup:{
            from:"book_records",
            localField:"name",
            foreignField:"book_name",
            as:"ss"
        }
    },
    {
        $project:{
            _id: 0,
            name: 1,
            "ss.bor_user":1,
            "ss.bor_date":1
        }
    }
])
console.log(data)
res.json({
    data
})
}

 //连接操作
//  const data = Book.aggregate([
//     {
//         $lookup:{
//             from:"book_records",
//             localField:"name",
//             foreignField:"book_name",
//             as:"ss"
//         }
//     },
//     {
//         $project:{
//             _id: 0,
//             name: 1,
//             "ss.bor_user":1,
//             "ss.bor_date":1
//         }
//     }
// ],(err,data) => {
//     if(err){
//         console.log(err)
//     }
//     res.status(200).json({
//         data
//     })
// })
