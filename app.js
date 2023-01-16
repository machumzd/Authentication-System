const dotenv=require('dotenv')
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session=require('express-session');
const config = require('./config/config')
const db = require('./server/database/connection')

const indexRouter = require('./server/routes/user/index');
const adminRouter = require('./server/routes/admin/admin');
const signupRouter = require('./server/routes/user/signup');
const loginRouter = require('./server/routes/user/login');
const homeRouter=require('./server/routes/user/home')
const adminLoginRouter=require('./server/routes/admin/adminLogin')
const app = express();

app.use(function(req, res, next) { 
  res.header('Cache-Control', 'no-cache, no-store');
   next();
 });

app.use(session({
  secret:config.secretKey,
  cookie:{maxAge:600000}
}));

dotenv.config({ path: "config.env" })
const PORT = process.env.PORT || 3000;

db.connectToDb((err) => {
  if (!err) {
      app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`)
      })
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/signup', signupRouter);
app.use('/login',loginRouter)
app.use('/home',homeRouter)
app.use('/adminLogin',adminLoginRouter)
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
