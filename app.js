var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.listen(5000, () => {
    console.log('Server listening on 5000')
})

mongoose.connect( 'mongodb+srv://aichukCPA3:password321@cluster0.8emh8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});
// parse text URL encoded data and JSON data and expose the result object into req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();
const User = require('./model/User.js')
const bcrypt = require('bcrypt')
router.post('/user',(request, response) => {
    const user = new User({
        firstName : request.body.firstName,
        lastName : request.body.lastName,
        userName : request.body.userName,
        password : request.body.password,
        email : request.body.email        
    })

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }

        user.password = hash;
        user.save().then(data => {
            console.log('Successfully created new User');
            }).catch(error => {
           console.log('WOW') 
        })
    })
})
module.exports = router;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
