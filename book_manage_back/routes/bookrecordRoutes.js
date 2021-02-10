const express = require('express')
var router = express.Router()
const bookrecordcontroller = require('../controller/bookrecordcontroller')

router
  .route("/getbookrecord")
  .get(bookrecordcontroller.getAllrecord)

router
  .route("/showbookrecord")
  .get(bookrecordcontroller.get_record)
  .post(bookrecordcontroller.create_record)

// _id以params参数形式传递，修改内容以body形式
router
  .route("/updateRecord/:_id")
  .patch(bookrecordcontroller.updateRecord)

router
  .route("/return")
  .post(bookrecordcontroller.return_record)

module.exports = router
