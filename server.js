var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var uuid = require('node-uuid');
// install and require the mongoose library
var mongoose      = require('mongoose');

//var connectionString = 'mongodb://127.0.0.1:27017/form_maker';
var connectionStringProject = 'mongodb://127.0.0.1:27017/writers_club';

//var db = mongoose.connect(connectionString);
var dbProject = mongoose.connect(connectionStringProject);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app,dbProject, mongoose);

app.listen(port, ipaddress);