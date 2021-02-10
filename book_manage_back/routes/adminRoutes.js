const express = require('express')
var router = express.Router()
const admincontroller = require('../controller/admincontroller')
//测试
const test = require('../controller/test')

//挂载路由
router.route("/login").post(admincontroller.admin_login)
router.route("/register").post(admincontroller.admin_register)
router.route("/change_password").post(admincontroller.change_password)
router.route("/search").get(admincontroller.getAlladmin)
router.route("/delete").post(admincontroller.admin_delete)
// 修改用户信息传入_id(以params形式),待修改内容(body形式)
router.route("/update/:_id").patch(admincontroller.updateUser)

//测试
router
  .route("/test")
  .post(test.number)


























































router
  .route("test1")
  .post(test.number)

module.exports = router