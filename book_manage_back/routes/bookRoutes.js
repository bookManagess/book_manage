const express = require('express')
var router = express.Router()
const bookcontroller = require('../controller/bookcontroller')

//挂载路由
router.route("/showbook")
  .post(bookcontroller.change_number)
  .get(bookcontroller.get_all)

router.route("/findbook")
  .post(bookcontroller.rough_find)
// 传入_id(params)与修改内容(body)
router.route("/update/:_id")
  .patch(bookcontroller.updateBook)
router.route("/insertbook")
  .post(bookcontroller.insertBook)
router.route("/deleteBook")
  .post(bookcontroller.book_delete)

module.exports = router