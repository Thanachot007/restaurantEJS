var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registration = require('./routes/registration')
var page1 = require('./routes/page1')
var page2 = require('./routes/page2')
var history = require('./routes/history')
var food = require('./routes/food')
var booking = require('./routes/booking')
var app = express();
var helmet = require('helmet')
app.use(helmet())
    //fileupload 
var fileUpload = require('express-fileupload')
app.use(fileUpload())
app.use(express.static('public'))
    //session 
const session = require("express-session");
// const bodyParser = require("body-parser");
// MiddleWare คือตัวกลางที่ใช้ในการจัดการข้อมูลก่อนที่จะผ่านเข้ามายัง request
// เราลง middleware cookieParser() เอาไว้สำหรับอ่าน header cookie ไม่อย่างนั้นมันจะหาไม่เจอและพังตลอดนั่นเอง
// app.use(cookieParser());
// app.use(bodyParser.json()); // ให้รองรับ json encoded bodies
// app.use(bodyParser.urlencoded({
//   extended: true
// })); // ให้รองรับ  urlencoded bodies
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: "EiEi Test my Session", // ตัว unique รหัสที่ session จะนำไปใช้ในการถอดค่ามาอ่าน
//     cookie: {
//       maxAge: 1000 * 60 * 60, // ตั้งเวลาของ session โดยหน่วยเวลาเป็น Millisecond 1 ชม
//     }
//   })
// );
app.use(session({ secret: '1234567890QWERTY' }));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registration', registration)
app.use('/page1', page1)
app.use('/page2', page2)
app.use('/history', history)
app.use('/food', food)
app.use('/booking', booking)
    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

//DB
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ejs_tutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;