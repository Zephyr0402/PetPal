var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var commentRouter = require('./routes/comment')
var accountRouter = require('./routes/account');
var paymentRouter = require('./routes/payment');
var postRouter = require('./routes/animalinfo');
var transactionRouter = require('./routes/transaction')

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/', accountRouter);
app.use('/', commentRouter);
app.use('/api/payment', paymentRouter);
app.use('/animalinfo', postRouter);
app.use('/api/transaction', transactionRouter);



// app.post('/postAnimal', function (req, res) {
//   console.log('Get post');
// });

// var listener = app.listen(9999, function () {
//   console.log('Listening on port ' + listener.address().port); //Listening on port 8888
// });

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
