const Bookrecord = require('../models/book_recordmodel')
const Book = require('../models/bookmodel')

//获取所有记录
exports.getAllrecord = async (req, res) => {
    try {
        bookrecord = await Bookrecord.find()
        res.status(200).json({
            status: true,
            bookrecord
        })
    } catch (err) {
        res.status(404).json({ message: err });
    }
}
//添加记录
exports.create_record = async (req, res) => {
    try {
        //调整时间格式
        var date = new Date()
        var month = date.getMonth() + 1
        date = date.getFullYear() + '-' + month + '-' + date.getDate()
        //添加
        await Bookrecord.create({
            book_name: req.body.book_name,
            bor_user: req.body.bor_user,
            bor_date: date
        })
        res.status(200).json({
            message: "success"
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
}

// 传入_id与修改内容（键值队形式）
exports.updateRecord = async (req, res) => {
    try {
        const data = await Bookrecord.findByIdAndUpdate({ _id: req.params._id }, req.body)
        res.status(200).json({
            message: 'success',
            data,
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
}

//还书,传入id,添加还书日期,书籍数量+1
exports.return_record = async (req, res) => {
    try {
        // 找出借书记录id对应的书名(因为书名串联了两个表)
        var bookrecord = await Bookrecord.findOne({ _id: req.body.name })
        //调整时间格式
        var date = new Date()
        var month = date.getMonth() + 1
        date = date.getFullYear() + '-' + month + '-' + date.getDate()
        // 调整数量
        var new_number = await Book.findOne({ name: bookrecord.book_name })
        new_number = ++new_number.number
        // 更新数量+1
        await Book.update(
            { 'name': bookrecord.book_name },
            { 'number': new_number }
        )
        //将时间更新到model
        await Bookrecord.update({
            _id: req.body.name
        }, {
            re_date: date
        })
        res.status(200).json({
            message: 'success',
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
}

// 按照借书人账号获取所有记录
exports.get_record = async (req, res) => {
    try {
        // console.log(req.query.bor_user)
        bookrecord = await Bookrecord.find({ bor_user: req.query.bor_user })
        res.status(200).json({
            status: true,
            bookrecord
        })
    } catch (err) {
        res.status(404).json({ message: err });
    }
}

