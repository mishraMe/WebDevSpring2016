var mongoose = require("mongoose");

var reviewSchema = require('./review.schema.server.js')(mongoose);
module.exports = function() {
    var postSchema = new mongoose.Schema({

        "title": String,
        "tag": [String],
        "type": {type: String, enum:['public', 'private'], default:'private'},
        "userId": String,
        "username": String,
        "content": String,
        "review":  [reviewSchema]
    }, {collection: "post"});

    return postSchema;
};