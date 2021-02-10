const express = require('express')
const router = express.Router()

// 解决跨域问题
router.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json");
  next();
})

//引入路由模块
const adminRouter = require('./adminRoutes')
const bookRouter = require('./bookRoutes')
const bookrecord = require('./bookrecordRoutes')

router.get('/api', (req, res,next) => {
    res.render('register');
    next();
})

router.use("/api/admin",adminRouter)
router.use("/api/book",bookRouter)
router.use('/api/bookrecord',bookrecord)

module.exports = router