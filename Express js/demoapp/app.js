var createError = require('http-errors');
var express = require('express');
let http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const cors = require("cors");
app.use(cors());

var server = require('http').createServer(app);
let socketIO = require('socket.io');
let io = socketIO(server);

server.listen(3000, () => {
  console.log(`started on port: ${3000}`);
});






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//soket setup
//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

  socket.on('new-message', (message) => {
    console.log(message, '......');
    console.log(socket.id, '......');

    let data = {
      msg:message,
      sender:socket.id,
    }
    io.emit('new-message', data);
  });
});

module.exports = app;
