
'use strict';
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
mongoose.connect(config.database);

const log = require('./utils/Logger');

var apiEndpoint = require('./routes/api');

log.info('Starting the express app');
var app = express();

//Setup DB Data, remove it later
var dbSetup = require('./dataSetup/setup');
//Setup end

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    //'http://www.myproductionurl.com'
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));


app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public/swagger-ui')));
app.use('/api', apiEndpoint);

var allowCrossDomain = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
}

app.use(allowCrossDomain);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || 4000, function () {
    log.info('Started the express microservice.');
    // Setup DB Data, remove it later
    // Comment below when not needed
    dbSetup.init();
    // Setup end
});

module.exports = app;