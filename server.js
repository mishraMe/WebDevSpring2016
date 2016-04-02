var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
//adding session and mongoose
var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');


var db = mongoose.connect('mongodb://localhost/formMaker');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.get('/hello', function(req, res){
//    res.send('hello world');
//});

//app.get('/rest/formMaker', function(req, res) {
//    res.send("formMaker")
//});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);