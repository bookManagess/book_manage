const Book = require('../models/bookmodel')

//按类型搜索所有图书
exports.get_all = async (req, res) => {
    try {
        if (req.query.type == 'all') {
            book = await Book.find({ number: { $ne: 0 } })
            res.status(200).json({
                status: true,
                book,
            })
        } else {
            book = await Book.find({ type: req.query.type, number: { $ne: 0 } })
            res.status(200).json({
                status: true,
                book,
            })
        }
    } catch (err) {
        res.status(404).json({
            status: true,
            err,
        })
    }
}

//修改图书数量(name，修改的数量)
exports.change_number = async (req, res) => {
    try {
        var new_number = await Book.findOne({ name: req.body.name })
        new_number = --new_number.number
        await Book.update(
            { 'name': req.body.name },
            { 'number': new_number }
        )
        res.status(200).json({
            message: 'success'
        })
    } catch (err) {
        res.status(409).json({
            err
        })
    }
}

// 模糊查询(输入模糊字段，得到查询结果)
exports.rough_find = async (req, res) => {
    try {
        const result = await Book.find({
            number: { $ne: 0 },
            $or: [
                { name: { $regex: new RegExp(req.body.rough_word, 'i') } },
                { author: { $regex: new RegExp(req.body.rough_word, 'i') } },
                { pingying: { $regex: new RegExp(req.body.rough_word, 'i') } }
            ]
        })
        res.status(200).json({
            result
        })
    } catch (err) {
        // console.log(err)
        res.status(404).json({
            status: true,
            err,
        })
    }
}