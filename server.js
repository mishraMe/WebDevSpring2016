var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser  = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var uuid = require('node-uuid');
// install and require the mongoose library
var mongoose      = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/form_maker';
//var connectionStringProject = 'mongodb://127.0.0.1:27017/writers_club';


if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString =  process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;

    //connectionStringProject =  process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //    process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
    //    process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
    //    process.env.OPENSHIFT_APP_NAME;
}


var db = mongoose.connect(connectionString);
//var dbProject = mongoose.connect(connectionStringProject);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: 'itsasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, db, mongoose);
//require("./public/project/server/app.js")(app,dbProject, mongoose);

app.listen(port, ipaddress);