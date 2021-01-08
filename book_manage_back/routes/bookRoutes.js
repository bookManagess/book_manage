const express = require('express')
var router = express.Router()
const bookcontroller = require('../controller/bookcontroller')

//挂载路由
router.route("/showbook")
  .post(bookcontroller.change_number)
  .get(bookcontroller.get_all)

router.route("/findbook")
  .post(bookcontroller.rough_find)

module.exports = router