var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');

var courseSchema = new mongoose.Schema({

    title: String,
    seats: {type: Number, default: 50},
    starts:{type: Date, default: Date.now}
}, {collection: "course"});

var course = mongoose.model("Course", courseSchema);

course
    .create({title: "MongoDB"},
         function(err, results){
    console.log(err);
    console.log(results);
})
//
//function findAll(callback){
//    course.find(callback);
//}
//app.get('/rest/course', function(req, res) {
//    findAll(function(err, results){
//        res.json(results);
//    })
//});
//
//app.listen(3000);
