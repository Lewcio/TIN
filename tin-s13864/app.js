var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const driverRouter = require('./routes/driverRoute');
const raceRouter = require('./routes/raceRoute');
const teamRouter = require('./routes/teamRoute');
const trackRouter = require('./routes/trackRoute');
const driverApiRouter = require('./routes/api/DriverApiRoute');
const raceApiRouter = require('./routes/api/RaceApiRoute');
const teamApiRouter = require('./routes/api/TeamApiRoute');
const trackApiRouter = require('./routes/api/TrackApiRoute');
const session = require('express-session');
const i18n = require('i18n');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});
app.use(cookieParser('secret'));

i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});


app.use('/', indexRouter);
app.use('/drivers', driverRouter);
app.use('/races', raceRouter);
app.use('/teams', teamRouter);
app.use('/tracks', trackRouter);
app.use('/api/drivers', driverApiRouter);
app.use('/api/races', raceApiRouter);
app.use('/api/teams', teamApiRouter);
app.use('/api/tracks', trackApiRouter);

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
