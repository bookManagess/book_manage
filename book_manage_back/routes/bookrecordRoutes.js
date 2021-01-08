const express = require('express')
var router = express.Router()
const bookrecordcontroller = require('../controller/bookrecordcontroller')

router
  .route("/showbookrecord")
  .get(bookrecordcontroller.get_record)
  .post(bookrecordcontroller.create_record)

router
  .route("/return")
  .post(bookrecordcontroller.return_record)

module.exports = router
