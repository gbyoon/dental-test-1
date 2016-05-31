var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


/****************************************************************************************************/


var adminReg = require('./routes/adminReg');
var adminInfoUpdt = require('./routes/adminInfoUpdt');
var adminInfoSave = require('./routes/adminInfoSave');
var adminLogin = require('./routes/adminLogin');
var chkAdminLogin = require('./routes/chkAdminLogin');
var adminMain = require('./routes/adminMain');
var adminLogout = require('./routes/adminLogout');
var router = require('./routes/router');

var regDentalInfo = require('./routes/regDentalInfo');
var srchDentalInfo = require('./routes/srchDentalInfo');
var srchDentalByArg = require('./routes/srchDentalByArg');

var regMemberInfo = require('./routes/regMemberInfo');
var srchMemberInfoNasgn = require('./routes/srchMemberInfoNasgn');
var asgnDentalToMem = require('./routes/asgnDentalToMem');
var srchMemberInfoAsgn = require('./routes/srchMemberInfoAsgn');


var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-auto-increment');

//mongoose.connect('mongodb://localhost/dentalDB');
mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var db = mongoose.connection;
autoIncrement.initialize(db);

var adminSchema = mongoose.Schema({

  adminName: {type: String, required: true, trim: true },
  adminId: {type: String, required: true, trim: true },
  adminPwd: {type: String, required: true, trim: true }

},{versionKey: false}
);

var dentSchema = mongoose.Schema({

  dentName: {type: String, required: true, trim: true },
  doctName: {type: String, required: true, trim: true },
  address: {type: String, required: true, trim: true }, 
  mobile: {type: String, required: true, trim: true }, 
  tel: {type: String, required: true, trim: true },

},{versionKey: false}
);

var memSchema = mongoose.Schema({

  name: {type: String, required: true, trim: true },
  birth: {type: String, required: true, trim: true }, 
  address: {type: String, required: true, trim: true }, 
  mobile: {type: String, required: true, trim: true },
  stat: { type: Number, required: true, default: 0 },

  dntl_key: { type: mongoose.Schema.Types.ObjectId, ref: 'dental' }

},{versionKey: false});


adminSchema.plugin(timestamps);
dentSchema.plugin(timestamps);
memSchema.plugin(timestamps);


adminSchema.plugin(autoIncrement.plugin, { model: 'manager', field: 'adminIdx', startAt: 1, incrementBy: 1 });
var manager = mongoose.model('manager', adminSchema);

dentSchema.plugin(autoIncrement.plugin, { model: 'dental', field: 'dentIdx', startAt: 0, incrementBy: 1 });
var dental = mongoose.model('dental', dentSchema);

memSchema.plugin(autoIncrement.plugin, { model: 'member', field: 'memIdx', startAt: 1, incrementBy: 1 });
var member = mongoose.model('member', memSchema);


/****************************************************************************************************/


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/****************************************************************************************************/

app.use(session({
  secret: '2C44-4D44-WppQ38S', 
  duration: 10*60*1000, 
  activeDuration: 5*60*1000, 
  resave: false, 
  saveUninitialized: true
}));

app.use(function noCache(req, res, next){

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires",0);
    next();
});

//app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(function(req,res,next){
  console.log("------111 Check Session -----");
  console.log(req.session);
  console.log(req.session.admin);
  
  //if (req.session && req.session.user === "amy" && req.session.admin)
  //if (req.session && req.session.user === "amy" && req.session.admin)
  if (req.session && req.session.admin)
  //if (req.session.admin)
  {
    //next();
  console.log("------222 Check Session -----");
    
    manager.findOne({adminId: req.session.admin.adminId}, function(err, admin){
      if(admin)
      {
        console.log(admin);
        req.admin = admin;
        delete req.admin.adminPwd;
        req.session.admin = admin;
        res.locals.admin = admin;
      }
      next();
    });
  }
  else
  {
  console.log("------333 Check Session -----");
    //return res.sendStatus(401);
    //return res.redirect('/pages/mulview.html');
    //return res.render('login');
    next();
    //return res.render('adminLogin');
  }
});


// Make our db accessible to our router
app.use(function(req,res,next){
  console.log("------ Requset -----");

  //req.session = sessionVal;

  req.db = db;
  req.manager = manager;
  req.dental = dental;
  req.member = member;

  next();
});

/****************************************************************************************************/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/****************************************************************************************************/


app.use('/adminReg', adminReg);
app.use('/adminInfoUpdt', adminInfoUpdt);
app.use('/adminInfoSave', adminInfoSave);
app.use('/adminLogin', adminLogin);
app.use('/chkAdminLogin', chkAdminLogin);
app.use('/adminMain', adminMain);
app.use('/adminLogout', adminLogout);
app.use('/router', router);

app.use('/regDentalInfo', regDentalInfo);
app.use('/srchDentalInfo', srchDentalInfo);
app.use('/srchDentalByArg', srchDentalByArg);

app.use('/regMemberInfo', regMemberInfo);
app.use('/srchMemberInfoNasgn', srchMemberInfoNasgn);
app.use('/asgnDentalToMem', asgnDentalToMem);
app.use('/srchMemberInfoAsgn', srchMemberInfoAsgn);

/****************************************************************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
