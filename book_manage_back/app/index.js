const express = require('express')
const ejs = require('ejs')
const bodyparser = require('body-parser')
const app = express()

//配置模板引擎ejs
app.engine("html",ejs.__express)
app.set("view engine","html")

//配置body-parser
app.use(bodyparser.json({ limit: "1024mb" }));
app.use(bodyparser.urlencoded({ limit: "1024mb", extended: true }));
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:false}))

//引入路由模块
const index = require('../routes/index')

//静态web服务
app.use(express.static("static"))

//挂载router
app.use("/",index)

//监听端口
app.listen(80)