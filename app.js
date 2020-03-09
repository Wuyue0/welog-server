var createError = require('http-errors');// http 错误响应
var express = require('express');// express
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');// cookie解析
var logger = require('morgan');// 记录日志



// 声明并引入路由组件
var indexRouter = require('./routes');



// express对象
var app = express();
// view engine setup
// 模板位置
app.set('views', path.join(__dirname, 'views'));
// 模板引擎 默认为jade;可修改为其它，如html
app.set('view engine', 'html');


// 使用mogan将请求信息打印在控制台
app.use(logger('dev'));
// 请求解析中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析请求头里的cookie
app.use(cookieParser());
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));


//解析我们的form表单提交的数据,Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//解析json数据格式
app.use(bodyParser.json())  
//设置跨域
app.use(cors())

// 路由匹配及路由组件
app.use('/', indexRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
