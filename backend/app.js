var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AuthenticationRouter=require('./routes/authentication');
var CompanyRouter=require('./routes/company')
var RegisterRouter = require('./routes/register')
var resumeRoutes = require('./routes/resume');  // ✅ Import resume routes

var mongoose=require('mongoose')
var cors=require('cors') 

mongoose.connect('mongodb://localhost:27017/Placement')
.then(res=>console.log("Database Connected Successfully"))
.catch(err=>res.send(err))

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentication',AuthenticationRouter)
app.use('/company',CompanyRouter)
app.use('/register',RegisterRouter)
app.use('/api/resume', resumeRoutes); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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


