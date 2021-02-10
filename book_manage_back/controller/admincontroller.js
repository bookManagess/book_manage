const User = require('../models/usermodel')

//注册
exports.admin_register = async (req, res) => {
    try {
        //注册开始
        var user = await User.findOne({ _id: req.body._id })
        if (user) {
            res.status(200).json({
                message: "用户名已被人注册"
            })
        } else {
            User.create(req.body)
            res.status(200).json({
                message: "success"
            })
        }
    } catch (err) {
        // console.log(err)
        res.status(404).json({ status: false, message: err });
    }
}

//登录
exports.admin_login = async (req, res) => {
    //获取前端数据
    var admin_id = req.body._id;
    var admin_password = req.body.password;
    //登录验证
    var admin = await User.findById(admin_id);//获取用户账号对应数据
    try {
        if (admin == null) {
            res.status(200).json({
                status: false,
                message: "there isn't the people"
            });
        } else {
            var admin = admin.toObject();
            if (admin.password != admin_password) {
                res.status(200).json({
                    status: false,
                    message: "password err"
                });
            } else {
                res.status(200).json({
                    status: true,
                    message: "successs",
                    tip: admin.identify,
                    phone: admin.phone
                })
            }
        }
    } catch (err) {
        res.status(404).json({ status: false, message: err });
    }
}

//修改密码(用户密码,用户名)
exports.change_password = async (req, res) => {
    try {
        await User.update(
            { _id: req.body.user_name },
            { password: req.body.new_password }
        )
        res.status(200).json({
            message: "success"
        })
    } catch (err) {
        res.status(409).json({
            err
        })
    }
}

// 修改用户状态
exports.updateUser = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate({ _id: req.params._id }, req.body)
        res.status(200).json({
            status: true,
            message: "success",
            data
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            err
        })
    }
}

//获取所有用户
exports.getAlladmin = async (req, res) => {
    try {
        user = await User.find();
        res.status(200).json({
            status: true,
            message: user
        })
    } catch (err) {
        console.log(err);
    }
}

//删除用户，传入_id
exports.admin_delete = async (req, res) => {
    try {
        await User.deleteMany({ _id: req.body._id }, (err, data) => {
            if (err) {
                res.status(409).json({
                    status: true,
                    message: err
                })
            }
            res.status(200).json({
                status: true,
                message: "删除成功"
            })
        })
    } catch (err) {
        console.log(err);
    }
}